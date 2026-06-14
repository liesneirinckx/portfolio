# Portfolio — Lies Neirinckx

A multi-page portfolio site built with **plain HTML, CSS and JavaScript** — no framework, no backend, no build step. Dark, cinematic aesthetic for a final-year journalism student.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Landing page — hero, discipline cards, statement, contact |
| `photography.html` | Filterable masonry gallery with lightbox |
| `video.html` | Video cards that open embeds in the lightbox |
| `audio.html` | Audio pieces with native players |
| `text.html` | Longform / writing list |
| `about.html` | Bio, stats, skills, experience timeline |

## Run it
Just open `index.html` in a browser. To avoid any local-file quirks, you can also serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## What's placeholder (swap these out)
Everything is dummy content ready to replace:

- **Name/brand** — currently "Lies Neirinckx". Search-replace across all `.html` files if it ever changes.
- **Images** — `https://picsum.photos/...` URLs. Replace with your own (e.g. an `assets/img/` folder).
- **Video embeds** — `data-src="https://www.youtube.com/embed/..."` on each `.vcard` in `video.html`. Swap in your real YouTube/Vimeo embed URLs.
- **Audio** — `<source src="https://www.soundhelix.com/...">` in `audio.html`. Point to your own MP3 files.
- **Article links** — the `href="#"` on each item in `text.html`.
- **Email** — `hello@liesneirinckx.com` (used in `mailto:` links).
- **Social links** — the four `href="#"` icons in every footer (Instagram, X, LinkedIn, YouTube).
- **Copy/stats** — the bio, timeline and the small stat numbers on each page header are placeholder text written for a final-year student; edit to match your real work.

## Features
- Dark, cinematic single-theme design (no light mode).
- Lightbox for photos *and* video embeds (keyboard: ←/→ to navigate, Esc to close).
- Category filtering on the photography page.
- Scroll-reveal animations (respects `prefers-reduced-motion`).
- Fully responsive with a mobile nav.

## Customizing the look
Colors, fonts and spacing live as CSS variables at the top of `css/style.css` (the `:root` block). Change `--accent` to reskin the whole site.
