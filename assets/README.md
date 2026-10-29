# How to make the tape hers

Right now every frame on the page is an honest **SIGNAL LOST placeholder** (labelled spots where your real memories go). You do not need to touch any code — just add files with these exact names and they appear automatically on next load.

## Photos

Drop your photos into this folder (`assets/`) inside a new folder called `pics`:

```
assets/
└── pics/
    ├── 01.jpg    ← any of your favourite pictures of Angel
    ├── 02.jpg
    ├── ...
    ├── 12.jpg
```

- Names must be `01.jpg` … `12.jpg` (`.jpg` works; also fine: rename the number in `index.html` — each frame has a `data-photo="assets/pics/NN.jpg"` tag you can point anywhere).
- Landscape or portrait both work — frames crop automatically.
- Any frame you haven't filled simply keeps its "SIGNAL LOST" plate, so you can add a few at a time.

Where each number shows up:

| Numbers | Where on the page |
|---|---|
| 01–06 | Hero collage at the very top |
| 07–12 | The year reel (2019 onward) |

(Reusing a number in two places is fine — the site's code does it too, so two frames can share one picture.)

## Video

Create `assets/video/` and put one clip called `moments.mp4` there:

```
assets/
└── video/
    └── moments.mp4
```

It plays automatically (muted) when its panel scrolls into view, in the **2025** segment — the one with the wide player chrome. Any mp4 works; 1080p or smaller keeps scrolling smooth.

## Pointing a frame at a different file

In `index.html`, find the frame you want and change its `data-photo`:

```html
<figure class="still pv pv-lg r--2 tint-3" data-photo="assets/pics/07.jpg">
```

Anything the browser can open works there — even a file elsewhere: `data-photo="../our-summer/me.jpg"`.

That's it. Photos in, tape plays.
