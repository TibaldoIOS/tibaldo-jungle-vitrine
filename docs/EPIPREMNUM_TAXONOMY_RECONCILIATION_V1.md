# Epipremnum — audit puis réconciliation, 2026-09-14

## État PUBLIC avant toute modification

PUBLIC V137, source `1d87ec52018dcc10c2d2f983152edf393338a8a9`, déploiement confirmé succeeded.
97 fiches ; deux Epipremnum : `aureum` (espèce, aucun média documentaire) et `marble-queen` (cultivar d’aureum, trois médias).
Les deux fiches et le hub répondent 200, avec un H1, un canonical propre et du JSON-LD parseable. Les trois URLs sont au sitemap.
`pinnatum` et `pinnatum-aureum` répondent 404 ; aucun ancien redirect ou alias pinnatum-aureum dans le source actif.
Une comparaison de Monstera mentionne pinnatum ‘Albo’ sans lui créer de fiche ; elle reste intacte.

Aureum conserve son title « Epipremnum aureum : pothos doré, entretien et bouture » et sa meta description.
Synonymes initiaux : Pothos aureus, Scindapsus aureus, Rhaphidophora aurea, Epipremnum mooreense.
Noms usuels initiaux : Pothos doré, Golden pothos, Scindapsus aureus.
Le registre commercial documentaire référence aureum → epipremnum/aureum. Aucun stock courant n’est inféré.
Le relevé intégral préalable est livré séparément : EPIPREMNUM_AUDIT_BEFORE_V1.json.

## Décisions et preuves

- Kew POWO https://powo.science.kew.org/taxon/87014-1 : aureum accepté, Mo’orea ; ses quatre synonymes botaniques restent conservés.
- Kew POWO https://powo.science.kew.org/taxon/87046-1 : pinnatum accepté séparément, Asie tropicale/subtropicale jusqu’au Pacifique ; synonymes retenus Pothos pinnatus, Monstera pinnata, Rhaphidophora pinnata, Scindapsus pinnatus.
- RHS https://www.rhs.org.uk/plants/91403/epipremnum-aureum/details : pinnatum 'Aureum' rangé sous aureum. Alias horticole explicité, pas un nouveau cultivar canonique ni une fusion des espèces.
- NParks https://www.nparks.gov.sg/florafaunaweb/flora/1/3/1393 : maturation foliaire, grimpe, division du limbe et précautions d’ingestion. Les observations tropicales ne sont pas extrapolées en obligation de détremper un pot intérieur. Aucun usage médicinal ou alimentaire promu.

## Périmètre

Une nouvelle fiche pinnatum utilise le template existant et un manque média honnête. Liens comparatifs réciproques.
Les deux graphies pinnatum 'Aureum' / pinnatum Aureum utilisent le mécanisme de synonymes et recherche existant. Le matcher exact normalise les apostrophes ; les noms usuels restent exclus du matching automatique, mais sont cherchables dans l’explorateur.
Pothos reste générique. Devil's ivy est ajouté comme nom usuel, non comme garantie d’identité de produit.
Aucun redirect inventé : aucune route historique attestée à migrer.
Aucun changement Shop, mapping commercial, droit média, photo, Hero, URL existante, robots ou règles d’indexation.
Les améliorations PUBLIC V136–137 de consommation Shop sont conservées.

## Certification du candidat

128/128 : contrats plantes (14), P1 (5), réconciliation Epipremnum (4), rendu canonique de 98 fiches et navigation globale (100), contrat du build (5).
Typecheck, build PUBLIC, lint des fichiers modifiés et diff-check PASS.
Le test de déploiement conservait 97 entités / 182 URLs : remplacement des totaux figés par préservation des identités historiques + pinnatum et égalité des URLs espèces du sitemap avec le catalogue. Aucune assertion d’indexation, redirect ou frontière PUBLIC/BÊTA supprimée.
Les tests historiques d’autres missions ne constituent pas une certification globale de toute la suite ; aucune dette média antérieure n’est corrigée ici.
Photos, droits et SEO des deux fiches Epipremnum préexistantes comparés au relevé avant modification : inchangés.
Scan de motifs de secrets borné aux fichiers de cette mission : aucun résultat.
Le rapport de livraison externe consigne le SHA exact et la certification distante après déploiement.
