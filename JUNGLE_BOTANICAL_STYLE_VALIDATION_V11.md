# Jungle Botanical Hero System V1.1 — validation multi-morphologies

## Verdict technique et graphique

**PASS WITH CONDITIONS.** Le système central accepte les quatre morphologies testées sans CSS propre à un genre, sans régression Strelitzia et sans modification de `/plantes`. Les prototypes restent volontairement des assets BÊTA soumis à validation visuelle propriétaire avant toute généralisation.

## Grammaire du Style Master Strelitzia

L'asset master conserve un `viewBox` de 620 × 560. Il est construit par neuf modules foliaires et une inflorescence : quatre feuilles d'arrière-plan à opacité réduite et cinq feuilles de premier plan.

- trait principal : 1,05 unité, sans remplissage, extrémités et jointures arrondies ;
- trait secondaire : 0,82 unité à 78 % d'opacité ;
- une feuille : deux grands contours structurants, une nervure centrale et cinq paires de nervures secondaires ;
- environ 123 tracés réellement rendus après répétition des modules ;
- couleur centrale : `#cfdbb8` ;
- opacité du champ : 0,74 sur desktop, 0,18 sur mobile ;
- espace négatif important : les limbes sont suggérés par leur contour et non remplis ;
- superpositions simples : profondeur par échelle, rotation et opacité, sans texture ni hachure ;
- niveau d'abstraction : silhouette architecturale reconnaissable, détails limités aux nervures structurantes.

Strelitzia, son composant SVG, le CSS central et ses placements sont inchangés par V1.1.

## Prototypes

### Chlorophytum V2

Signature conservée : rosette rubanée, feuilles arquées, trois stolons et plantules. Les hachures et textures de la dérivation V1 disparaissent au profit de grands contours continus et de quelques axes structurants.

### Alocasia

Cinq limbes sagittés, sinus basal marqué, pétioles longs et port dressé. Les feuilles sont réparties sur cinq hauteurs/orientations et seules trois paires de nervures principales sont conservées.

### Monstera

Trois feuilles adultes, une feuille juvénile, tiges grimpantes, découpes marginales et fenestrations simplifiées. Les ouvertures restent lisibles sans effet de dentelle.

### Dicksonia

Stipe vertical, cicatrices simplifiées, couronne radiale de six frondes et cinq paires de pennes par fronde. Aucune micro-foliole ni hachure.

## Assets et provenance

| Asset | Poids | Paths source | Instances `use` | Provenance |
|---|---:|---:|---:|---|
| `chlorophytum-v2.svg` | 2 507 o | 10 | 15 | OWNER_GENERATED_PROTOTYPE |
| `alocasia-prototype.svg` | 1 248 o | 5 | 5 | OWNER_GENERATED_PROTOTYPE |
| `monstera-prototype.svg` | 2 157 o | 9 | 4 | OWNER_GENERATED_PROTOTYPE |
| `dicksonia-prototype.svg` | 1 757 o | 5 | 6 | OWNER_GENERATED_PROTOTYPE |

Les quatre SVG sont transparents, monochromes, locaux, sans dépendance ni référence externe. Ils répondent en HTTP 200 avec `image/svg+xml`.

## Scoring interne

| Illustration | Reconnaissance botanique | Cohérence Strelitzia | Simplicité graphique | Équilibre HERO | Mobile |
|---|---:|---:|---:|---:|---:|
| Strelitzia master | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 |
| Chlorophytum V2 | 5/5 | 4/5 | 4/5 | 4/5 | 4/5 |
| Alocasia | 4/5 | 4/5 | 4/5 | 4/5 | 4/5 |
| Monstera | 5/5 | 4/5 | 4/5 | 4/5 | 4/5 |
| Dicksonia | 4/5 | 4/5 | 4/5 | 4/5 | 4/5 |

La cohérence de collection est suffisante pour une validation propriétaire, mais pas pour une propagation automatique. Alocasia et Dicksonia doivent notamment être jugés à taille réelle avant d'être considérés comme assets définitifs.

## Responsive et clipping

Contrôles réalisés à 1440 × 900, 390 × 844 et 360 × 800 :

- largeur document égale à la largeur viewport dans les quinze cas ;
- aucun overflow horizontal ;
- header à 96 px sur desktop et 80 px sur mobile ;
- clip calculé jusqu'à la ligne du header (88/82/84/86 px selon le placement desktop, 8 px mobile) ;
- opacité mobile 0,18 pour le master et 0,20 pour les prototypes ;
- H1 et introduction restent prioritaires et lisibles ;
- aucun appel `/_vinext/image`.

## Tests

- TypeScript : PASS ;
- lint ciblé sur les fichiers modifiés : PASS ;
- lint global : 54 erreurs historiques hors périmètre, inchangées ;
- build vinext : PASS ;
- tests Jungle : 26/26 PASS ;
- audit SEO : PASS — 127 URL canoniques, 9 redirections directes ;
- audit placeholders : PASS ;
- validation artefact Sites : PASS ;
- XML SVG : PASS ;
- `git diff --check` : PASS ;
- Strelitzia et `/plantes` comparés à la base V1 : aucun diff.

## Captures

Les captures individuelles sont rangées dans :

- `artifacts/botanical-style-validation-v11/desktop/` ;
- `artifacts/botanical-style-validation-v11/mobile-390/` ;
- `artifacts/botanical-style-validation-v11/mobile-360/`.

Planches :

- `artifacts/botanical-style-validation-v11/comparison-desktop.png` ;
- `artifacts/botanical-style-validation-v11/comparison-mobile.png`.

## Garde-fous

Aucun autre hub, aucune donnée botanique, aucune métadonnée SEO/GEO, aucun sitemap, aucune API, aucune production et aucune infrastructure n'ont été modifiés. La généralisation reste bloquée jusqu'au GO propriétaire.
