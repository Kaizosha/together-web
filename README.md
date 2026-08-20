# Together website

The dependency-free static product site for Together, Kaizōsha’s local-first
video-captioning app for iPhone and iPad.

The root route is the direct continuation of the expanded Together product cell
on `kaizosha.org`. It keeps the same frame, toolbar, status bar, two-tone system,
compact mark, typography, grid, and motion. Scrolling the one expanded surface
reveals the product details without changing to a second interface. When the
main site supplies its active quadrant, Together's synchronous continuation
script applies that position during the initial document render.

Together keeps only its app-specific privacy notice locally. Shared company
pages such as Contact and website Privacy use their canonical `kaizosha.org`
routes.

## Local preview

```sh
python3 tools/dev-server.py 5173
```

## Cloudflare Pages

The repository root is the deployable website. Connect this repository to a
Cloudflare Pages project with framework preset `None`, production branch
`main`, no build command, and build output directory `.`. Every push to `main`
publishes the committed static files directly; there is no generated output or
manual deployment command.

## Routes

- `/` — permanently expanded Together product surface
- `/privacy` — Together’s canonical app privacy notice
- `/404.html` — unknown-route recovery
- `/site.webmanifest`, `/robots.txt`, and `/sitemap.xml` — app and search metadata

There is no package manager, frontend framework, TypeScript, runtime API,
database, account, analytics SDK, build dependency, or server process.

## Shared design

Kaizōsha's main website is the source of truth for `BRAND.md`,
`DESIGN_SYSTEM.md`, the brand icon, and the shared CSS and JavaScript
foundations. Together commits synchronized copies so its repository and
Cloudflare deployment remain completely independent. Product-specific behavior
stays in `assets/styles/together.css` and
`assets/scripts/together-product.js`.
