// ─── Daily blog generator ─────────────────────────────────────────────────────
// Generates N brand-new blog posts with the Claude API, matching the existing
// posts' voice, structure, length, and on-page SEO, then writes them into this
// repo's blog data model:
//
//   • data/articles.ts ........................ registry entry { slug, title, date,
//        excerpt } that drives the /blog listing, generateStaticParams, and the
//        sitemap (app/sitemap.ts).
//   • data/i18n/articles/_source/index.json ... English source of truth, keyed by
//        slug → { title, excerpt, date, bodyHtml }. getArticleBody() renders the
//        English body from here (and it is the base every translation overlays).
//   • data/i18n/articles/<locale>.json ........ per-locale overlay, keyed by slug →
//        { title, excerpt, bodyHtml } for each of the 10 non-default locales.
//
// English bodies for the original 20 posts are hand-authored JSX in
// app/[locale]/blog/[slug]/ArticleContent.tsx; generated posts are NOT added there
// — the [slug] route renders any slug outside RICH_ENGLISH_SLUGS from the HTML
// source above (English included), so a JSON/registry write is all that's needed.
//
// A push of these changes to `main` triggers the Vercel production deploy and the
// IndexNow ping (see scripts/indexnow.mjs / .github/workflows/blog.yml).
//
// Usage:
//   node scripts/generate-blog.mjs              # generate 2 posts, write files
//   node scripts/generate-blog.mjs --count 1    # generate 1 post
//   node scripts/generate-blog.mjs --no-write   # generate + print, write nothing
//
// Env:
//   ANTHROPIC_API_KEY   required — the Claude API key
//   ANTHROPIC_MODEL     optional — defaults to "claude-opus-4-8"
//
// Dependency-free: Node 20+ global fetch, no npm packages (like indexnow.mjs).

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Keep in sync with i18n/routing.ts (non-default locales — English lives in
// _source/index.json and data/articles.ts).
const LOCALES = ["pl", "es", "pt", "fr", "it", "de", "uk", "sv", "cs", "el"];
const LOCALE_NAMES = {
    pl: "Polish", es: "Spanish", pt: "Portuguese", fr: "French", it: "Italian",
    de: "German", uk: "Ukrainian", sv: "Swedish", cs: "Czech", el: "Greek",
};

const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-4-8";
const API_KEY = process.env.ANTHROPIC_API_KEY;

const args = process.argv.slice(2);
const COUNT = Number(args[args.indexOf("--count") + 1]) > 0 ? Number(args[args.indexOf("--count") + 1]) : 2;
const NO_WRITE = args.includes("--no-write");

const ARTICLES_TS = path.join(ROOT, "data/articles.ts");
const EN_SOURCE = path.join(ROOT, "data/i18n/articles/_source/index.json");
const localeFile = (l) => path.join(ROOT, `data/i18n/articles/${l}.json`);

// ─── Tool-use schema (model returns structured, valid JSON) ───────────────────
// Body is requested as a lightweight markdown subset and converted to this repo's
// HTML shape locally; this keeps the model output simple and translation-stable.
const POST_SCHEMA = {
    type: "object",
    properties: {
        slug: { type: "string" },
        title: { type: "string" },
        excerpt: { type: "string" },
        body: { type: "string" },
    },
    required: ["slug", "title", "excerpt", "body"],
};

const POSTS_TOOL = {
    name: "submit_posts",
    description: "Submit the finished blog post objects.",
    input_schema: {
        type: "object",
        properties: { posts: { type: "array", items: POST_SCHEMA } },
        required: ["posts"],
    },
};

// ─── Anthropic Messages API (tool use → structured, valid JSON) ───────────────
// Forces the model to call submit_posts; the API returns input already parsed as
// an object, so there is no manual JSON.parse (and no "bad control character"
// failures from raw newlines in the body).
async function claudePosts(prompt, maxTokens = 16000) {
    if (!API_KEY) throw new Error("ANTHROPIC_API_KEY is not set");
    const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "x-api-key": API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        body: JSON.stringify({
            model: MODEL,
            max_tokens: maxTokens,
            tools: [POSTS_TOOL],
            tool_choice: { type: "tool", name: "submit_posts" },
            messages: [{ role: "user", content: prompt }],
        }),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Anthropic API ${res.status}: ${text.slice(0, 500)}`);
    }
    const data = await res.json();
    const tool = (data.content || []).find((b) => b.type === "tool_use");
    if (!tool || !Array.isArray(tool.input?.posts)) {
        throw new Error(`Model did not return posts (stop_reason: ${data.stop_reason})`);
    }
    return tool.input.posts;
}

// ─── Read existing slugs out of data/articles.ts ──────────────────────────────
// The registry is a TS object literal (unquoted keys, single quotes), so we don't
// JSON-parse it — we only need the existing slugs for de-duplication. The English
// _source/index.json (real JSON) is the body/style reference instead.
function extractSlugs(src) {
    const anchor = src.indexOf("export const articles: Article[] = ");
    if (anchor < 0) throw new Error("Could not locate `articles` in data/articles.ts");
    const arrStart = src.indexOf("[", anchor);
    const arrEnd = src.indexOf("\n];", arrStart);
    if (arrStart < 0 || arrEnd < 0) throw new Error("Could not locate `articles` array bounds");
    const arrText = src.slice(arrStart, arrEnd);
    // Match both unquoted (slug:) and quoted ("slug":) keys, so a previous run's
    // own appended entries are also de-duplicated against.
    return [...arrText.matchAll(/['"]?slug['"]?:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
}

// ─── Markdown subset → this repo's HTML body shape ────────────────────────────
// Mirrors the existing _source/index.json bodies (a <div class="prose …"> wrapper
// of jira-styled <p>/<h2>/<h3>/<ul>/<li>). Translation preserves this HTML verbatim,
// so we only ever generate/convert it once (from the English markdown).
const esc = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function inline(s) {
    // Order matters: links first (so ** inside link text still works), then bold/italic/code.
    return esc(s)
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="text-jira-blue hover:underline" href="$2">$1</a>')
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
        .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function markdownToHtml(md) {
    const blocks = md.replace(/\r\n/g, "\n").trim().split(/\n{2,}/);
    const parts = [];
    for (const raw of blocks) {
        const block = raw.trim();
        if (!block) continue;
        if (block.startsWith("### ")) {
            parts.push(`<h3 class="text-xl font-bold text-jira-darkBlue mt-8 mb-4">${inline(block.slice(4).trim())}</h3>`);
        } else if (block.startsWith("## ")) {
            parts.push(`<h2 class="text-2xl font-bold text-jira-darkBlue mt-12 mb-6">${inline(block.slice(3).trim())}</h2>`);
        } else if (/^[-*]\s+/.test(block)) {
            const items = block
                .split("\n")
                .filter((l) => /^[-*]\s+/.test(l.trim()))
                .map((l) => `<li class="text-jira-textSecondary leading-relaxed mb-2">${inline(l.trim().replace(/^[-*]\s+/, ""))}</li>`)
                .join("");
            parts.push(`<ul class="list-disc pl-6 mb-6">${items}</ul>`);
        } else {
            parts.push(`<p class="text-jira-textSecondary leading-relaxed mb-6">${inline(block)}</p>`);
        }
    }
    return `<div class="prose prose-lg max-w-none">${parts.join("")}</div>`;
}

// ─── Prompts ──────────────────────────────────────────────────────────────────
function generationPrompt(samples, existingSlugs) {
    return `You are a senior writer for Projecto, a free online software-project cost estimation and planning calculator. Write ${COUNT} brand-new English blog post(s) for the blog.

Match the EXISTING posts exactly in voice, depth, structure, length, and on-page SEO. Here are ${samples.length} real examples (study their practical, expert tone, body length ~1300-1800 words, concrete cost/estimation guidance, and heading + list structure):

${JSON.stringify(samples, null, 2)}

STRICT REQUIREMENTS for each new post object:
- "slug": short, kebab-case, unique. MUST NOT be any of these existing slugs: ${JSON.stringify(existingSlugs)}
- "title": specific and useful (not clickbait), like the samples.
- "excerpt": 1-2 sentences for the blog index card and meta description (<= 160 chars), including the primary keyword.
- "body": full article in a lightweight markdown subset — blocks separated by a blank line, "## H2" and "### H3" headings, "- " bullet lists, inline **bold**, *italic*, \`code\`, and [text](url) links. Where natural, link to [the cost calculator](/calculator). 1300-1800 words. Do NOT include a top-level H1 (the title renders separately).

Pick fresh, non-overlapping topics about software development cost, estimation, budgeting, and project planning that are NOT already covered by the existing slugs. Each post must be on a distinct topic.

Call the submit_posts tool with exactly ${COUNT} post object(s).`;
}

function translationPrompt(localeName, posts) {
    return `Translate the following ${posts.length} blog post object(s) from English into ${localeName} for Projecto, a software-project cost estimation calculator.

RULES:
- Translate these fields naturally and idiomatically: "title", "excerpt", and "body".
- Preserve ALL markdown structure in "body" exactly: the same "##"/"###" headings, "- " bullets, **bold**, *italic*, \`code\`, blank-line block separation, and every [text](url) link (translate the visible text, keep the URL identical). Keep all numbers and codes unchanged.
- Do NOT translate the brand name "Projecto".
- Keep the "slug" field EXACTLY as given in English (do not translate it).

English posts:
${JSON.stringify(posts, null, 2)}

Call the submit_posts tool with exactly ${posts.length} translated post object(s).`;
}

// ─── Serialize a registry element for data/articles.ts (2-space indented) ─────
function toArticleElement(post) {
    const ordered = { slug: post.slug, title: post.title, date: post.date, excerpt: post.excerpt };
    return JSON.stringify(ordered, null, 2)
        .split("\n")
        .map((line) => "  " + line)
        .join("\n");
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
    const src = await readFile(ARTICLES_TS, "utf8");
    const existingSlugs = extractSlugs(src);

    // Two recent posts (by date) as the style reference, drawn from the English
    // body source of truth — title, excerpt, and a plaintext body excerpt.
    const enSource = JSON.parse(await readFile(EN_SOURCE, "utf8"));
    const parseDate = (s) => {
        const [day, month, year] = String(s || "01/01/1970").split("/").map(Number);
        return new Date(year, (month || 1) - 1, day || 1).getTime();
    };
    const samples = Object.values(enSource)
        .sort((a, b) => parseDate(b.date) - parseDate(a.date))
        .slice(0, 2)
        .map((e) => ({
            title: e.title,
            excerpt: e.excerpt,
            body: (e.bodyHtml || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 1200),
        }));

    console.log(`→ Generating ${COUNT} new English post(s) with ${MODEL}…`);
    const generated = await claudePosts(generationPrompt(samples, existingSlugs));

    // Repo date format is DD/MM/YYYY (see data/articles.ts).
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const today = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;

    const seen = new Set(existingSlugs);
    const newPosts = [];
    for (const p of Array.isArray(generated) ? generated : [generated]) {
        if (!p || !p.slug || !p.body || !p.title) { console.warn("  ⚠ skipping malformed post", p?.slug); continue; }
        if (seen.has(p.slug)) { console.warn(`  ⚠ duplicate slug "${p.slug}" — skipping`); continue; }
        seen.add(p.slug);
        newPosts.push({ ...p, date: today });
    }
    if (!newPosts.length) throw new Error("Model returned no usable new posts");
    console.log(`  ✓ ${newPosts.length} post(s): ${newPosts.map((p) => p.slug).join(", ")}`);

    // Translate into every locale (one call per locale → array of translated posts).
    const translations = {}; // locale -> array (slug-aligned to newPosts)
    for (const loc of LOCALES) {
        console.log(`→ Translating to ${LOCALE_NAMES[loc]} (${loc})…`);
        const arr = await claudePosts(translationPrompt(LOCALE_NAMES[loc], newPosts));
        translations[loc] = newPosts.map((en, i) => {
            const tr = arr.find((t) => t && t.slug === en.slug) || arr[i] || {};
            return { ...en, ...tr, slug: en.slug }; // force English slug
        });
    }

    if (NO_WRITE) {
        console.log("\n--no-write: nothing written. Generated English posts:\n");
        console.log(JSON.stringify(newPosts, null, 2));
        return;
    }

    // 1) Registry: append elements before the array close `\n];` in data/articles.ts.
    const freshSrc = await readFile(ARTICLES_TS, "utf8");
    const insertAt = freshSrc.indexOf("\n];", freshSrc.indexOf("export const articles: Article[] = "));
    const block = newPosts.map(toArticleElement).join(",\n");
    // The last existing element may or may not have a trailing comma — only add a
    // separator comma when one isn't already there, avoiding a `},,` double comma.
    const needsComma = !/,\s*$/.test(freshSrc.slice(0, insertAt));
    const newSrc = freshSrc.slice(0, insertAt) + (needsComma ? ",\n" : "\n") + block + freshSrc.slice(insertAt);
    await writeFile(ARTICLES_TS, newSrc);
    console.log(`  ✓ wrote ${newPosts.length} registry entr(y/ies) to data/articles.ts`);

    // 2) English body source: data/i18n/articles/_source/index.json.
    const enObj = JSON.parse(await readFile(EN_SOURCE, "utf8"));
    for (const p of newPosts) {
        enObj[p.slug] = { title: p.title, excerpt: p.excerpt, date: p.date, bodyHtml: markdownToHtml(p.body) };
    }
    await writeFile(EN_SOURCE, JSON.stringify(enObj, null, 2) + "\n");
    console.log(`  ✓ _source/index.json now has ${Object.keys(enObj).length} entries`);

    // 3) Per-locale overlays: data/i18n/articles/<locale>.json.
    for (const loc of LOCALES) {
        const file = localeFile(loc);
        const obj = JSON.parse(await readFile(file, "utf8"));
        for (const tr of translations[loc]) {
            obj[tr.slug] = { title: tr.title, excerpt: tr.excerpt, bodyHtml: markdownToHtml(tr.body) };
        }
        await writeFile(file, JSON.stringify(obj, null, 2) + "\n");
        console.log(`  ✓ ${loc}.json now has ${Object.keys(obj).length} entries`);
    }

    console.log("\n✅ Done.");
}

main().catch((err) => {
    console.error("❌", err.message);
    process.exit(1);
});
