import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import process from "node:process";

const root = new URL("../", import.meta.url);
const manifest = JSON.parse(await readFile(new URL("lib/i18n/editorial-status.json", root), "utf8"));
let hasOutdated = false;

async function fingerprint(files) {
  const hash = createHash("sha256");
  for (const file of [...files].sort()) {
    hash.update(file);
    hash.update("\0");
    hash.update(await readFile(new URL(file, root)));
    hash.update("\0");
  }
  return hash.digest("hex");
}

console.log("Jungle multilingue — état éditorial");
for (const [path, page] of Object.entries(manifest.pages)) {
  const current = await fingerprint(page.sourceFiles);
  const sourceChanged = current !== page.sourceFingerprint;
  console.log(`\n${path} · source ${page.sourceVersion}${sourceChanged ? " · MODIFIÉE" : ""}`);
  for (const locale of ["en", "es"]) {
    const translation = page.translations[locale];
    const derivedStatus = sourceChanged || translation.translatedFromFingerprint !== current ? "outdated" : translation.status;
    if (derivedStatus === "outdated") hasOutdated = true;
    console.log(`  ${locale.toUpperCase()} · ${derivedStatus} · ${translation.version}`);
  }
}

if (process.argv.includes("--check") && hasOutdated) {
  console.error("\nDes traductions doivent être révisées avant publication.");
  process.exitCode = 1;
}
