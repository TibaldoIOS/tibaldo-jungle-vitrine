# TIBALDO JUNGLE — SPECIES EXPANSION + COMPLETE MEDIA COVERAGE V1

Date : 31 août 2026  
Périmètre : branche et BÊTA uniquement  
Baseline de travail : Night Audit V39, commit `753fa101cc058628689c38e273ffd3d38dbe1a90`  
Baseline publique protégée : V77, inchangée.

## Résultat exécutif

- 20 fiches botaniques standard ajoutées, sans collision de route.
- Catalogue : 76 → 96 fiches.
- 16 des 20 nouvelles fiches utilisent une photographie exacte avec auteur, source et licence documentés.
- 4 fiches restent volontairement en média-gap honnête : Monstera subpinnata, Anthurium villenaorum, Alocasia gageana et Alocasia lauterbachiana.
- La photographie candidate d’Alocasia gageana a été rejetée après inspection : contexte de jardin avec visiteurs et sujet insuffisamment isolé pour une identification documentaire fiable.
- Couverture photo réelle des fiches : 19/76 (25,0 %) → 35/96 (36,5 %).
- Hubs avec média documentaire : 14/31 → 16/31. Calathea et Fougères sont nouvellement couverts ; Cactus reçoit une vue exacte de Schlumbergera sur sa configuration de carte, tout en conservant son média de collection contrôlé dans le moteur du hub.
- Aucun droit inconnu, média cassé ou photo d’espèce manifestement incorrecte n’est introduit.

## Les 20 routes ajoutées

1. `/plantes/peperomia/argyraea` — Peperomia argyraea — PHOTO VERIFIED.
2. `/plantes/epipremnum/aureum` — Epipremnum aureum — PHOTO VERIFIED.
3. `/plantes/philodendron/hastatum` — Philodendron hastatum — PHOTO VERIFIED.
4. `/plantes/calathea/orbifolia` — Goeppertia orbifolia — PHOTO VERIFIED ; route sous le hub horticole Calathea.
5. `/plantes/cactus/truncata` — Schlumbergera truncata — PHOTO VERIFIED ; route sous le hub Cactus.
6. `/plantes/fougeres/nephrolepis-exaltata` — Nephrolepis exaltata — PHOTO VERIFIED ; route sous le hub Fougères.
7. `/plantes/philodendron/verrucosum` — Philodendron verrucosum — PHOTO VERIFIED.
8. `/plantes/philodendron/squamiferum` — Philodendron squamiferum — PHOTO VERIFIED.
9. `/plantes/philodendron/brandtianum` — Philodendron brandtianum — PHOTO VERIFIED.
10. `/plantes/philodendron/erubescens` — Philodendron erubescens — PHOTO VERIFIED.
11. `/plantes/monstera/acuminata` — Monstera acuminata — PHOTO VERIFIED.
12. `/plantes/monstera/subpinnata` — Monstera subpinnata — HONEST MEDIA GAP.
13. `/plantes/monstera/spruceana` — Monstera spruceana — PHOTO VERIFIED.
14. `/plantes/anthurium/villenaorum` — Anthurium villenaorum — HONEST MEDIA GAP.
15. `/plantes/anthurium/pedatoradiatum` — Anthurium pedatoradiatum — PHOTO VERIFIED.
16. `/plantes/anthurium/radicans` — Anthurium radicans — PHOTO VERIFIED, source native 716 × 955 conservée sans upscale.
17. `/plantes/alocasia/gageana` — Alocasia gageana — HONEST MEDIA GAP après rejet du candidat contextuel.
18. `/plantes/alocasia/lauterbachiana` — Alocasia lauterbachiana — HONEST MEDIA GAP.
19. `/plantes/alocasia/portei` — Alocasia portei — PHOTO VERIFIED.
20. `/plantes/pilea/involucrata` — Pilea involucrata — PHOTO VERIFIED.

## Pourquoi ce lot

Le lot combine quatre critères : fermeture de hubs vides, enrichissement des quatre genres majeurs, espèces à forte valeur d’identification et routes permettant un maillage naturel. Il n’introduit ni cultivar commercial ambigu, ni doublon de synonyme. Monstera « Peru » a été écartée du lot au profit de Monstera spruceana, taxon botanique accepté et documentable.

## Garde-fous de contenu

- Les 20 taxons sont des espèces botaniques acceptées ; aucun stock ni disponibilité commerciale n’est revendiqué.
- Peperomia argyraea utilise l’orthographe acceptée ; `Peperomia argyreia` reste un synonyme.
- Goeppertia orbifolia est rattachée au Brésil oriental, et non à la Bolivie.
- Chaque fiche possède identité, taxonomie, origine, habitat, morphologie, entretien, toxicité prudente, problèmes, comparaisons, FAQ, sections éditoriales, SEO et sources.
- Les paramètres horticoles servent à la lecture de culture et ne sont pas présentés comme des limites biologiques universelles.

## Audit média

Le registre complet est rendu dans `species-media-inventory-after-expansion-v1.json`. Les nouveaux médias proviennent de Wikimedia Commons ou d’actifs déjà vérifiés dans Jungle. Chaque nouveau média externe dispose de : créateur, URL de source, licence, URL de licence et note de contrôle datée.

Médias nouveaux retenus : Goeppertia orbifolia, Schlumbergera truncata, Nephrolepis exaltata, Philodendron verrucosum, P. squamiferum, P. brandtianum, P. erubescens, Monstera acuminata, M. spruceana, Anthurium pedatoradiatum, A. radicans, Alocasia portei et Pilea involucrata.

Médias existants réutilisés : Peperomia argyraea, Epipremnum aureum et Philodendron hastatum.

## Contrôles techniques avant déploiement

- Tests ciblés : PASS, 24/24.
- TypeScript : PASS.
- Lint : PASS.
- Build BÊTA : PASS.
- Audit SEO BÊTA : PASS ; noindex/nofollow global, robots fermé, sitemap absent, badge et liens Shop BÊTA préservés.
- 96 slugs uniques : PASS.
- 20 nouvelles routes : PASS.
- 16 médias vérifiés / 4 gaps : PASS.
- Photo Gageana rejetée absente du rendu : PASS.

## Reste média honnête

L’objectif de 100 % n’est pas atteint et ne doit pas être simulé : après ajout des 20 routes, 61 fiches sur 96 n’ont pas encore de photographie documentaire réelle. L’augmentation absolue du nombre de gaps vient de l’expansion du catalogue ; la couverture relative progresse de 25,0 % à 36,5 %.

Prochaine action média recommandée : photographie Owner ou sourcing route par route pour les quatre nouvelles lacunes, puis reprise priorisée des 57 lacunes héritées selon la matrice du Night Audit.

## Isolation

PUBLIC_MUTATED=NO  
SEARCH_CONSOLE_MUTATED=NO  
DNS_MUTATED=NO  
SHOP_MUTATED=NO  
CAISSE_MUTATED=NO  
ANIMAUX_MUTATED=NO  
SUPABASE_MUTATED=NO  
MERGE_MAIN=NO
