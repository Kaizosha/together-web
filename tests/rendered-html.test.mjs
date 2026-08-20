import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Together product page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Together — Different Language\. Same Moment\.<\/title>/i,
  );
  assert.match(html, /DIFFERENT LANGUAGE\./);
  assert.match(html, /SAME MOMENT\./);
  assert.match(html, />Caption<|>Caption<!--/);
  assert.match(html, />Translate<|>Translate<!--/);
  assert.match(html, />Export<|>Export<!--/);
  assert.match(html, />Private<|>Private<!--/);
  assert.match(html, /Generate realtime captions on device/);
  assert.match(html, /selected media and its derived text are not uploaded/i);
  assert.match(html, /iPhone and iPad/);
  assert.match(html, /VTT \/ SRT \/ TTML \/ TXT \/ MD \/ JSON/);
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  assert.equal((html.match(/<main\b/gi) ?? []).length, 1);
  assert.match(html, /aria-label="Together capabilities"/i);
  assert.match(html, /aria-label="Open Together product information"/i);
  assert.match(html, /class="together-canvas"/i);
  assert.match(html, /href="\/privacy"/);
  assert.match(html, /https:\/\/together\.kaizosha\.org\//);
  assert.match(html, /\/og\.png/);
  assert.match(html, /"@type":"MobileApplication"/);
  assert.match(html, /iOS 26 or later; iPadOS 26 or later/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
  assert.doesNotMatch(html, /macOS|Mac Catalyst/i);
  assert.doesNotMatch(html, /alignment-stage|alignment-range|convergence-stage/i);
});

test("server-renders the app-specific privacy notice", async () => {
  const response = await render("/privacy");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Privacy Notice — Together<\/title>/i);
  assert.match(html, /Together Privacy Notice/);
  assert.match(html, /Together does not collect personal data\./);
  assert.match(html, /On-device processing/);
  assert.match(html, /Local storage and deletion/);
  assert.match(html, /Last updated August 18, 2026/i);
  assert.match(html, /data-file="TOGETHER-PRIVACY\.md"/i);
  assert.match(html, /class="section-head"/i);
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  assert.equal((html.match(/<main\b/gi) ?? []).length, 1);
  assert.match(html, /https:\/\/kaizosha\.org\/contact/);
  assert.doesNotMatch(html, /property="og:image"/i);
  assert.doesNotMatch(html, /"@type":"MobileApplication"/);
});

test("renders a clean noindex page for unknown routes", async () => {
  const response = await render("/missing-page");
  assert.equal(response.status, 404);

  const html = await response.text();
  assert.match(html, /<title>Page Not Found — Together<\/title>/i);
  assert.match(html, /This page isn(?:&apos;|&#x27;|')t together\./i);
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  assert.equal((html.match(/<main\b/gi) ?? []).length, 1);
  const robotsTags = html.match(/<meta[^>]+name="robots"[^>]*>/gi) ?? [];
  assert.equal(robotsTags.length, 1);
  assert.match(robotsTags[0], /content="noindex"/i);
  assert.doesNotMatch(html, /rel="canonical"/i);
  assert.doesNotMatch(html, /property="og:image"/i);
  assert.doesNotMatch(html, /"@type":"MobileApplication"/);
});

test("serves robots and sitemap metadata routes", async () => {
  const [robotsResponse, sitemapResponse] = await Promise.all([
    render("/robots.txt"),
    render("/sitemap.xml"),
  ]);

  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /User-Agent: \*/i);
  assert.match(robots, /Sitemap: https:\/\/together\.kaizosha\.org\/sitemap\.xml/i);

  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /https:\/\/together\.kaizosha\.org\//);
  assert.match(sitemap, /https:\/\/together\.kaizosha\.org\/privacy/);
});

test("serves the app manifest and hardened document responses", async () => {
  const [pageResponse, manifestResponse] = await Promise.all([
    render("/"),
    render("/manifest.webmanifest"),
  ]);

  assert.equal(pageResponse.headers.get("cache-control"), "no-store");
  assert.equal(pageResponse.headers.get("x-content-type-options"), "nosniff");
  assert.equal(pageResponse.headers.get("x-frame-options"), "DENY");
  assert.match(pageResponse.headers.get("permissions-policy") ?? "", /camera=\(\)/);

  assert.equal(manifestResponse.status, 200);
  const manifest = await manifestResponse.json();
  assert.equal(manifest.name, "Together by Kaizōsha");
  assert.equal(manifest.start_url, "/");
});

test("normalizes the privacy route and rejects unsupported methods", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  };
  const ctx = { waitUntil() {}, passThroughOnException() {} };

  const redirect = await worker.fetch(
    new Request("https://together.kaizosha.org/privacy/"),
    env,
    ctx,
  );
  assert.equal(redirect.status, 308);
  assert.equal(redirect.headers.get("location"), "https://together.kaizosha.org/privacy");

  const rejected = await worker.fetch(
    new Request("https://together.kaizosha.org/", { method: "POST" }),
    env,
    ctx,
  );
  assert.equal(rejected.status, 405);
  assert.equal(rejected.headers.get("allow"), "GET, HEAD");
});
