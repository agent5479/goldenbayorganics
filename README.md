# Golden Bay Organics

Brochure website for [Golden Bay Organics](https://www.facebook.com/profile.php?id=100092461392927) — organic grocer at 47 Commercial Street, Takaka.

**Live site:** https://goldenbayorganics.co.nz/

## Local development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173/`).

## Build

```bash
npm run build
npm run preview
```

The static site is output to `dist/` and prerendered for SEO and social link previews.

## Updating stock and specials

Edit the seed data files and push to `main`:

- [`src/data/stock.json`](src/data/stock.json) — product showcase
- [`src/data/specials.json`](src/data/specials.json) — store updates and featured specials

Product images go in [`public/images/`](public/images/). Reference the filename in each stock item's `image` field. Missing images show a category-coloured placeholder.

## Deployment

Pushes to `main` trigger [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds and deploys to GitHub Pages.

**First-time setup:**

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set **Source** to **GitHub Actions**

## Images

Add photos to `public/images/` as JPG files. On build, `npm run generate:images` creates WebP thumbnails in `public/images/thumbs/` and updates [`src/data/gallery.json`](src/data/gallery.json).

To regenerate thumbnails locally:

```bash
npm run generate:images
```

Link products to photos by setting the `image` filename in [`src/data/stock.json`](src/data/stock.json) — the gallery script matches them automatically.

## Future: Firebase admin

Phase 2 will move stock data to Firebase Firestore with an admin UI. The data layer in [`src/lib/stock.ts`](src/lib/stock.ts) is structured so JSON can be swapped for Firestore reads without changing page components.

Planned GitHub Secrets for CI builds:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`

## Tech stack

- React 19 + TypeScript
- Vite 6 + [vite-react-ssg](https://github.com/Daydreamer-riri/vite-react-ssg) (static prerender)
- React Router 6
- GitHub Pages
