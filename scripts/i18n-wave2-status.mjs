import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createServer } from "vite";

const root = new URL("..", import.meta.url).pathname;
const inventory = JSON.parse(await readFile(new URL("../lib/i18n/wave2-inventory.generated.json", import.meta.url), "utf8"));
const status = JSON.parse(await readFile(new URL("../lib/i18n/wave2-editorial-status.generated.json", import.meta.url), "utf8"));
const vite = await createServer({ root, appType: "custom", configFile: false, resolve: { alias: { "@": root } }, server: { middlewareMode: true } });
const { guides } = await vite.ssrLoadModule("/lib/guides/catalog.ts");
const fingerprint = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
let failed = false;
for (const entry of inventory.paths) {
  const source = entry.kind === "guide-hub" ? guides.map(({ slug, title, category, intro }) => ({ slug, title, category, intro })) : guides.find((guide) => `/conseils/${guide.slug}` === entry.path);
  const page = status.pages[entry.path];
  const current = fingerprint(source);
  for (const locale of ["en", "es"]) {
    const translation = page?.translations?.[locale];
    const valid = page?.sourceFingerprint === current && translation?.translatedFromFingerprint === current && translation?.status === "published" && translation?.parity === "validated";
    if (!valid) failed = true;
    console.log(`${valid ? "✓" : "✗"} ${entry.path} ${locale}: ${valid ? "published / parity validated" : "outdated or incomplete"}`);
  }
}
await vite.close();
if (failed || process.argv.includes("--check") && Object.keys(status.pages).length !== inventory.paths.length) process.exitCode = 1;
