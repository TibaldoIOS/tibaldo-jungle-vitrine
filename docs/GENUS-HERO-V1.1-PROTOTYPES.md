# Plant Genus Hero V1.1 — prototypes botaniques détaillés

## Périmètre de validation intermédiaire

Cette passe remplace uniquement les dessins de Strelitzia, Alocasia, Monstera et Anthurium. La structure du HERO, les contenus, le SEO, le sitemap, l’API et `PlantSpeciesHero` restent inchangés.

| Hub | V1 | V1.1 | Paths V1.1 | SVG rendu |
|---|---|---|---:|---:|
| Strelitzia | 5 formes bananiformes génériques | 5 feuilles à longs pétioles, éventail et nervation | 22 | 1 482 caractères |
| Alocasia | 1 silhouette sagittée géométrique | 3 limbes sagittés avec sinus, pétioles et réseau de nervures | 17 | 1 317 caractères |
| Monstera | 1 feuille/icône | 3 feuilles de maturités différentes, découpes, fenestrations et pétioles | 22 | 1 716 caractères |
| Anthurium | 1 feuille aroïde générique | 2 feuilles cordiformes et 1 feuille allongée, avec nervures distinctes | 16 | 1 377 caractères |

Les mesures correspondent au SVG rendu dans la page. Il n’existe aucun fichier bitmap ni requête image associée.

## Audit d’identifiabilité des 31 hubs

`OUI` signifie que le dessin actuel peut rester candidat à la future collection. `NON` signifie qu’une illustration spécifique détaillée devra être produite seulement après validation propriétaire des quatre prototypes.

| Hub | Identifiable actuellement | Action après GO |
|---|---|---|
| Strelitzia | OUI — prototype V1.1 | Conserver/ajuster selon retour |
| Alocasia | OUI — prototype V1.1 | Conserver/ajuster selon retour |
| Monstera | OUI — prototype V1.1 | Conserver/ajuster selon retour |
| Anthurium | OUI — prototype V1.1 | Conserver/ajuster selon retour |
| Cactus | OUI | Harmoniser la densité uniquement |
| Equisetum | OUI | Harmoniser la densité uniquement |
| Plumeria | OUI | Harmoniser la densité uniquement |
| Agave | NON | Rosette détaillée spécifique |
| Fatsia | NON | Feuilles palmées détaillées |
| Aloe | NON | Rosette charnue spécifique |
| Chlorophytum | NON | Touffe et stolons |
| Yucca | NON | Couronne et feuilles rigides |
| Cycas | NON | Couronne de frondes pennées |
| Dicksonia | NON | Stipe et frondes détaillées |
| Ficus | NON | Ramification et feuilles spécifiques |
| Syngonium | NON | Plusieurs stades foliaires |
| Hoya | NON | Liane, feuilles opposées et ombelle |
| Sansevieria | NON | Touffe de feuilles épaisses |
| Fougères | NON | Composition de frondes diversifiées |
| Bananiers | NON | Composition d’univers Musa/Ensete |
| Musa | NON | Pseudo-tronc et port foliaire propre |
| Ensete | NON | Rosette massive distincte de Musa |
| Philodendron | NON | Diversité foliaire et port suggéré |
| Epipremnum | NON | Liane et feuilles alternes |
| Asparagus | NON | Cladodes et port plumeux |
| Colocasia | NON | Feuilles peltées distinctes d’Alocasia |
| Pilea | NON | Port et feuilles propres au genre |
| Peperomia | NON | Feuillage charnu et port spécifique |
| Maranta | NON | Feuilles ovales et nervation graphique |
| Calathea | NON | Touffe et limbes structurés |
| Epiphyllum | NON | Tiges aplaties et port retombant |

## Validation responsive

- 390 × 844 : aucune largeur excédentaire, titre et fil d’Ariane visibles, illustration recadrée à droite.
- 1440 × 900 : composition présente sur la moitié droite, sans recouvrir le contenu éditorial.
- SVG décoratif : `aria-hidden=true`, `focusable=false`.
- Aucun appel à `/_vinext/image`.
