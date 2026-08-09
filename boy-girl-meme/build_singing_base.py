#!/usr/bin/env python3
"""Build an animated singing base video with real mouth motion (not a slideshow).

Creates interpolated lip-sync motion between open/closed mouth frames so face-swap
keeps singing movement.
"""

from __future__ import annotations

import subprocess
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
FRAMES = ROOT / "frames"
OUT = ROOT / "source"
W, H = 1280, 720
FPS = 24
FONT = "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf"


def load_fit(path: Path) -> np.ndarray:
    img = cv2.imread(str(path))
    if img is None:
        raise SystemExit(f"missing {path}")
    h, w = img.shape[:2]
    scale = max(W / w, H / h)
    nw, nh = int(w * scale), int(h * scale)
    img = cv2.resize(img, (nw, nh), interpolation=cv2.INTER_LANCZOS4)
    x = (nw - W) // 2
    y = (nh - H) // 2
    return img[y : y + H, x : x + W]


def ease(t: float) -> float:
    return 0.5 - 0.5 * np.cos(np.pi * t)


def blend(a: np.ndarray, b: np.ndarray, t: float) -> np.ndarray:
    t = float(np.clip(t, 0, 1))
    return cv2.addWeighted(a, 1 - t, b, t, 0)


def caption(frame: np.ndarray, text: str) -> np.ndarray:
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    img = Image.fromarray(rgb)
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype(FONT, 42)
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (W - tw) // 2
    y = H - th - 54
    for dx, dy in ((2, 2), (1, 1), (-1, 1)):
        draw.text((x + dx, y + dy), text, font=font, fill=(0, 0, 0))
    draw.text((x, y), text, font=font, fill=(255, 255, 255))
    return cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)


def append_segment(frames: list[np.ndarray], a: np.ndarray, b: np.ndarray, n: int, lyric: str):
    for i in range(n):
        t = ease(i / max(n - 1, 1))
        # Oscillate mouth for singing feel within segment
        osc = 0.5 + 0.5 * np.sin(i * 0.9)
        mix = 0.25 * t + 0.75 * osc * (0.4 + 0.6 * t)
        fr = blend(a, b, mix)
        frames.append(caption(fr, lyric))


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    boy_soft = load_fit(FRAMES / "frame_boy_sing_2.png")
    boy_open = load_fit(FRAMES / "frame_boy_sing_1.png")
    girl1 = load_fit(FRAMES / "frame_girl_listen_1.png")
    girl2 = load_fit(FRAMES / "frame_girl_listen_2.png")
    girl3 = load_fit(FRAMES / "frame_girl_listen_3.png")
    together = load_fit(FRAMES / "frame_together.png")

    frames: list[np.ndarray] = []
    # girl listens
    append_segment(frames, girl1, girl2, int(2.2 * FPS), "I need you")
    # boy sings (strong mouth motion)
    append_segment(frames, boy_soft, boy_open, int(2.8 * FPS), "And I miss you")
    append_segment(frames, girl2, girl3, int(2.2 * FPS), "And now I wonder")
    append_segment(frames, boy_soft, boy_open, int(2.8 * FPS), "I need you")
    append_segment(frames, girl1, girl3, int(2.2 * FPS), "And I miss you")
    append_segment(frames, boy_soft, boy_open, int(2.5 * FPS), "All my life")
    # together hold with subtle boy mouth pulse baked into together via blend to boy_open cropped? keep together
    for i in range(int(3.0 * FPS)):
        pulse = 0.08 * (0.5 + 0.5 * np.sin(i * 0.7))
        fr = blend(together, together, 0)  # identity
        # slight brightness pulse
        fr = cv2.convertScaleAbs(fr, alpha=1.0 + pulse * 0.15, beta=pulse * 8)
        frames.append(caption(fr, "I need you and I miss you"))

    raw = OUT / "singing_base_raw.mp4"
    writer = cv2.VideoWriter(str(raw), cv2.VideoWriter_fourcc(*"mp4v"), FPS, (W, H))
    for fr in frames:
        writer.write(fr)
    writer.release()

    # Audio bed
    audio = OUT / "bed.wav"
    dur = len(frames) / FPS
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "lavfi",
            "-i",
            f"sine=frequency=196:duration={dur}",
            "-f",
            "lavfi",
            "-i",
            f"sine=frequency=247:duration={dur}",
            "-f",
            "lavfi",
            "-i",
            f"sine=frequency=294:duration={dur}",
            "-filter_complex",
            "amix=inputs=3:duration=longest,afade=t=in:st=0:d=1.2,afade=t=out:st={0}:d=1.5,volume=0.2".format(
                max(dur - 1.5, 0.1)
            ),
            str(audio),
        ],
        check=True,
        capture_output=True,
    )

    out = OUT / "singing_base.mp4"
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(raw),
            "-i",
            str(audio),
            "-c:v",
            "libx264",
            "-crf",
            "18",
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            "-shortest",
            "-movflags",
            "+faststart",
            str(out),
        ],
        check=True,
        capture_output=True,
    )
    print(f"Wrote {out} ({len(frames)} frames, {dur:.1f}s)")


if __name__ == "__main__":
    main()
