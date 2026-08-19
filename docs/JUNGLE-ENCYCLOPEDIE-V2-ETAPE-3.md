# Jungle Encyclopédie V2 — Étape 3/3

Document de consolidation BÊTA. Il ne crée aucune redirection et ne modifie ni `tibaldo.fr`, ni Caisse, ni Shop.

## FAQ historique `tibaldo.fr/faq-plantes-tropicales`

La source locale de référence est le JSON-LD sauvegardé le 5 août 2026 dans l’ancien chantier Hostinger. Il correspondait aux cinq questions visibles de l’ancienne page. La page n’est plus accessible aujourd’hui et aucune réponse ancienne n’a été recopiée sans contrôle.

| Question / thème historique | Contenu Jungle actuel | URL | Couverture | Décision |
|---|---|---|---|---|
| Quelle plante choisir selon la luminosité ? | Guide de la lumière et guide par pièce | `/conseils/lumiere-plantes-interieur`, `/conseils/choisir-plante-selon-piece` | Correcte | Aucun doublon |
| Comment choisir selon son rythme d’arrosage ? | Guide d’arrosage sans calendrier fixe | `/conseils/arroser-plantes-interieur` | Correcte | Aucun doublon |
| Quelle plante pour un appartement ou un petit espace ? | Le guide par pièce traite l’espace disponible, le port et la taille adulte | `/conseils/choisir-plante-selon-piece` | Correcte | Aucun doublon |
| Les plantes supportent-elles les variations de température ? | Guide hiver et températures propres à chaque fiche | `/conseils/plantes-interieur-hiver`, fiches botaniques | À enrichir légèrement | Ajout d’un paragraphe sur les chocs thermiques |
| Faut-il une plante facile ou exigeante ? | Guide par pièce et niveaux de difficulté des fiches | `/conseils/choisir-plante-selon-piece`, fiches botaniques | À enrichir légèrement | Ajout d’un paragraphe sur l’engagement réaliste |

Verdict : ne pas recréer `/faq-plantes-tropicales`. Les cinq intentions sont mieux servies par des guides thématiques et les fiches propres à chaque plante.

## Recommandations de redirection — Anthurium

| Ancienne URL | Cible | Verdict | Justification |
|---|---|---|---|
| `/anthurium-clarinervium` | `https://jungle.tibaldo.fr/plantes/anthurium/clarinervium` | 301 OUI | Même espèce ; la fiche Jungle reprend l’identité botanique durable. |
| `/anthurium-warocqueanum-xxl` | `https://jungle.tibaldo.fr/plantes/anthurium/warocqueanum` | 301 OUI | L’ancienne page nomme explicitement *Anthurium warocqueanum* ; XXL décrit seulement la taille commerciale. |
| `/anthurium-delta-force-baby` | `https://jungle.tibaldo.fr/plantes/anthurium/delta-force` | 301 OUI | « Baby » est un stade commercial, pas une identité botanique distincte. |
| `/fiches-plantes-anthurium-veitchii-narrow` | `https://jungle.tibaldo.fr/plantes/anthurium/veitchii` | 301 OUI | L’ancienne page décrit explicitement un *Anthurium veitchii* ; « Narrow » y est une qualification horticole descriptive, sans preuve d’un taxon séparé. |

## Recommandations de redirection — Bananiers

| Ancienne URL | Cible | Verdict | Justification |
|---|---|---|---|
| `/bananier-musa-basjoo` | `https://jungle.tibaldo.fr/plantes/musa/basjoo` | 301 OUI | Le slug identifie sans ambiguïté *Musa basjoo* et la nouvelle fiche couvre cette identité. |
| `/bananiers` | `https://jungle.tibaldo.fr/plantes/bananiers` | 301 OUI | L’ancienne page était un univers général de bananiers, illustré notamment par *Musa basjoo* ; le nouveau hub conserve cette intention large et l’enrichit. |
| `/musa-variegata` | `https://jungle.tibaldo.fr/plantes/musa/florida-variegata` | PAS DE 301 | Contenu historique non récupéré ; le slug seul ne prouve pas le cultivar Florida. Statut : ATTENTE. |
| `/fiches-produits-musa-variegata` | `https://jungle.tibaldo.fr/plantes/musa/florida-variegata` | PAS DE 301 | L’ancienne page décrit un Musa panaché vert et crème mais ne cite jamais « Florida Variegata ». Équivalence exacte non démontrée. |

