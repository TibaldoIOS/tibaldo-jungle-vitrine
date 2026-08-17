# SEO Jungle — règles de fondation

## Sitemap et `lastmod`

`app/sitemap.xml/route.ts` est l’unique générateur. Il ne publie que les URL canoniques indexables. Les guides proviennent automatiquement du catalogue, les plantes de leur catalogue, et les genres/familles de la politique d’indexabilité partagée.

Les dates `lastmod` ne dépendent jamais du build. Les fiches et événements réutilisent `updatedAt`; les contenus statiques utilisent la table éditoriale `lib/seo/last-modified.ts`, à mettre à jour uniquement lors d’une modification publique significative.

## Médias

Pipeline cible : source autorisée → nom descriptif en minuscules et tirets → dimensions connues → WebP/AVIF lorsque pertinent → variantes responsive → ALT descriptif naturel → légende utile → intégration. Une image temporaire n’entraîne jamais seule un `noindex`.

`npm run audit:placeholders` fournit l’inventaire réutilisable des médias principaux restant à remplacer.

## Contrôles

Après un build, `npm run audit:seo` vérifie toutes les URL du sitemap (HTTP 200, title, H1, description, canonical, robots) et les redirections 301 directes. `npm test` protège en plus le contrat `encyclopedia_slug` partagé avec Caisse et Shop.

Le statut exact des cinq URL déjà indexées n’est pas disponible dans le dépôt. Les redirections de cette phase ont donc un statut d’indexation individuel inconnu; aucune URL encyclopédique existante n’est migrée.
