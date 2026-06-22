#!/usr/bin/env node
// Submit all sitemap URLs to IndexNow (notifies Bing, Yandex, Seznam, …).
// Usage: node scripts/indexnow.mjs
// Requires the key file hosted at https://<host>/<key>.txt (already deployed).

const HOST = process.env.INDEXNOW_HOST || 'projecto-calculator.com';
const KEY = process.env.INDEXNOW_KEY || '32c331cc0dbe41938d25130c4e8ee3f7';
const keyLocation = `https://${HOST}/${KEY}.txt`;
const SITEMAP = `https://${HOST}/sitemap.xml`;

const res = await fetch(SITEMAP);
const xml = await res.text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) {
  console.error('No URLs found in sitemap', SITEMAP);
  process.exit(1);
}

const submit = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation, urlList }),
});
const body = await submit.text();
console.log(`IndexNow: HTTP ${submit.status} ${submit.statusText} — submitted ${urlList.length} URLs`);
if (body) console.log(body);
process.exit(submit.ok ? 0 : 1);
