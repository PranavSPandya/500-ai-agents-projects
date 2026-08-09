#!/usr/bin/env python3
"""Build a short 'I need you and I miss you' style meme video."""

from __future__ import annotations

import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
FRAMES = ROOT / "frames"
OUT_DIR = ROOT / "out"
ARTIFACTS = Path("/opt/cursor/artifacts")
FONT = "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf"
W, H = 1280, 720


def fit(img: Image.Image) -> Image.Image:
    img = img.convert("RGB")
    src_w, src_h = img.size
    scale = max(W / src_w, H / src_h)
    nw, nh = int(src_w * scale), int(src_h * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - W) // 2
    top = (nh - H) // 2
    return img.crop((left, top, left + W, top + H))


def caption(img: Image.Image, text: str) -> Image.Image:
    img = fit(img)
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype(FONT, 44)
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (W - tw) // 2
    y = H - th - 58
    for dx, dy in ((3, 3), (2, 2), (-1, 1), (1, -1), (0, 3)):
        draw.text((x + dx, y + dy), text, font=font, fill=(0, 0, 0, 220))
    draw.text((x, y), text, font=font, fill=(255, 255, 255))
    return img


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True, capture_output=True)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    ARTIFACTS.mkdir(parents=True, exist_ok=True)

    sequence = [
        ("frame_girl_listen_1.png", "I need you", 2.4),
        ("frame_boy_sing_2.png", "And I miss you", 2.5),
        ("frame_girl_listen_2.png", "And now I wonder", 2.3),
        ("frame_boy_sing_1.png", "I need you", 2.5),
        ("frame_girl_listen_3.png", "And I miss you", 2.3),
        ("frame_boy_sing_2.png", "All my life", 2.3),
        ("frame_together.png", "I need you and I miss you", 3.2),
    ]

    caps: list[tuple[Path, float]] = []
    for i, (name, lyric, dur) in enumerate(sequence):
        out = OUT_DIR / f"cap_{i:02d}.png"
        caption(Image.open(FRAMES / name), lyric).save(out, quality=98)
        caps.append((out, dur))

    clips: list[Path] = []
    for i, (path, dur) in enumerate(caps):
        frames = max(int(dur * 30), 1)
        clip = OUT_DIR / f"clip_{i:02d}.mp4"
        # Gentle Ken Burns zoom for presence
        run(
            [
                "ffmpeg",
                "-y",
                "-loop",
                "1",
                "-framerate",
                "30",
                "-i",
                str(path),
                "-vf",
                (
                    f"scale=8000:-1,"
                    f"zoompan=z='min(1.0+0.0015*on,1.10)':"
                    f"x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
                    f"d={frames}:s={W}x{H}:fps=30,format=yuv420p"
                ),
                "-frames:v",
                str(frames),
                "-c:v",
                "libx264",
                "-preset",
                "medium",
                "-crf",
                "18",
                "-pix_fmt",
                "yuv420p",
                str(clip),
            ]
        )
        clips.append(clip)

    # Soft romantic chord pad (original synth bed, not copyrighted song)
    audio = OUT_DIR / "bed.wav"
    run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "lavfi",
            "-i",
            "sine=frequency=196:duration=20",
            "-f",
            "lavfi",
            "-i",
            "sine=frequency=246.94:duration=20",
            "-f",
            "lavfi",
            "-i",
            "sine=frequency=293.66:duration=20",
            "-f",
            "lavfi",
            "-i",
            "sine=frequency=392:duration=20",
            "-filter_complex",
            (
                "[0]volume=0.35[a];[1]volume=0.28[b];[2]volume=0.22[c];[3]volume=0.12[d];"
                "[a][b][c][d]amix=inputs=4:duration=longest,"
                "afade=t=in:st=0:d=2,afade=t=out:st=17.5:d=2.5,"
                "lowpass=f=1400,volume=0.35,aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo"
            ),
            str(audio),
        ]
    )

    # Crossfade chain between clips
    inputs: list[str] = []
    for clip in clips:
        inputs.extend(["-i", str(clip)])
    inputs.extend(["-i", str(audio)])

    n = len(clips)
    fade = 0.45
    # Build xfade filter graph
    parts: list[str] = []
    # offset accumulates: after first clip, each xfade starts at cumulative - fade
    offsets: list[float] = []
    total = caps[0][1]
    for i in range(1, n):
        off = total - fade
        offsets.append(off)
        total = off + caps[i][1]

    if n == 1:
        vfilter = "[0:v]format=yuv420p[vout]"
    else:
        cur = "[0:v]"
        for i in range(1, n):
            out = f"[v{i}]" if i < n - 1 else "[vout]"
            parts.append(
                f"{cur}[{i}:v]xfade=transition=fade:duration={fade}:offset={offsets[i-1]:.3f}{out}"
            )
            cur = f"[v{i}]"
        vfilter = ";".join(parts)

    final = ARTIFACTS / "i_need_you_and_i_miss_you.mp4"
    run(
        [
            "ffmpeg",
            "-y",
            *inputs,
            "-filter_complex",
            f"{vfilter}",
            "-map",
            "[vout]",
            "-map",
            f"{n}:a",
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            "18",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-shortest",
            "-movflags",
            "+faststart",
            str(final),
        ]
    )

    preview = ARTIFACTS / "i_need_you_preview.mp4"
    run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(final),
            "-vf",
            "scale=854:480",
            "-c:v",
            "libx264",
            "-crf",
            "20",
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            "-movflags",
            "+faststart",
            str(preview),
        ]
    )

    Image.open(OUT_DIR / "cap_06.png").save(ARTIFACTS / "i_need_you_poster.png")
    # Copy into workspace for the PR
    (ROOT / "dist").mkdir(exist_ok=True)
    for name in (
        "i_need_you_and_i_miss_you.mp4",
        "i_need_you_preview.mp4",
        "i_need_you_poster.png",
    ):
        src = ARTIFACTS / name
        dst = ROOT / "dist" / name
        dst.write_bytes(src.read_bytes())
        print(f"Wrote {dst} ({dst.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
