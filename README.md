# Together website

The standalone product site for Together, Kaizōsha’s local-first video-captioning
app for iPhone and iPad. The intended public hostname is
`https://together.kaizosha.org`.

The site uses the same two-tone markdown system and spatial product structure as
the main Kaizōsha website. Its opening frame matches the Kaizōsha homepage
handoff exactly, then turns Caption, Translate, Export, and Private into four
physical fields that expand through hover, focus, or touch. Product copy and the
app-specific privacy notice come from the adjacent Together iOS project.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate

```bash
npm run build
node --test tests/rendered-html.test.mjs
```

## Routes

- `/` — interactive Together capability directory
- `/privacy` — Together’s app-specific privacy notice
- `/manifest.webmanifest`, `/robots.txt`, and `/sitemap.xml` — app and search metadata

Hosting configuration lives in `.openai/hosting.json`. The Cloudflare worker
adds canonical routing, conservative caching, and baseline security headers.
Optional D1/R2 starter infrastructure remains available but is not used by the
current site.
