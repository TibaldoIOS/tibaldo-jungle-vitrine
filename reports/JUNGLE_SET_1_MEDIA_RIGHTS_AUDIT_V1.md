# Jungle — Set 1, audit et verrou des médias

Date : 31 août 2026
Baseline : `9c351a0573da795d58a0d7b95474c356fd989b86`
Périmètre : Jungle uniquement, BÊTA ; aucun déploiement ni acquisition externe.

## Règle d’admission

Un média documentaire de fiche doit porter simultanément : identité, droits, créateur, URL source, licence, URL de licence, ALT, dimensions et rôle. Le registre exécutable est `lib/plants/set-1-media-rights-v1.ts`. Aucun candidat du Set 1 ne satisfait ce seuil : **0 média approuvé et 0 image intégrée**.

## Décision exacte par route prioritaire

| Route | Décision | État rendu | Manque ou motif bloquant |
| --- | --- | --- | --- |
| `/plantes/asparagus/plumosus` | Ancien asset non prouvé rejeté | gap | provenance, droits et identité non démontrés |
| `/plantes/epipremnum/marble-queen` | Ancien asset non prouvé rejeté | gap | identité exacte de cultivar et droits non prouvés |
| `/plantes/agave/americana-variegata` | aucun candidat local contrôlé | gap, **Caisse seulement / Shop interdit** | toutes les preuves requises |
| `/plantes/monstera/thai-constellation` | ancienne composition rejetée | gap | source licenciée et identité cultivar absentes |
| `/plantes/monstera/esqueleto` | fichier local exclu | gap | recadrage Owner ou remplacement sans personne, plus preuve d’identité |
| `/plantes/monstera/mint` | ancienne composition rejetée | gap | clone, source et droits non prouvés |
| `/plantes/monstera/adansonii` | ancien asset non prouvé rejeté | gap | provenance et droits non démontrés |
| `/plantes/monstera/burle-marx-flame` | aucun candidat local contrôlé | gap | sujet, étiquette et provenance documentés requis |
| `/plantes/anthurium/pallidiflorum` | ancien asset non prouvé rejeté | gap | provenance, droits et identité non démontrés |
| `/plantes/alocasia/imperial-red` | fichiers locaux éditoriaux rejetés | gap | pas de preuve documentaire (identité, droits, créateur, source, licence, rôle) |
| `/plantes/philodendron/royal-queen` | aucun candidat local contrôlé | gap | identité de cultivar et provenance à établir |

`/plantes/maranta/lemon-lime` est **VERIFY_ONLY** : le fichier local (1024 × 1536) montre des nervures rouges incompatibles avec le cultivar et manque de provenance structurée ; aucun relink.
`/plantes/alocasia/gageana` reste **REJECTED_DO_NOT_REINTRODUCE** : le candidat de jardin avec visiteurs et sujet insuffisamment isolé est exclu.

## Preuves locales contrôlées

- `public/monstera-esqueleto-feuille-mature-fenestrations.webp` : 1024 × 1280 ; attribution Janadume, CC BY-SA 4.0 déjà renseignée dans `lib/plants/afternoon-plants.ts`, mais usage documentaire refusé par `lib/plants/night-media-safety-v1.ts` (personne visible et identité non résolue).
- `public/maranta-leuconeura-tibaldo.webp` et `public/maranta-leuconeura-tibaldo.png` : 1024 × 1536 ; le mécanisme de sûreté les exclut de Lemon Lime.
- `public/alocasia-imperial-red.webp` et `public/alocasia-imperial-red.png` : 1024 × 1536 ; interprétations éditoriales sans chaîne d’attribution documentaire complète.
- Les entrées Owner de `reports/jungle-night-photo-sourcing-v1.json` sont toutes `USAGE_ALLOWED: NOT_YET` et ne sont donc pas admissibles.

## Garde-fous mis en place

- `applySet1MediaRightsGate` convertit les douze routes contrôlées (onze prioritaires + Maranta VERIFY_ONLY) en gap explicite avant les clôtures P0/nocturne existantes ; les motifs spécialisés Esqueleto et Maranta restent ensuite appliqués.
- Le test `tests/set-1-media-rights-v1.test.ts` interdit toute promotion documentaire, vérifie les neuf champs, le verrou Caisse-only d’Agave et l’absence persistante de Gageana.

## Addendum Owner — Colocasia Eddo et certification suivante

`/plantes/colocasia/esculenta-eddo` est classé `MEDIA_STATUS=REAL_REVIEW_REQUIRED` pour la prochaine certification média. La photographie actuelle est conservée à l’identique : `/colocasia-esculenta-feuille.jpg`, Forest & Kim Starr, CC BY 3.0 US, source Commons, 1280 × 1707. Ce statut ne supprime, ne relie et ne modifie aucun média ; il demande uniquement une revue ultérieure de l’identification de spécimen « Eddo », déjà déclarée provisoire dans la fiche.

Les exclusions Maranta Lemon Lime, Esqueleto et Gageana sont inchangées. Le protocole de capture Set 2 et les métriques Dock sont documentés séparément dans `reports/JUNGLE_SET_2_STABILIZED_CAPTURE_PROTOCOL_V1.md`, sans changement de code Dock.
