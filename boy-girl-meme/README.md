# Face-swapped singing meme (boy singing / girl listening)

Recreation of the viral [Haaland & Bellingham - I need you and I miss you](https://youtu.be/d2myk7UqP54) style:

1. Build a singing/listening template with mouth motion
2. **Face-swap** your boy + girl photos onto the characters with InsightFace `inswapper`
3. Animate lip flaps so it still looks like singing

## Output

- `dist/face_swapped_singing.mp4` — face-replaced singing video
- `swapped_keys/` — face-swapped stills (open/closed mouth)
- `faces/` — source face images used for swap

## Rebuild

```bash
# 1) Put source faces in faces/boy.png and faces/girl.png
# 2) Ensure base_frames/ has singer + listener templates
# 3) Face-swap keys + assemble video
python3 face_swap_video.py --help
python3 build_singing_base.py   # optional template rebuild
```

Requires: `ffmpeg`, `opencv-python`, `insightface`, `onnxruntime`, `pillow`.
