# Contrat de l’encyclopédie Tibaldo Jungle

Ce document définit l’identité éditoriale partagée par Jungle avec la Caisse et le Shop. Jungle reste la source de vérité botanique. Il ne porte ni prix, ni stock, ni commande, ni fidélité.

## Identité stable

- L’adresse publique d’une fiche est `/plantes/{genre-de-navigation}/{slug}`.
- La clé d’échange est `encyclopediaSlug`, par exemple `plantes/monstera/deliciosa`.
- Cette clé représente un taxon éditorial. Elle ne doit contenir ni taille, ni prix, ni format commercial, ni lieu de stock.
- Une variante commerciale de taille S ou M référence donc le même `encyclopediaSlug`.
- Un changement de slug est une rupture de contrat : il exige une redirection permanente et une mise à jour coordonnée des références externes.

Le `genre` présent dans l’URL est une catégorie de navigation historique. Le genre taxonomique canonique reste `taxonomy.genus`. Ils peuvent différer ; la V2 l’indique explicitement avec `taxonomyGenreDiffers`.

## API V1 maintenue

`GET /api/encyclopedie/plantes`

La V1 reste inchangée pour les consommateurs existants. Chaque entrée contient exactement :

- `id`
- `genre`
- `genreLabel`
- `slug`
- `displayName`
- `botanicalName`
- `cultivar` (nullable)
- `family`
- `imageUrl`
- `imageAlt`
- `encyclopediaSlug`
- `encyclopediaUrl`
- `publishedAt`
- `updatedAt`

Aucun champ existant ne doit être renommé, supprimé ou changer de sens sans nouvelle version d’API.

## API V2 additive

`GET /api/v2/encyclopedie/plantes`

La V2 reprend tous les champs de la V1 et ajoute :

- `contractVersion` : actuellement `2.0` ;
- `navigationGenre` et `taxonomyGenreDiffers` ;
- `listingName` (nullable) et `subtitle` ;
- `taxonomy` : ordre, famille, genre, espèce, cultivar nullable, noms communs ;
- `synonyms` ;
- `description` ;
- `primaryImage` ;
- `images` : chemin, URL absolue, texte alternatif, légende, largeur et hauteur.

Les consommateurs doivent conserver les valeurs inconnues et ne pas déduire l’identité botanique depuis le seul nom commercial.

## Photos

- Les médias éditoriaux sont versionnés dans `public/` et publiés sous des URL absolues du domaine Jungle.
- La première image de `gallery` est la photo principale.
- Une fiche sans photographie utilise `/photo-reelle-a-venir.svg` ; cette image signale une donnée éditoriale incomplète et non une erreur d’API.
- Remplacer le contenu d’un fichier sans changer son URL est compatible fonctionnellement, mais peut nécessiter une invalidation de cache.
- Renommer ou déplacer un média casse son URL : conserver l’ancien fichier ou organiser une migration coordonnée.

## Responsabilités

Jungle possède : nom botanique, taxonomie, synonymes, textes, conseils et médias éditoriaux.

La Caisse possède : références commerciales, variantes, tailles, prix, stocks, ventes et administration.

Le Shop consomme le catalogue commercial et utilise `encyclopediaSlug` pour enrichir une référence avec les données Jungle.

Un lien `shopUrl` éventuel dans une fiche Jungle n’est qu’une navigation. Il ne fait pas de Jungle la source du produit commercial.

## Évolution et contrôles

Toute évolution incompatible crée une nouvelle route versionnée. Avant publication :

1. vérifier l’unicité de `id`, `encyclopediaSlug`, du nom botanique et du triplet taxonomique ;
2. vérifier l’existence de chaque média référencé ;
3. vérifier les réponses V1 et V2 ainsi que les pages inconnues en 404 ;
4. tester un consommateur pilote avant de migrer la Caisse ou le Shop ;
5. conserver la version précédente jusqu’à la fin de la migration.

Les tests automatisés du dépôt protègent ces invariants. Les divergences taxonomiques historiques et les noms horticoles incertains doivent être revus manuellement ; aucun changement massif de slug ne doit être automatisé.
