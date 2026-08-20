# Audit HERO des fiches espèces — 20 août 2026

## Décision de système

Toutes les fiches espèces utilisent désormais `PlantSpeciesHero`. Le composant conserve le principe visuel validé sur Cycas revoluta : photographie ample lorsqu'un média exploitable existe, fondu vers le fond, contenu et fil d'Ariane lisibles, puis adaptation aux trois familles de viewport. Une image secondaire ne devient pas automatiquement un hero : la source principale de la fiche reste le seul média prioritaire.

Quand aucune photographie suffisamment fiable n'existe, le composant affiche un fallback éditorial natif, sans image inventée, étirée ou distante. Le remplacement futur ne demande qu'une mise à jour de la source média de la fiche.

## Matrice des 38 identités existantes

| Espèce / identité | Hero actuel avant unification | Image disponible | Qualité | Nouveau hero applicable | Anomalie | Action |
|---|---|---|---|---|---|---|
| Alocasia 'Imperial Red' | Photo | Oui | Bonne | Oui | Rendu non partagé | Photo dans le hero commun |
| Anthurium pallidiflorum | Photo | Oui | Bonne | Oui | Rendu non partagé | Photo dans le hero commun |
| Anthurium veitchii | Photo | Oui | Bonne | Oui | Rendu non partagé | Photo dans le hero commun |
| Philodendron billietiae | Photo | Oui | Bonne | Oui | Rendu non partagé | Photo dans le hero commun |
| Pilea peperomioides | Photo | Oui | Bonne | Oui | Rendu non partagé | Photo dans le hero commun |
| Asparagus setaceus | Photo | Oui | Bonne | Oui | Rendu non partagé | Photo dans le hero commun |
| Epipremnum aureum 'Marble Queen' | Photo | Oui | Bonne | Oui | Rendu non partagé | Photo dans le hero commun |
| Disocactus anguliger | Photo | Oui | Correcte | Oui | Source plus modeste | Crop prudent dans le hero commun |
| Monstera deliciosa | Photo | Oui | Correcte | Oui | Source plus modeste | Crop prudent dans le hero commun |
| Monstera deliciosa 'Thai Constellation' | Planche botanique | Oui | Correcte | Oui | Illustration, pas photo propriétaire | Conserver sans suragrandissement |
| Monstera 'Mint' | Planche botanique | Oui | Correcte | Oui | Illustration, pas photo propriétaire | Conserver sans suragrandissement |
| Monstera adansonii | Photo | Oui | Bonne | Oui | Rendu non partagé | Photo dans le hero commun |
| Alocasia 'Royal Queen' | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Anthurium 'Delta Force' | Photo | Oui | Bonne | Oui | Rendu non partagé | Photo dans le hero commun |
| Philodendron melanochrysum | Photo | Oui | Bonne | Oui | Rendu non partagé | Photo dans le hero commun |
| Philodendron 'Brasil' | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Anthurium regale | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Anthurium 'Papi × Dark Phoenix' | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Anthurium forgetii × 'Silver Blush' | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Philodendron gloriosum | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Philodendron grazielae | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Monstera 'Burle Marx Flame' | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Monstera 'Esqueleto' | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Pilea cadierei | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Colocasia esculenta | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Yucca rostrata | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Aloe vera | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Chlorophytum comosum | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Plumeria rubra | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Equisetum hyemale | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Maranta leuconeura 'Lemon Lime' | Photo propriétaire | Oui | Bonne | Oui | Rendu non partagé | Photo dans le hero commun |
| Anthurium clarinervium | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Anthurium warocqueanum | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Musa basjoo | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Musa sikkimensis 'Red Tiger' | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Musa 'Florida Variegata' | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Ensete ventricosum 'Maurelii' | Placeholder | Non | Insuffisante | Fallback | Aucun vrai média | Fallback éditorial |
| Cycas revoluta | Photo propriétaire | Oui | Référence | Oui | Aucune | Conserver comme référence de principe |

## Nouvelle identité

| Espèce | Hero BÊTA | Image disponible | Qualité | Système | Action média |
|---|---|---|---|---|---|
| Dicksonia antarctica | Fallback éditorial | Non | En attente | Hero partagé | Fournir hero, galerie, frondes, stipe et couronne |

## Bilan

- 38 identités historiques auditées.
- 16 disposent d'un média exploitable dans le hero partagé.
- 22 utilisent le fallback éditorial partagé.
- Dicksonia antarctica porte le total BÊTA à 39 identités et utilise le fallback en attente de photographies Tibaldo.
- Aucun média externe ou généré n'a été ajouté.

## Transmission à Architecture Transverse

Après validation et intégration future sur `main`, Architecture Transverse devra :

1. intégrer le nouveau `main` Jungle dans sa branche i18n sans réécrire la source française ;
2. ajouter les versions EN/ES de la nouvelle identité `plantes/dicksonia/antarctica` et du hub `plantes/dicksonia` ;
3. intégrer `PlantSpeciesHero` et les champs éditoriaux additionnels dans son suivi de parité ;
4. recalculer les empreintes de la source FR ;
5. exécuter son contrôle habituel de parité et de non-régression avant toute publication multilingue.
