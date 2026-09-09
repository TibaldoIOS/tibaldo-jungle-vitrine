# Direct public Shop navigation — 2026-09-09

Source-only patch based on Google local entity commit
`826b67cb1ad0a4b2255ca94fba1ff0434491b2f9`, on branch
`fix/jungle-direct-public-shop-link-v1`.

## Change

The PUBLIC layout mounted SafeLinkMaskLayer, which globally intercepted Shop
anchors and opened the obsolete coming-soon dialog. Remove this component and
its mount. Existing environment-aware Shop anchors retain their normal browser
navigation; the PUBLIC build resolves them to `https://shop.tibaldo.fr/`.
No Shop application, commerce state, checkout, payment, products, or stock changed.

The footer's “Boutique plantes Lille” remains the legitimate local editorial
route `/boutique-plantes-lille`, not an online Shop link.

## Validation

- PUBLIC build, typecheck, lint, diff check: PASS.
- Targeted navigation, curtain, homepage and Google local tests: 19/19 PASS.
- PUBLIC SEO audit: PASS, 157 sitemap URLs preserved.
- Rendered navigation assertions on Home, plantes, rempotage, livraison,
  substrats, contact and boutique-plantes-lille: PASS; no obsolete interception,
  no Beta/Test Shop destination in these PUBLIC-rendered pages.
- Real browser, local PUBLIC build: desktop header and 390px mobile menu clicks
  navigated in the same tab directly to `https://shop.tibaldo.fr/`.
- Dock and existing Shop CTAs retain normal anchors; no destination redesign.

## Delivery boundary

Source candidate only. No Sites upload retry, no BETA deployment and no PUBLIC
deployment. Frozen recovery and Google local branches are preserved. Live PUBLIC
behavior is not certified as changed until the delivery blocker is resolved and
this candidate is deployed.
