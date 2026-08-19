# Together website

The standalone product site for Together, Kaizōsha’s local-first video-captioning
app for iPhone and iPad. The intended public hostname is
`https://together.kaizosha.org`.

The site follows the two-tone markdown visual system used by
`https://kaizosha.org`, while its product copy and app-specific privacy notice
come from the adjacent Together iOS project.

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

- `/` — product page and interactive captions/translation/export demo
- `/privacy` — Together’s app-specific privacy notice
- `/robots.txt` and `/sitemap.xml` — search-engine metadata

Hosting configuration lives in `.openai/hosting.json`. Optional D1/R2 starter
infrastructure remains available but is not used by the current site.
