import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const menu = readFileSync(new URL("../app/MobileJungleMenu.tsx", import.meta.url), "utf8");

test("the shared small-screen header keeps identity and menu in separate columns", () => {
  assert.match(css, /\.site-header\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\) auto;/);
  assert.match(css, /\.site-header \.header-actions\s*\{\s*display:\s*none;/);
  assert.match(css, /\.site-header \.brand-wordmark strong\s*\{[^}]*white-space:\s*nowrap;/);
});

test("secondary mobile controls remain available inside the shared menu", () => {
  assert.match(css, /@media \(max-width: 1180px\) \{[\s\S]*?\.mobile-jungle-menu \{ display: block;/);
  assert.match(css, /@media \(min-width: 901px\) and \(max-width: 1180px\) \{[\s\S]*?\.site-header > \.desktop-nav \{ display: none;/);
  assert.match(css, /\.site-header \.mobile-jungle-menu \{ grid-column: 3; grid-row: 1;/);
  for (const label of ["Boutique", "Panier", "Mon compte", "Instagram", "Facebook"]) {
    assert.ok(menu.includes(`\"${label}\"`) || menu.includes(`>${label}<`), `${label} must remain accessible in the menu`);
  }
});

test("the shop label and deterministic arrow stay together", () => {
  assert.match(css, /\.site-header \.header-shop\s*\{[^}]*white-space:\s*nowrap;/);
  assert.match(css, /\.site-header \.header-shop \.jungle-arrow-icon\s*\{[^}]*flex:\s*0 0 16px;/);
});
