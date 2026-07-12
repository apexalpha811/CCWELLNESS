# CC Wellness Website Owner Guide

This folder contains the CC Wellness landing page. The website uses React, Vite, TypeScript, GSAP, and a local Puck visual editor.

## Quick start

Open PowerShell and run:

```powershell
cd "C:\Users\kv8n11\css peptide landing page"
git pull
npm install
npm run dev
```

Then open:

- Website preview: [http://localhost:5173](http://localhost:5173)
- Visual editor: [http://localhost:5173/edit](http://localhost:5173/edit)

Keep the PowerShell window open while editing. Press `Ctrl+C` in that window when you want to stop the local website.

## Edit the website visually

1. Open `http://localhost:5173/edit`.
2. Select a section from the left sidebar or directly from the preview.
3. Use the right sidebar to edit its fields.
4. Reorder sections by dragging them in the editor.
5. Use the viewport controls to check phone, tablet, and desktop layouts.
6. Click **Publish** when the edits are ready.

The Publish button saves the complete website content to `src/content/page.json`. It does not publish directly to the live website.

You can edit:

- Practice name and navigation
- Headlines, descriptions, and buttons
- Booking and contact links
- Image URLs and image alt text
- Treatment names, descriptions, and benefits
- Treatment and section order
- Section visibility
- Address, phone number, email, and business hours

The clinical qualification language is intentionally locked inside the website code.

## Back up or restore content

The toolbar above the visual editor provides three controls:

- **Export backup** downloads the current website content as JSON.
- **Import backup** loads a previously exported JSON file into the editor.
- **Reset** returns the editor to the current tracked `src/content/page.json` file.

Export a backup before large edits. After importing a backup, click **Publish** to save it to the project.

## Change an image

Image fields currently accept a direct public image URL.

1. Upload the image to your preferred image host.
2. Copy the direct HTTPS image URL.
3. Paste it into the section's **Image URL** field.
4. Write a short, accurate description in **Image alt text**.
5. Click **Publish**.

Do not paste a Google Images search result page or a link to a webpage containing the image. The URL must open the image itself.

## Review changes before publishing online

Open the normal preview at `http://localhost:5173` and check:

- Desktop layout
- Tablet layout
- Phone layout
- All buttons and links
- Treatment names and clinical wording
- Contact information
- Image cropping and alt text

Then run:

```powershell
npm run lint
npm run build
```

Both commands must finish without errors.

## Publish changes to GitHub and Vercel

The GitHub repository is [apexalpha811/CCWELLNESS](https://github.com/apexalpha811/CCWELLNESS). Vercel should be connected to its `main` branch.

After clicking Publish in Puck and reviewing the website, run:

```powershell
git status
git add src/content/page.json
git commit -m "Update website content"
git push
```

If you changed code, styling, metadata, or other tracked files, stage those exact files too. Avoid `git add -A` when unrelated files are present.

After the push, Vercel automatically creates a new production deployment. Check the Vercel dashboard and open the live URL to confirm the update.

## Update business metadata

The visible page content is stored in `src/content/page.json`. Search-engine and sharing metadata are stored in `index.html`.

Before launch, confirm these values:

- Practice name
- Booking URL
- Phone number and email
- Address and hours
- Page title and description
- Open Graph image
- Structured business information

Changes to `index.html` require a normal Git commit and push.

## Important files

- `src/content/page.json`: visual editor content
- `src/puck/config.tsx`: editable fields and component registration
- `src/puck/components.tsx`: page sections and interactions
- `src/styles.css`: responsive styling
- `index.html`: metadata and structured business information
- `vercel.json`: Vercel build configuration

## Common problems

### The local website will not open

Confirm that `npm run dev` is still running. Use the exact local URL shown in PowerShell if Vite selects a different port.

### The visual editor does not open on the live website

This is intentional. `/edit` only works during local development so visitors cannot access editing controls.

### Publish does not update the live website

Puck saves locally. Commit and push `src/content/page.json` to GitHub so Vercel can deploy it.

### GitHub rejects the push

Run:

```powershell
gh auth status
gh auth login -h github.com
```

Then retry `git push`.

### You need to discard an editor experiment

Use **Reset** before clicking Publish. If the file was already saved but not committed, run:

```powershell
git restore src/content/page.json
```

Only run that command when you are certain the uncommitted content edits should be discarded.
