# Boy Singing / Girl Listening Meme

Recreation of the viral AI lip-sync style from
[Haaland & Bellingham - I need you and I miss you](https://youtu.be/d2myk7UqP54),
using custom faces for **boy singing** and **girl listening**.

## Output

- `dist/i_need_you_and_i_miss_you.mp4` — 1280x720 lyric edit
- `dist/i_need_you_preview.mp4` — smaller 480p share cut
- `dist/i_need_you_poster.png` — final still

## Rebuild

```bash
python3 build_video.py
```

Requires `ffmpeg` and `pillow`.
