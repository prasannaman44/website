# Prasanna Sairam — Portfolio

A personal portfolio site for a backend & systems-focused Computer Science student
at the University at Buffalo. Built as a single self-contained React component
(Vite + React, no Tailwind — the component injects its own CSS), with a deep-blue
theme, a fixed sidebar, an interactive cursor, an embedded résumé, filterable
projects, and clickable skills that jump to the work that used them.

## Tech

- **Vite + React** (no UI framework or CSS library)
- One self-contained component: [`src/App.jsx`](src/App.jsx) — all content lives in
  labeled constants at the top (`PROFILE`, `STATUS`, `STATS`, `HIGHLIGHTS`,
  `EDUCATION`, `PROJECTS`, `SKILLS`)
- HTTP security headers for the host: [`public/_headers`](public/_headers)
  (Netlify / Cloudflare Pages) and [`vercel.json`](vercel.json) (Vercel)

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

## Deploy

Push to GitHub and connect the repo to **Vercel**, **Netlify**, or
**Cloudflare Pages** — all redeploy automatically on push. The security headers
apply only after deploy (not on `localhost`); verify the live URL at
[securityheaders.com](https://securityheaders.com).
