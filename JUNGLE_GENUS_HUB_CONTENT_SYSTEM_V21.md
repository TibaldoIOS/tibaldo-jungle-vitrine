# Jungle — Genus Hub Content System V2.1

## Périmètre du pilote

Le système V2.1 est activé uniquement dans le corps éditorial du hub `/plantes/anthurium`. Il ne modifie ni le HERO botanique, ni `/plantes`, ni les fiches espèces, dont Anthurium veitchii.

## Principe

Une information n’est plus automatiquement rendue comme une carte standard. Le composant `GenusContentPrimitives.tsx` propose cinq compositions sémantiques :

- `MetricFeature` : une donnée forte, par exemple une plage de température ou un niveau d’humidité ;
- `EditorialFeature` : un principe de culture expliqué sans surdimensionner une donnée secondaire ;
- `ProcessFeature` : une séquence courte d’observation et de gestes ;
- `CompositionFeature` : des éléments qui forment un mélange ou un équilibre ;
- `ServiceBridge` : une séparation explicite entre conseil botanique et service Tibaldo Jungle.

Le contenu reste transmis par la page. Les primitives ne contiennent aucune affirmation botanique propre et peuvent être réutilisées sans dupliquer la mise en page.

## Rythme Anthurium

Le pilote combine :

1. exposition en composition éditoriale lumineuse ;
2. température en donnée monumentale ;
3. humidité en contraste court ;
4. arrosage en processus prudent à quatre étapes ;
5. substrat en composition typographique liée aux contenus Jungle existants ;
6. nutrition en respiration compacte ;
7. rempotage en passerelle de service distincte du conseil botanique.

Les couleurs, espacements, transitions et règles responsive sont centralisés dans les classes `genus-*`. Les classes `anth-v21-*` ne règlent que la composition du pilote.

## Mouvement et accessibilité

Les primitives réutilisent le système `data-reveal` déjà présent. Les étapes d’arrosage et les composants du substrat apparaissent une seule fois avec un léger décalage. Avec `prefers-reduced-motion: reduce`, le contenu est immédiatement visible et toutes les transitions sont supprimées.

Les processus utilisent une liste ordonnée, les liens restent de vrais liens et la passerelle service conserve un intitulé explicite.

## Adaptation à d’autres genres — démonstration architecturale

Cette démonstration ne modifie aucun autre hub.

### Cactus

- `MetricFeature` : amplitude ou seuil déjà documenté dans le contenu du genre ;
- `ProcessFeature` : contrôle du substrat, arrosage, égouttage, repos ;
- `CompositionFeature` : éléments minéraux réellement référencés ;
- `ServiceBridge` : rempotage, séparé du conseil de culture.

### Fougères

- `MetricFeature` : humidité déjà documentée ;
- `EditorialFeature` : lumière ;
- `ProcessFeature` : observation et maintien d’une humidité régulière ;
- `CompositionFeature` : structure du substrat selon les sources du hub.

Avant tout déploiement sur un autre genre, le contenu et la hiérarchie doivent être décidés individuellement : les primitives sont réutilisables, mais leur combinaison n’est pas automatique.
