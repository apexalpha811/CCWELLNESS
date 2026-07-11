# Premium IV and PRP Landing Page

A responsive React landing page for physician-directed IV therapy, injections, PRP, and regenerative care. The site uses Vite, TypeScript, GSAP, and the self-hosted Puck visual editor.

## Local development

```bash
npm install
npm run dev
```

Open the public page at `http://localhost:5173/` and the visual editor at `http://localhost:5173/edit`.

## Visual editing workflow

1. Run `npm run dev`.
2. Open `/edit`.
3. Edit copy, links, imagery, service order, or section visibility.
4. Select Puck's Publish button to save the page to `src/content/page.json`.
5. Review the JSON diff and the public page.
6. Commit and push the approved change. Vercel will redeploy from GitHub.

The editor toolbar can export a JSON backup, import a backup, or reset the editor to the current tracked page document. The editor route redirects to the public page in production.

## Brand placeholders

Replace the following before launch:

- Practice name and logo treatment
- Booking URL
- Phone and email
- Address and hours
- Open Graph image
- Metadata and structured business data in `index.html`

## Verification

```bash
npm run lint
npm run build
npm run preview
```

The responsive layout targets 320px, 768px, 1024px, 1920px, and 4K widths. Motion respects the operating system's reduced-motion preference.

## GitHub and Vercel deployment

Repository setup will be completed after local approval and receipt of the destination repository information.

Use these Vercel settings:

- Framework preset: Vite
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

The included `vercel.json` supplies the build settings and single-page fallback. No environment variables are required for the initial deployment.
