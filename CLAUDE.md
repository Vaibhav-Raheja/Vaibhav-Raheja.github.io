# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page portfolio for Vaibhav Raheja, robotics engineer. Vanilla JavaScript, no build system, no framework, no external JS dependencies. Deployed automatically to GitHub Pages from the `main` branch. Live at https://vaibhav-raheja.github.io/

## Architecture

### Files at a glance

```
index.html              — Static section shells; JS populates content on load
assets/
├── js/
│   ├── data.js         — All portfolio content (THE file to edit for updates)
│   ├── main.js         — Renders all sections from portfolioData; theme toggle; scroll reveal; active-nav highlighting
│   └── fx.js           — Hero entrance animation; project-card magnetic hover
├── css/
│   └── style.css       — All styling; CSS custom properties for light/dark theming
images/
├── profile-vaibhav.jpg — Profile photo
└── thumbs/             — Project poster images (.jpg) and clips (.mp4, some legacy .gif)
```

### Data layer (`assets/js/data.js`)

Single `portfolioData` object — the only place to edit content. Top-level keys:

- `personal` — name, title, location, resume URL, photo path, hero headline/lede, about paragraphs
- `proof` — hero stat cards: `{ value, label, note }`
- `featuredProjects` — array of in-depth project entries (see schema below)
- `experience` — work history: `{ role, company, location, period, current, summary, details[] }`
- `capabilities` — skills grid: `{ title, items }` (items is a comma-separated string)
- `education` — `{ degree, institution, period }`
- `sideProjects` — shorter project entries: `{ id, title, year, category, description, stack[], link }`
- `contact` — `{ email, linkedin, github, resume }`

### Rendering (`assets/js/main.js`)

Builds all DOM from `portfolioData` using a small `h(tag, attrs, children)` helper. No framework. Sections rendered: hero proof stats, experience timeline, featured projects, capabilities, education, side projects (Labs), about paragraphs, contact links.

Theme toggle: reads/writes `data-theme` attribute on `<html>` and persists to `localStorage`. Respects `prefers-color-scheme` as the default when no stored preference exists.

Expandable engineering-notes panels on featured project cards are wired up in `main.js` after render.

### Visual effects (`assets/js/fx.js`)

- **Hero entrance** — inline CSS transition applied via `requestAnimationFrame` on page load. (Scroll reveal lives in `main.js` — `.reveal-target`/`.is-visible` via IntersectionObserver, respects `prefers-reduced-motion`.)
- **Project card magnetic hover** — subtle `translate` on `.project__media` following cursor position.

### Theming (`assets/css/style.css`)

All colors are CSS custom properties defined under `:root` (light) and `:root[data-theme="dark"]`. Key variables: `--bg`, `--paper`, `--ink`, `--muted`, `--accent`, `--line`. Typography uses Geist and Geist Mono loaded from Google Fonts.

## Common Development Tasks

### Edit any portfolio content
Open `assets/js/data.js` and modify the relevant key. No other file needs to change for content-only updates.

### Add or update a featured project
Add an entry to `featuredProjects`. Required fields:

```js
{
  id: "unique-slug",
  title: "Project Name",
  category: "Short descriptor",
  year: "2024",
  role: "Your role, Org",
  outcome: "One-sentence result shown in the card header.",
  summary: "2-3 sentence paragraph shown in the card body.",
  stack: ["Tech", "Tech"],
  facts: ["Stat 1", "Stat 2"],          // pill badges
  image: "images/thumbs/poster.jpg",    // fallback / OG image
  video: "images/thumbs/clip.mp4",      // optional; replaces image on hover
  imageAlt: "Descriptive alt text",
  links: [{ label: "Source", url: "https://..." }],  // empty array if none
  notes: {
    problem: "What problem this solved and why it was hard.",
    constraints: ["Constraint 1", "Constraint 2"],
    role: "What you specifically owned.",
    approach: "How you approached it.",
    tradeoffs: ["Tradeoff or decision 1", "Tradeoff 2"],
    outcome: ["Measurable result 1", "Result 2"]
  }
}
```

The `notes` block powers the expandable engineering-notes panel on each project card.

### Add a side project
Add an entry to `sideProjects`:

```js
{
  id: "unique-slug",
  title: "Project Name",
  year: "2024",
  category: "Domain / Tech",
  description: "What it is and why it exists.",
  stack: ["Python", "ROS"],
  link: "https://github.com/..."
}
```

### Restyle or retheme
Edit CSS custom properties in `assets/css/style.css` under `:root` (light) and `:root[data-theme="dark"]`. Do not hardcode colors outside these blocks.

### Add media for a project
Preferred format: **mp4 (H.264, CRF ~28, `+faststart`)** — not GIFs. GIFs are 5-10x larger for equivalent content. Keep clips short (under 30 s) and file size under ~5 MB. Encode with:

```bash
ffmpeg -i input.mov -vcodec libx264 -crf 28 -movflags +faststart -an output.mp4
```

Place the file in `images/thumbs/`, reference it as `video: "images/thumbs/output.mp4"` in `data.js`. A `.jpg` poster (`image:`) is still required as the static fallback.

## Deployment

- Push to `main` → GitHub Pages deploys automatically. No build step.
- Resume PDF lives in a separate repository (`CV`) and is served from `https://vaibhav-raheja.github.io/CV/Vaibhav_Resume.pdf`. Do not look for it in this repo.
- Google Analytics: `G-8BL61YTMC1` (wired in `index.html`).

## Key Notes

- **No external JS dependencies** — vanilla JS only; do not introduce libraries or npm.
- **localStorage** — used for theme persistence (`theme` key).
- **Fonts** — Geist and Geist Mono via Google Fonts; loaded in `index.html` `<head>`.
- **SEO** — Open Graph, Twitter Card meta tags, and a `Person` JSON-LD block are in `index.html`.
- **Accessibility** — skip link, `aria-label` on nav/buttons, `alt` text on images. Maintain these when adding content.
