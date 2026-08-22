# Jungle Editorial Rhythm V1

## Périmètre du pilote

Le système est activé uniquement sur les hubs Alocasia, Chlorophytum et Dicksonia. `/plantes`, Anthurium, les fiches espèces et le Botanical Hero System restent inchangés. Toute généralisation exige une validation propriétaire.

## Palette fonctionnelle

- Vert Jungle (`#173e30`) : structure, expertise et données fortes.
- Crème (`#f3eee3`) : lecture longue et respiration.
- Sauge (`#dce5d4`) : équilibre cultural et conditions favorables.
- Rose poudré Tibaldo (`#d0aaa3`) : vigilance, singularité, transition et passerelle service.

Les trois hubs utilisent ces mêmes rôles avec des proportions différentes : Alocasia est plus contrasté et architectural, Chlorophytum plus clair, Dicksonia plus profond et organique.

## Primitives éditoriales

- `SecondaryRhythm` compose les informations secondaires selon la morphologie et le contenu de chaque genre.
- `SymptomIndex` sépare explicitement signe observé, causes possibles et bon réflexe.
- `CompactFaq` garde toutes les réponses dans le HTML initial, limite l’ouverture à une question et reste utilisable au clavier.
- `BotanicalFragment` réemploie une portion décorative de l’asset local existant ; il reste `aria-hidden` et n’emporte aucune information.

Les primitives V2.1 existantes (`MetricFeature`, `EditorialFeature`, `ProcessFeature`, `CompositionFeature`, `ServiceBridge`) restent la base du care system.

## Mouvement

Motion Language V1 reste central. Les fragments, panneaux de symptômes et réponses FAQ ajoutent uniquement fade, faible translation ou transition courte. Aucun mouvement n’est permanent et aucune information ne dépend de l’animation. `prefers-reduced-motion: reduce` neutralise les effets.

## Règles de rollout

1. Ne pas dépasser deux grandes sections consécutives composées uniquement d’un titre et d’un paragraphe.
2. La couleur doit signaler une fonction, jamais remplir arbitrairement la page.
3. Les causes restent possibles et ne deviennent jamais un diagnostic certain.
4. Un fragment botanique maximum par grande séquence éditoriale.
5. Vérifier 360, 390, 820 et 1440 px, le dock, le clavier, le touch et l’absence d’overflow avant d’activer un nouveau hub.
