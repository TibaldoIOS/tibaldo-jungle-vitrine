# Jungle Botanical Hero System V1

## Style Master

Le HERO de `/plantes/strelitzia` constitue le Style Master V1. Sa composition SVG validée est conservée sans modification morphologique. Le système centralise le fond, la couleur sauge-crème, l’opacité, le placement, le responsive et le clipping sous le header.

## Architecture

- `app/plantes/BotanicalGenusHero.tsx` : structure éditoriale commune (header, breadcrumb, label, H1, introduction et illustration décorative).
- `app/plantes/BotanicalHeroIllustrations.tsx` : illustration SVG Strelitzia approuvée.
- `lib/plants/botanical-heroes.ts` : registre minimal des assets, provenances et placements.
- `lib/plants/botanical-hero-morphology.ts` : signatures morphologiques de contrôle ; ce manifeste ne génère aucun dessin.
- `app/globals.css` : tokens et règles communes de rendu.

Les hubs sans entrée dans le registre conservent leur rendu historique. Sur la branche expérimentale V1.1, seuls Strelitzia et Chlorophytum sont approuvés ; les entrées Alocasia, Monstera et Dicksonia restent des prototypes rejetés conservés pour historique.

## Design tokens

- Couleur : `--botanical-art-color: #cfdbb8`.
- Hauteur du header : 96 px sur grand écran, 80 px sur mobile.
- Clipping : calculé dans le composant visuel à partir de la hauteur réelle du header.
- Champ desktop : moitié droite monumentale, recadrage accepté.
- Champ mobile : dessin secondaire, décalé à droite et à opacité réduite.

Une évolution globale de la couleur, du clipping ou du responsive se fait dans le bloc `.botanical-genus-*`, sans règle CSS propre à un genre.

## Asset standard

Ordre de préférence :

1. SVG transparent propriétaire validé ;
2. PNG transparent propriétaire validé ;
3. dérivé technique fidèle d’un asset propriétaire.

L’asset ne doit contenir ni fond, ni texte, ni cadre. Il reste décoratif (`aria-hidden="true"`) et n’est jamais chargé via `next/image` ou `/_vinext/image`.

### Chlorophytum V2 approuvé

- Référence propriétaire conservée : `public/images/botanical-heroes/sources/chlorophytum-owner-reference.jpg`.
- SHA-256 de la référence : `fa9999351c2b0e2af4b73f56569e7cdeaf66e3a31b8da239c20d0043c88aa270`.
- Asset V2 approuvé : `public/images/botanical-heroes/prototypes/chlorophytum-v2.svg`.
- Provenance registre : `OWNER_GENERATED_PROTOTYPE` ; statut propriétaire distinct : `APPROVED`.

## Registre

Chaque entrée fournit seulement :

- mode de rendu ;
- asset éventuel ;
- provenance ;
- statut de validation propriétaire ;
- `scale`, `x`, `y` et opacité optionnelle pour desktop et mobile.

La morphologie appartient à l’asset. Le registre ne la reconstruit pas.

### Statuts validés après le test V1.1

| Genre | Statut |
|---|---|
| Strelitzia | `APPROVED_STYLE_MASTER` |
| Chlorophytum | `APPROVED` |
| Alocasia | `PROTOTYPE_REJECTED` |
| Monstera | `PROTOTYPE_REJECTED` |
| Dicksonia | `PROTOTYPE_REJECTED` |

Un asset `PROTOTYPE_REJECTED` peut rester versionné sur une branche expérimentale pour conserver l’historique du test, mais il n’est jamais prêt pour un rollout.

## Morphology manifest

Le manifeste décrit les caractères évidents à contrôler avant intégration (par exemple rosette, stolons et plantules pour Chlorophytum). Il sert de garde-fou de validation et ne constitue ni une clé d’identification scientifique, ni un générateur d’illustrations.

## Ajouter un genre

1. Choisir un hub.
2. Créer l’illustration séparément.
3. Faire valider l’illustration par le propriétaire.
4. Fournir l’asset à Codex Jungle.
5. Vérifier format, transparence, poids, morphologie et provenance.
6. Copier la source propriétaire intacte et produire seulement les dérivés techniques nécessaires.
7. Ajouter une entrée minimale au registre.
8. Régler uniquement `scale`, `x` et `y` lorsque le placement l’exige.
9. Contrôler desktop, 390 px et 360 px en BÊTA.
10. Faire valider le propriétaire avant toute publication éventuelle et avant le genre suivant.

La génération automatique d’assets botaniques par Codex n’est pas validée pour généralisation. Le système d’intégration est validé ; les dessins restent créés et approuvés individuellement en amont.

## Garde-fous

- Le dessin ne remonte jamais au-dessus de la ligne sous le header.
- Le crop fait partie du langage graphique ; la hauteur du HERO ne s’adapte pas à l’intégralité de l’asset.
- Aucun contenu essentiel n’est porté par l’illustration.
- Aucun asset Internet aux droits inconnus.
- Aucune généralisation automatique aux autres hubs.
- `/plantes` UX V2 reste indépendant du système des hubs de genre.
