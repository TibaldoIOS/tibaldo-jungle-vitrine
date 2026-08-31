# Jungle — protocole de capture stabilisée Set 2

Date : 31 août 2026
Périmètre : documentation de validation seulement. Aucun code Dock, média, Shop, Caisse ou déploiement n’est modifié par ce document.

## Évidence mobile finale

La capture historique `full-page-390` est **rejetée comme preuve mobile finale**. Elle peut rester un artefact de contexte, mais ne démontre pas un état reproductible du Dock, les zones de sécurité, ni chaque collision mesurée. Elle ne doit donc pas servir de décision d’acceptation ou de régression Set 2.

Une preuve finale est une paire horodatée de captures écran + relevé de métriques issue de la même session stabilisée, à chaque viewport retenu par Owner.

## Procédure stabilisée

1. Ouvrir la BÊTA dans un profil propre, sans extension, avec zoom 100 % et barre d’URL dans l’état convenu.
2. Définir le viewport mobile exact avant navigation ; relever largeur, hauteur, DPR, navigateur, système et orientation.
3. Charger une seule route cible, attendre la fin du chargement réseau et des animations, puis relever les métriques sans interaction parasite.
4. Capturer séparément le premier écran, la zone de contenu la plus proche du Dock et le bas de page ; ne pas utiliser une longue capture comme substitut.
5. Répéter la même séquence une seconde fois. Toute divergence d’état, de hauteur du Dock ou de chevauchement invalide la preuve et impose une nouvelle capture.
6. Archiver captures et relevé dans le même dossier de vague, avec route, viewport, horodatage et identifiant de build BÊTA.

## Relevé obligatoire des collisions Dock

Pour chaque route et viewport, consigner les valeurs suivantes en pixels CSS :

| Mesure | Définition | Critère de validation |
| --- | --- | --- |
| `viewportWidth`, `viewportHeight`, `devicePixelRatio` | Contexte de capture exact | renseignés et identiques entre les deux passages |
| `dockTop`, `dockBottom`, `dockHeight` | Boîte rendue du Dock | valeurs stables entre passages |
| `safeAreaBottom` | retrait bas appliqué | renseigné ; aucune supposition implicite |
| `contentLastActionBottom` | bord bas de la dernière action utile | mesuré sur la route cible |
| `dockOverlapPx` | chevauchement vertical Dock / action utile | `0` |
| `dockOcclusionRatio` | part masquée de l’action utile | `0` |
| `horizontalOverflowPx` | débordement horizontal de page | `0` |
| `dockPrimaryTargetWidth`, `dockPrimaryTargetHeight` | zone tactile CTA principale | relevées et conformes au seuil Owner |
| `keyboardOrFocusOcclusionPx` | masquage après focus clavier si applicable | `0` |

## Décision de vague

Set 2 peut être certifié seulement si les deux passages de chaque route/viewport donnent `dockOverlapPx=0`, `dockOcclusionRatio=0`, `horizontalOverflowPx=0` et aucune occultation de focus. Toute mesure manquante, tout écart entre passages ou toute réutilisation de `full-page-390` comme preuve finale est un échec de certification à corriger avant décision.
