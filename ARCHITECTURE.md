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
- the same active-cell grid-track geometry, rendered in its settled state with
  no entry, exit, or slot transition;
- the main site's exact Together lead copy;
- one accessible scroll region that continues into About, Capabilities, and
  Privacy without opening a second interface.

The main site passes the active product slot as `?slot=top-left`,
`?slot=top-right`, `?slot=bottom-left`, or `?slot=bottom-right`. The synchronous
plain-JavaScript controller applies the slot during the initial document render
and removes the temporary query parameter. Direct visits use `top-left`.

## Shared layers

- `assets/styles/brand.css` and `assets/styles/markdown.css` are synchronized
  byte-for-byte from the Kaizōsha shared-design source.
- `assets/styles/together.css` only adds the long active-cell continuation.
- `assets/scripts/site-motion.js` and `document-navigation.js` are the same
  optional progressive enhancements used by Kaizōsha.
- `assets/scripts/together-product.js` applies the incoming product slot and
  cleans the temporary query parameter. Native link navigation stays
  immediate, and all content remains available without it.

Together owns only its product-specific app privacy notice. Company-level
contact, website privacy, legal, marketing, and help destinations remain on
`kaizosha.org`; this site links to those canonical pages instead of duplicating
them.

## Cloudflare Pages hosting

The repository root is the complete public site. Cloudflare Pages connects to
the Git repository with framework preset `None`, production branch `main`, no
build command, and build output directory `.`. A push to `main` publishes the
committed static files directly. Pages supplies extensionless HTML routing and
the custom `404.html`; `_redirects` canonicalizes `/privacy/`, and `_headers`
supplies the security, cache, language, and no-index policies.

There is no frontend dependency, package manager, TypeScript, framework,
runtime API, database, account, or analytics service.

The main-site command `tools/sync-shared-design.sh ../together-web` updates the
committed shared core while Together keeps its content, product extensions, and
Cloudflare Pages project independent.
