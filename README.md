# Together website

The dependency-free static product site for Together, Kaizōsha’s local-first
video-captioning app for iPhone and iPad.

The root route is the direct continuation of the expanded Together product cell
on `kaizosha.org`. It keeps the same frame, toolbar, status bar, two-tone system,
compact mark, typography, grid, and motion. Scrolling the one expanded surface
reveals the product details without changing to a second interface.

Together keeps only its app-specific privacy notice locally. Shared company
pages such as Contact and website Privacy use their canonical `kaizosha.org`
routes.

## Local preview

```sh
python3 tools/dev-server.py 5173
```

## Production build

```sh
./tools/build-site.sh
```

## Routes

- `/` — permanently expanded Together product surface
- `/privacy` — Together’s canonical app privacy notice
- `/404.html` — unknown-route recovery
- `/site.webmanifest`, `/robots.txt`, and `/sitemap.xml` — app and search metadata

There is no package manager, frontend framework, TypeScript, runtime API,
database, account, analytics SDK, or build dependency. The explicit build
allowlist produces `dist/client` plus the static Cloudflare worker entrypoint at
`dist/server/index.js`.
