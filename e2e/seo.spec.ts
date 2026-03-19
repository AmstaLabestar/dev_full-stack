import { expect, test } from "@playwright/test";

test("exposes robots, sitemap and manifest routes", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  await expect(await robots.text()).toContain("Sitemap:");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  await expect(await sitemap.text()).toContain("<urlset");

  const manifest = await request.get("/manifest.webmanifest");
  expect(manifest.ok()).toBeTruthy();
  await expect(await manifest.text()).toContain('"name":"HamzaDev Portfolio"');
});

test("serves social images", async ({ request }) => {
  const openGraph = await request.get("/opengraph-image");
  expect(openGraph.ok()).toBeTruthy();
  expect(openGraph.headers()["content-type"]).toContain("image/png");

  const twitter = await request.get("/twitter-image");
  expect(twitter.ok()).toBeTruthy();
  expect(twitter.headers()["content-type"]).toContain("image/png");
});
