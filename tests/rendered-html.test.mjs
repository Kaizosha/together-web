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
    /<title>Together — Watch Anything\. Hear Everything\.<\/title>/i,
  );
  assert.match(html, /Bring worlds/);
  assert.match(html, /Understand video in another language without sending it away\./);
  assert.match(html, /PRIVATE BY ARCHITECTURE/);
  assert.match(html, /iPhone \+ iPad/);
  assert.match(html, /href="\/privacy"/);
  assert.match(html, /https:\/\/together\.kaizosha\.org\//);
  assert.match(html, /\/og\.png/);
  assert.match(html, /"@type":"MobileApplication"/);
  assert.match(html, /iOS 26 or later; iPadOS 26 or later/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
  assert.doesNotMatch(html, /macOS|Mac Catalyst/i);
});

test("server-renders the app-specific privacy notice", async () => {
  const response = await render("/privacy");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Privacy Notice — Together<\/title>/i);
  assert.match(html, /Together Privacy Notice/);
  assert.match(html, /Together does not collect personal data\./);
  assert.match(html, /ON-DEVICE PROCESSING/);
  assert.match(html, /LOCAL STORAGE AND DELETION/);
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
