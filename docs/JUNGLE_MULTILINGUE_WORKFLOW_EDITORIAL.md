# Jungle multilingue — workflow éditorial pilote

## Principe

Le français reste la source éditoriale. Chaque page pilote déclare les fichiers français qui la nourrissent, leur empreinte, la version source et l'état de ses traductions dans `lib/i18n/editorial-status.json`.

## Statuts

- `draft` : traduction commencée, non publiable.
- `review_required` : traduction complète, relecture humaine nécessaire.
- `published` : traduction relue et publiable.
- `outdated` : statut calculé lorsque la source française ne correspond plus à l'empreinte traduite.

## Lorsqu'une page française change

1. Exécuter `npm run i18n:status` : EN et ES concernées apparaissent automatiquement `outdated`.
2. Mettre les traductions concernées à jour sans toucher aux noms botaniques, cultivars, taxonomie ni unités.
3. Placer chaque langue en `review_required` jusqu'à relecture éditoriale.
4. Comparer les identifiants de sections et unités avec `lib/i18n/editorial-parity.json`. FAQ, breadcrumb, ALT, SEO et JSON-LD doivent également être complets.
5. Après validation, incrémenter sa version, renseigner la date, passer la parité à `validated`, passer la traduction à `published` et reporter la nouvelle empreinte française dans `translatedFromFingerprint`.
6. Exécuter `npm run i18n:check` puis les tests avant toute publication. Un statut `published` est invalide sans parité validée.

Une traduction manquante reste une 404 : le français n'est jamais servi silencieusement sous `/en/` ou `/es/`.
