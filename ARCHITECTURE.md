# Together Site Architecture

Together uses the same dependency-free static architecture and visual contract
as `kaizosha.org`.

## Public routes

| Route | Role | Page family |
| --- | --- | --- |
| `/` | Expanded Together product continuation | `directory` |
| `/privacy` | Canonical Together app privacy notice | `document` |
| `/404.html` | Unknown-route recovery | `error` |

## Root experience

The main Kaizōsha homepage expands Together in one physical product cell before
the scroll handoff. The destination renders that state immediately:

- the same `home-main` frame, top and bottom bars, drafting grid, tokens, and
  compact Kaizōsha mark;
- the same active-cell grid-track geometry and 180/420/560ms motion language;
- the main site's exact Together lead copy;
- one accessible scroll region that continues into About, Capabilities, and
  Privacy without opening a second interface.

The main site passes the active product slot as `?slot=top-left`,
`?slot=top-right`, `?slot=bottom-left`, or `?slot=bottom-right`. The synchronous
plain-JavaScript controller swaps the physical cell before first paint and then
removes the temporary query parameter. Direct visits use `top-left`.

## Shared layers

- `assets/styles/brand.css` is copied from the Kaizōsha brand system.
- `assets/styles/markdown.css` is copied from the Kaizōsha site at `c0b51b1`.
- `assets/styles/together.css` only adds the long active-cell continuation.
- `assets/scripts/site-motion.js` and `document-navigation.js` are the same
  optional progressive enhancements used by Kaizōsha.
- `assets/scripts/together-product.js` owns slot continuation and frame-out
  navigation. All content remains available without it.

## Build and hosting

`tools/build-site.sh` recreates `dist/` from an explicit allowlist. Public files
are copied to `dist/client/`, and `tools/sites-static-worker.js` becomes
`dist/server/index.js`. The worker handles HTTPS, canonical redirects, GET/HEAD
restriction, cache policy, security headers, and 404 no-index headers.

There is no frontend dependency, package manager, TypeScript, framework,
runtime API, database, account, or analytics service.
