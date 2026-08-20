# Plant Genus Hero V1 — audit des hubs botaniques

## Décision

Les 31 hubs rendus par `app/plantes/[genre]/page.tsx` utilisent désormais un composant éditorial unique : `PlantGenusHero`. Le système remplace deux traitements historiques (photographie plein cadre sur cinq hubs, aplat vert sur les autres) par une collection de silhouettes botaniques vectorielles locales, décoratives et légères. Les photographies existantes restent intactes dans la médiathèque et dans les contenus où elles apportent une information botanique.

Le HERO des fiches espèces (`PlantSpeciesHero`) n'est pas modifié.

## Matrice avant / après

| Route | Type | HERO avant | Illustration V1 | Données éditoriales | Action |
|---|---|---|---|---|---|
| /plantes/agave | Genre | Aplat | Rosette | Conservées | Unifier |
| /plantes/fatsia | Genre | Aplat | Palmée | Conservées | Unifier |
| /plantes/strelitzia | Genre | Aplat | Feuilles bananiformes | Conservées | Unifier |
| /plantes/aloe | Genre | Aplat | Succulente | Conservées | Unifier |
| /plantes/chlorophytum | Genre | Aplat | Linéaire | Conservées | Unifier |
| /plantes/yucca | Genre | Aplat | Rosette | Conservées | Unifier |
| /plantes/cycas | Genre | Aplat | Pennée | Conservées | Unifier |
| /plantes/dicksonia | Genre | Aplat | Fougère | Conservées | Unifier |
| /plantes/plumeria | Genre | Aplat | Frangipanier | Conservées | Unifier |
| /plantes/equisetum | Genre | Aplat | Prêle | Conservées | Unifier |
| /plantes/ficus | Genre | Aplat | Feuille ronde | Conservées | Unifier |
| /plantes/syngonium | Genre | Aplat | Sagittée | Conservées | Unifier |
| /plantes/hoya | Genre | Aplat | Liane | Conservées | Unifier |
| /plantes/sansevieria | Univers horticole | Aplat | Linéaire | Conservées | Unifier |
| /plantes/fougeres | Groupe | Aplat | Fougère | Conservées | Unifier |
| /plantes/bananiers | Groupe | Aplat | Feuilles bananiformes | Conservées | Unifier |
| /plantes/musa | Genre | Aplat | Feuilles bananiformes | Conservées | Unifier |
| /plantes/ensete | Genre | Aplat | Feuilles bananiformes | Conservées | Unifier |
| /plantes/alocasia | Genre | Photo | Sagittée | Conservées | Remplacer le HERO photo |
| /plantes/anthurium | Genre | Aplat | Aroïde | Conservées | Unifier |
| /plantes/monstera | Genre | Photo | Monstera découpée | Conservées | Remplacer le HERO photo |
| /plantes/philodendron | Genre | Aplat | Aroïde | Conservées | Unifier |
| /plantes/epipremnum | Genre | Aplat | Aroïde | Conservées | Unifier |
| /plantes/asparagus | Genre | Aplat | Fougère fine | Conservées | Unifier |
| /plantes/colocasia | Genre | Aplat | Sagittée | Conservées | Unifier |
| /plantes/pilea | Genre | Photo | Feuille ronde | Conservées | Remplacer le HERO photo |
| /plantes/peperomia | Genre | Photo | Feuille ronde | Conservées | Remplacer le HERO photo |
| /plantes/maranta | Genre | Aplat | Palmée | Conservées | Unifier |
| /plantes/calathea | Genre horticole | Aplat | Palmée | Conservées | Unifier |
| /plantes/cactus | Groupe horticole | Photo | Cactus | Conservées | Remplacer le HERO photo |
| /plantes/epiphyllum | Genre horticole | Aplat | Succulente | Conservées | Unifier |

## Règles du système

- SVG local rendu côté serveur, sans dépendance, police ou média externe.
- Illustration décorative masquée aux technologies d'assistance (`aria-hidden`).
- H1, fil d'Ariane, résumé, métadonnées, canonical, robots et contenu restent issus des données existantes.
- Quinze archétypes botaniques composent une collection cohérente ; la silhouette est choisie explicitement pour chaque hub.
- Le cadrage s'adapte aux trois largeurs de référence sans débordement horizontal.
- Aucun appel à `/_vinext/image` n'est introduit.
- Le sitemap et l'API encyclopédique ne sont pas modifiés par ce chantier visuel.
