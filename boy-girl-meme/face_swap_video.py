#!/usr/bin/env python3
"""Face-swap source faces onto a singing video (InsightFace + inswapper)."""

from __future__ import annotations

import argparse
from pathlib import Path

import cv2
import numpy as np
from insightface.app import FaceAnalysis
from insightface.model_zoo import get_model
from tqdm import tqdm


def load_face(app: FaceAnalysis, path: Path):
    img = cv2.imread(str(path))
    if img is None:
        raise SystemExit(f"Could not read face image: {path}")
    faces = app.get(img)
    if not faces:
        raise SystemExit(f"No face detected in {path}")
    faces = sorted(faces, key=lambda f: (f.bbox[2] - f.bbox[0]) * (f.bbox[3] - f.bbox[1]), reverse=True)
    return faces[0]


def face_center(face) -> tuple[float, float]:
    x1, y1, x2, y2 = face.bbox
    return (float((x1 + x2) / 2), float((y1 + y2) / 2))


def assign_sources(faces, boy_face, girl_face, boy_emb: np.ndarray, girl_emb: np.ndarray):
    """Map each detected target face to boy or girl source by embedding similarity + gender/position."""
    if not faces:
        return []
    assignments = []
    for face in faces:
        emb = face.normed_embedding
        boy_sim = float(np.dot(emb, boy_emb))
        girl_sim = float(np.dot(emb, girl_emb))
        # Prefer gender when available: 1=female, 0=male in insightface
        gender = getattr(face, "gender", None)
        if gender == 1 and girl_sim + 0.02 >= boy_sim:
            src = girl_face
            label = "girl"
        elif gender == 0 and boy_sim + 0.02 >= girl_sim:
            src = boy_face
            label = "boy"
        elif boy_sim >= girl_sim:
            src = boy_face
            label = "boy"
        else:
            src = girl_face
            label = "girl"
        assignments.append((face, src, label, max(boy_sim, girl_sim)))
    return assignments


def process_video(
    video_path: Path,
    boy_path: Path,
    girl_path: Path,
    out_path: Path,
    model_path: Path,
    max_frames: int | None = None,
    every_n: int = 1,
) -> None:
    app = FaceAnalysis(name="buffalo_l", providers=["CPUExecutionProvider"])
    app.prepare(ctx_id=-1, det_size=(640, 640))

    swapper = get_model(str(model_path), providers=["CPUExecutionProvider"])
    boy_face = load_face(app, boy_path)
    girl_face = load_face(app, girl_path)
    boy_emb = boy_face.normed_embedding
    girl_emb = girl_face.normed_embedding

    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        raise SystemExit(f"Could not open video: {video_path}")

    fps = cap.get(cv2.CAP_PROP_FPS) or 25.0
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
    if max_frames:
        total = min(total, max_frames) if total else max_frames

    out_path.parent.mkdir(parents=True, exist_ok=True)
    tmp_path = out_path.with_suffix(".nosound.mp4")
    writer = cv2.VideoWriter(
        str(tmp_path),
        cv2.VideoWriter_fourcc(*"mp4v"),
        fps,
        (width, height),
    )

    # Cache last swap mapping by rough position to stabilize identity across frames
    last_labels: dict[int, str] = {}

    idx = 0
    written = 0
    pbar = tqdm(total=total or None, desc="face-swap")
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        if max_frames is not None and written >= max_frames:
            break

        if idx % every_n == 0:
            faces = app.get(frame)
            faces = sorted(faces, key=lambda f: face_center(f)[0])
            assignments = assign_sources(faces, boy_face, girl_face, boy_emb, girl_emb)

            # Stabilize: if two faces, left=boy singer / right=girl listener when unclear
            if len(assignments) >= 2:
                left, right = assignments[0], assignments[1]
                # force distinct identities
                if left[2] == right[2]:
                    assignments[0] = (left[0], boy_face, "boy", left[3])
                    assignments[1] = (right[0], girl_face, "girl", right[3])

            result = frame
            for face, src, label, _sim in assignments:
                result = swapper.get(result, face, src, paste_back=True)
            last_frame = result
        else:
            result = last_frame if "last_frame" in locals() else frame

        writer.write(result)
        written += 1
        idx += 1
        pbar.update(1)

    pbar.close()
    cap.release()
    writer.release()

    # Mux original audio if present
    import subprocess

    probe = subprocess.run(
        [
            "ffprobe",
            "-v",
            "error",
            "-select_streams",
            "a",
            "-show_entries",
            "stream=codec_type",
            "-of",
            "csv=p=0",
            str(video_path),
        ],
        capture_output=True,
        text=True,
    )
    has_audio = "audio" in (probe.stdout or "")
    if has_audio:
        subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-i",
                str(tmp_path),
                "-i",
                str(video_path),
                "-map",
                "0:v:0",
                "-map",
                "1:a:0?",
                "-c:v",
                "libx264",
                "-crf",
                "18",
                "-preset",
                "fast",
                "-c:a",
                "aac",
                "-shortest",
                "-movflags",
                "+faststart",
                str(out_path),
            ],
            check=True,
            capture_output=True,
        )
        tmp_path.unlink(missing_ok=True)
    else:
        subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-i",
                str(tmp_path),
                "-c:v",
                "libx264",
                "-crf",
                "18",
                "-preset",
                "fast",
                "-an",
                "-movflags",
                "+faststart",
                str(out_path),
            ],
            check=True,
            capture_output=True,
        )
        tmp_path.unlink(missing_ok=True)

    print(f"Wrote {out_path} ({written} frames)")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--video", required=True, type=Path)
    ap.add_argument("--boy", required=True, type=Path)
    ap.add_argument("--girl", required=True, type=Path)
    ap.add_argument("--out", required=True, type=Path)
    ap.add_argument(
        "--model",
        type=Path,
        default=Path(__file__).resolve().parent / "models" / "inswapper_128.onnx",
    )
    ap.add_argument("--max-frames", type=int, default=None)
    ap.add_argument("--every-n", type=int, default=1)
    args = ap.parse_args()
    process_video(args.video, args.boy, args.girl, args.out, args.model, args.max_frames, args.every_n)


if __name__ == "__main__":
    main()