## Anciennes URL encore sans destination exacte

| Ancienne URL | Recommandation | Motif |
|---|---|---|
| `/faq-plantes-tropicales` | 404/410 recommandé ; ne pas rediriger en bloc | Les intentions sont distribuées entre plusieurs guides ; aucune cible unique équivalente. |
| `/bambous` | FUTURE PAGE POSSIBLE / ATTENTE | Activité historiquement visible, mais aucune page Jungle actuelle équivalente. |
| `/journee-porte-ouverte` | 404/410 ou archive historique dédiée | Événement du 24 janvier 2026 à Wattignies, distinct de l’ouverture du 26 septembre à Lille ; surtout ne pas rediriger vers ce nouvel événement. |
| `/pot-de-fleur-en-plastique-transparent-auto-arrosage` | ATTENTE | Une redirection vers la page générale des pots perdrait l’intention produit exacte sans preuve d’un remplacement équivalent. |

## Architecture et maillage V2

- `/plantes` affiche l’univers public « Bananiers » sans dupliquer Musa et Ensete comme univers de premier niveau.
- `/plantes/bananiers` relie les hubs `/plantes/musa` et `/plantes/ensete`, ainsi que les quatre fiches.
- Les hubs Musa et Ensete listent leurs fiches enfants.
- `/plantes/anthurium` liste Clarinervium et Warocqueanum avec les autres Anthurium.
- Toutes les fiches conservent leur fil d’Ariane, leur hub de genre et un retour vers `/plantes`.

## Florida Variegata

V2 conserve :

- `genus = Musa`
- `species = "Non déterminée"` dans le modèle actuel
- `cultivar = "Florida Variegata"`
- `botanicalName = "Musa 'Florida Variegata'"`
- `family = "Musaceae"`
- `encyclopedia_slug = "plantes/musa/florida-variegata"`

P2 : faire accepter `species = null` par le modèle et le contrat, avec compatibilité temporaire Caisse/Shop. Cette refonte n’appartient pas à V2.

## Photographies authentiques à fournir

1. Anthurium clarinervium
2. Anthurium warocqueanum
3. Collection Bananiers (hero du hub)
4. Collection Musa (hub)
5. Ensete (hub)
6. Musa basjoo
7. Musa sikkimensis 'Red Tiger'
8. Musa 'Florida Variegata'
9. Ensete ventricosum 'Maurelii'

Les placeholders restent explicites et ne constituent pas à eux seuls un motif de non-indexation.

## Validation finale BÊTA

- 9 nouvelles pages V2 reliées à leur hub, sans page orpheline.
- BreadcrumbList présent dans le HTML initial des hubs Bananiers, Musa et Ensete.
- Titres botaniques longs adaptés aux écrans étroits sans modifier leur nomenclature.
- API Jungle : 38 fiches publiées, slugs uniques, aucune collision ; les champs du contrat Caisse/Shop restent présents.
- Sitemap : 114 URL canoniques, indexables et directement servies en HTTP 200 ; aucune redirection ni URL locale/BÊTA.
- Redirections historiques Jungle : 9 redirections directes, sans chaîne ni boucle, destinations HTTP 200.
- Contrôles responsive effectués en 390 × 844, 820 × 1180 et 1440 × 900 sur Clarinervium, Warocqueanum, Bananiers, Florida Variegata et Maurelii.
- Dette lint historique inchangée : elle est documentée mais ne provient pas de cette consolidation.
