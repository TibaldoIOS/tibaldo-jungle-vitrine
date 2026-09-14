# Genus introductions — 2026-09-14

Base: 9793ed36b4bb257e3e0ccbc5fd565525e426bf0c, PUBLIC V132.

The canonical familyGuides registry contains 34 groups, including the newer
Asplenium, Nephrolepis and Beaucarnea. Every introduction used the same H2:
“Un langage commun. Des formes singulières.” Existing lead/origin paragraphs
were already differentiated, but were also used in the Hero and metadata.

This patch replaces only chapter 01's H2 and two paragraphs through a dedicated
presentation registry. It preserves the original guide inputs, Hero, media,
styles, chapter numbering, care passport, routes, titles, canonical and JSON-LD.
Shared functional headings elsewhere remain unchanged; this is not a rewrite
of the entire guide, FAQ or care sections.

Evidence for each rewritten paragraph: corresponding familyGuides lead, origin,
care and sections; bananaGuides for Musa/Ensete/bananiers and stockFernGuides for
Asplenium/Nephrolepis. No new taxonomic identity, parentage, geographic range,
toxicity assertion or numerical care threshold is introduced.

Examples:
- Alocasia: Un feuillage en relief. / Un équilibre à observer.
- Philodendron: Ramper, grimper, se déployer. / Comprendre le port.
- Monstera: Le dessin de la maturité. / L’appui d’un tronc.
- Anthurium: Velours, reliefs, nervures. / De l’air pour les racines.

Validation before publication:
- 34/34 routes HTTP 200, one H1, new heading and both paragraphs present.
- 34/34 comparisons against live V132 preserve title, canonical, H1 and JSON-LD.
- 170 browser DOM checks: 34 groups x 390/430/820/1280/1440; no horizontal
  document overflow, missing introduction, duplicate H1 or overflowing heading.
- Visual mobile inspection of the Epiphyllum introduction: readable, intact.
- 3 editorial tests; 19 plant/P1 tests; typecheck; PUBLIC build; changed-file lint.
- No duplicate heading or complete sentence across introductions. Pairwise
  word-trigram Jaccard remains below the explicit 0.25 threshold.

Full before/after audit with source links:
/Users/tibaldo/Jungle-delivery/GENUS_EDITORIAL_candidate.json
Remote certification is recorded separately after deployment.
During release, PUBLIC advanced to V134, source
5b55b78afbc207ec3ea90a7f2aa6e664f4f2342b. The bounded four-file editorial
commit was applied cleanly onto that exact head, retaining the Billietiae photo
and Shop bridge already published. Certification is repeated against V134.
Rollback for this release: V134, source 5b55b78afbc207ec3ea90a7f2aa6e664f4f2342b.
