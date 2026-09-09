# Homepage event promo banner V1

Local candidate based on canonical commit `78877801177708118eb1bb818db0d6da1e22d4bd`.

The existing homepage announcement is replaced with a static sage editorial strip immediately after the header, before the Hero copy. This position keeps the entire event invitation and CTA in the first viewport on phones as well as desktop. Hero content remains in normal flow; mobile Hero links remain reachable by scrolling. Existing images, headings, navigation destinations and the 3D tour are retained.

The banner links in the same tab to `/evenements/ouverture-tibaldo-jungle-lille`. The event route, its canonical metadata and its Event schema are unchanged. The homepage adds no Event schema. No new route, dependency, image or automatic timer is introduced.

## Manual editorial changes

`HomeOpeningBanner` defaults to `urgency="announcement"`. Change the homepage invocation to `urgency="week"` for 19 September 2026 (J-7), then `urgency="imminent"` for 24 September (J-2). These change only the introductory label; date, address, hours, free entry and CTA stay intact. Nothing changes automatically. After the event, remove the invitation through a separate reviewed edit.

## Validation on 10 September 2026

- `npm run build`: PASS, local PUBLIC-mode artifact only; no deployment.
- `node_modules/.bin/tsc --noEmit`: PASS.
- ESLint on `app/page.tsx` and `app/HomeOpeningBanner.tsx`: PASS.
- Global `npm run lint`: FAIL, 43 errors and 139 warnings, all reported in unchanged `public/visite-jungle/tour.js` and vendored 3D scripts. No lint configuration or tour files were changed.
- 20 existing targeted tests: PASS (`canonical-cleanup-v2`, `public-home-universes-v66-hotfix`, `canonical-golden-fidelity`, `google-local-entity`, `links-public-final`, `public-media-editorial-language`). Includes exact 3D assets/CSP preservation and reconciled media/SEO contracts.
- Chromium viewport checks: 390×844, 430×932, 820×1180, 1280×800, 1440×900. Entire banner and CTA initially visible, no horizontal page overflow, no broken eager images or JavaScript page errors, header inside viewport. Screenshots visually reviewed.
- CTA exact accessible name, same-tab navigation, event page canonical, no homepage Event schema: PASS at all widths.
- Mobile menu open/close where visible and Hero/Shop link clickability: PASS.
- 1280px header spacing is tightened locally to fit the existing navigation. Mobile coordinates are positioned below the banner. Shared global styling is unchanged.

The standard local preview had asset-serving failures. Final browser QA uses the built Worker and its bundled `dist/client` assets through a loopback-only local adapter; it is not a hosted deployment or a claim of live-site validation. No physical iPhone/Safari testing was performed.

PUBLIC and BETA deployment, remote push, DNS, Shop, Caisse, Backend and Supabase changes: none.
