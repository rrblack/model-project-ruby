# Static Site — Deploy Guide

This folder is a complete, dependency-free static version of the portfolio site.
No Ruby, no database, no build step, no server to maintain. Once deployed, there
is nothing to manage.

## 1. One-time: copy the assets

Double-click `copy-assets.bat` in the parent folder (`model-site\`). It copies
all images, audio files, `chart.pdf`, and the icons into this folder. After that,
`static-site\` is self-contained.

## 2. One-time: hook up the contact form (Formspree)

1. Go to https://formspree.io and create a free account **using the client's
   email address** — submissions then go straight to her inbox and you never
   touch it again. (Free plan: 50 submissions/month, plenty for a portfolio.)
2. Create a new form; Formspree gives you a URL like
   `https://formspree.io/f/abcdWXYZ`.
3. In `contact.html`, replace `YOUR_FORM_ID` in the form's `action` with that ID.
4. Done. The form includes a honeypot field, so most spam bots are filtered.

After submitting, visitors see Formspree's confirmation page (Japanese-capable)
and are linked back to the site.

## 3. Deploy to Cloudflare Pages (free)

Option A — drag and drop (simplest):
1. Sign up at https://dash.cloudflare.com (free plan).
2. Workers & Pages → Create → Pages → "Upload assets".
3. Drag the entire `static-site` folder in. Done — you get a
   `something.pages.dev` URL immediately.
4. To update the site later, upload again. (Custom domain can be added under
   the project's "Custom domains" tab.)

Option B — connect the GitHub repo:
1. Push this repo to GitHub.
2. Pages → "Connect to Git", pick the repo.
3. Build command: (leave empty) · Build output directory: `static-site`.
4. Every `git push` auto-deploys.

Netlify and GitHub Pages work the same way if you prefer them.
(`_headers` — the security headers file — is honored by Cloudflare Pages and
Netlify; GitHub Pages ignores it, the site still works.)

## What changed from the Rails version

- ERB templates → plain `index.html` / `contact.html`; all image loops expanded.
- Stimulus controllers (slideshow / gallery / nav) → single vanilla `js/main.js`.
  Same behavior, plus: mobile menu now closes when a link is tapped.
- Tailwind via `tailwindcss-rails` → Tailwind v4 browser CDN (pinned version,
  zero build). If the site ever feels slow to style on first paint, the classes
  can be precompiled with the Tailwind CLI — not required.
- AOS library dropped (it was only animating two hero captions) → replaced with
  a tiny CSS animation. One less third-party dependency.
- Contact form: Rails mailer → Formspree (see above).

## Fixes & polish applied during conversion

- Security: `rel="noopener"` on all `target="_blank"` links; YouTube embeds now
  use the privacy-enhanced `youtube-nocookie.com` domain; `_headers` adds a
  Content-Security-Policy and other security headers; honeypot spam filter on
  the form; TikTok link tracking parameters removed.
- Bugs: duplicate `style` attribute on the hero handle (second one — the color —
  was silently ignored by browsers; both now apply); invalid
  `close md:open` attributes removed from the About Me summary; invalid
  `font-style: bold` CSS removed; footer typo "Kurasa Rina" → "Kurasawa Rina";
  duplicate `items-center`/`items-end` conflict in the footer resolved.
- Polish: `loading="lazy"` + Japanese `alt` text on all ~190 images (SEO +
  accessibility + much faster first load); `lang="ja"`, meta description, and
  Open Graph tags added; iframe `title`s for screen readers; copyright year
  updates itself; `prefers-reduced-motion` respected for animations;
  voice-sample card no longer overflows narrow phones (`w-90` → `max-w-xl`).

## If styles ever look broken on the live site

The Content-Security-Policy in `_headers` is strict. If a future change adds a
new external script/style, either add its domain to the policy or delete the
`Content-Security-Policy` line — the site works fine without it, it's
defense-in-depth.
