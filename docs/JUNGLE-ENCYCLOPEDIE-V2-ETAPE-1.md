# Jungle Encyclopédie V2 — Étape 1/3

## Décisions Anthurium

- `plantes/anthurium/clarinervium` représente l’identité botanique *Anthurium clarinervium* Matuda.
- `plantes/anthurium/warocqueanum` représente l’identité botanique *Anthurium warocqueanum* T.Moore. « XXL » reste une taille commerciale.
- aucune fiche « Veitchii Narrow » : `tibaldo.fr/fiches-plantes-anthurium-veitchii-narrow` devra ultérieurement pointer vers `/plantes/anthurium/veitchii` après audit de l’ancienne page ; aucune redirection n’est créée ici.
- aucune fiche « Delta Force Baby » : `tibaldo.fr/anthurium-delta-force-baby` devra ultérieurement pointer vers `/plantes/anthurium/delta-force` après audit de l’ancienne page ; aucune redirection n’est créée ici.

## Architecture durable des bananiers

« Bananiers » est un univers utilisateur et horticole, pas un genre botanique. La proposition cible garde donc les genres comme routes canoniques des futures fiches :

```text
/plantes/bananiers                 hub horticole transversal (à créer en étape 2)
├── /plantes/musa                  page du genre Musa (à créer en étape 2)
│   ├── /plantes/musa/basjoo
│   ├── /plantes/musa/florida-variegata  slug provisoire, à ne pas publier avant confirmation
│   └── /plantes/musa/sikkimensis-red-tiger
└── /plantes/ensete                page du genre Ensete (à créer en étape 2)
    └── /plantes/ensete/ventricosum-maurelii
```

Le hub `/plantes/bananiers` reliera les deux genres sans devenir la canonical des fiches. Il pourra expliquer les différences entre *Musa* et *Ensete*, leurs usages, leur rusticité et leur hivernage. Les futurs `encyclopedia_slug` resteront fondés sur les routes de genre ci-dessus.

## Identités contrôlées

| Nom d’usage | Identité prévue | Statut | Source principale |
|---|---|---|---|
| Bananier du Japon | *Musa basjoo* Siebold ex Miq. | Espèce acceptée | Kew POWO |
| Florida Variegata | *Musa* ‘Florida Variegata’ (provisoire) | Nom horticole/commercial non stabilisé ; vérifier étiquette, fournisseur et provenance avant création | À confirmer |
| Red Tiger | *Musa sikkimensis* ‘Red Tiger’ | Espèce acceptée ; nom de cultivar horticole employé par la RHS mais au statut non résolu | Kew POWO + RHS |
| Bananier d’Abyssinie pourpre | *Ensete ventricosum* ‘Maurelii’ | Espèce et cultivar acceptés ; « Maurelli » est une graphie commerciale à corriger | Kew POWO + RHS |

## Sources de contrôle

- Kew POWO — *Musa basjoo* : https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:323785-2
- Kew POWO — *Musa sikkimensis* : https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:797610-1/general-information
- RHS — *Musa sikkimensis* ‘Red Tiger’ : https://www.rhs.org.uk/plants/227927/musa-sikkimensis-red-tiger/details
- Kew POWO — *Ensete ventricosum* : https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:584810-1
- RHS — *Ensete ventricosum* ‘Maurelii’ : https://www.rhs.org.uk/plants/118143/ensete-ventricosum-maurelii/details

## Contrat transversal

Cette étape ajoute seulement deux nouvelles identités. Aucun `encyclopedia_slug` existant n’est modifié. Aucune donnée Caisse, Shop ou Supabase n’est migrée. Une taille commerciale (`Baby`, `XXL`) reste portée par le produit et ne crée jamais une fiche botanique.
