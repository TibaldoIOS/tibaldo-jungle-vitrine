# Identités botaniques — 12 septembre 2026

Base : PUBLIC V114, 0955ee1dadf76cea69150826bcaef33c68dca093.
Neuf fiches éditoriales, sans produit, prix, taille commerciale ni disponibilité.
Le nom fournisseur seul ne prouve jamais une espèce.

## Décisions pour les treize candidats

| Candidat | Décision | Preuve / limite |
| --- | --- | --- |
| Alocasia zebrina | Déjà présent, conservé | /plantes/alocasia/zebrina dans le catalogue de base |
| Pink Princess | Déjà présent, conservé | /plantes/philodendron/pink-princess |
| Imperial Green | Ajouter | RHS 345645, nom de cultivar accepté au niveau Philodendron ; parentage non ajouté |
| Hoya callistophylla | Ajouter | Kew 20005842-1 ; NParks 6904 |
| Black Gold | Ajouter | NC State, cultivar de Dracaena trifasciata ; route Sansevieria conservée |
| Black Diamond | IDENTITY_REVIEW_REQUIRED | Dénomination commerciale retrouvée, attribution/alias insuffisamment établis par les sources prioritaires ; aucun rapprochement automatique avec Midnight Shine |
| Asplenium nidus | Ajouter | Kew 17048040-1 ; NC State ; ne pas fusionner les espèces appelées nid-d’oiseau |
| BEAUCARNEA fournisseur | IDENTITY_REVIEW_REQUIRED | La ligne reste générique. Owner a explicitement demandé uniquement la fiche recurvata, sans confirmer l’arrivage |
| Beaucarnea recurvata | Ajouter à la demande éditoriale Owner | RHS 1993, NC State ; Nolina recurvata synonyme. Aucun lien de stock |
| Green Lady | Ajouter avec statut explicite | RHS 304353 documente N. exaltata ‘Green Lady’ mais affiche Name Status Unresolved ; ne pas annoncer un nom taxonomique accepté |
| Green Moment | Ajouter | RHS 353292 accepté, producteur Vitro Plus ; droits de multiplication à respecter |
| Colocasia Metallica | IDENTITY_REVIEW_REQUIRED | NParks 1638 documente Alocasia macrorrhizos ‘Metallica’, pas une preuve que le lot Colocasia correspond à cette identité ; aucun changement de genre supposé |
| Bonnie | Ajouter | RHS 191491, C. comosum ‘Bonnie’ |
| Ocean | Ajouter | RHS 312670, C. comosum ‘Ocean’ |

Sources exactes visibles dans chaque fiche et lib/plants/stock-identities-v1.ts.
Compléments pour les exclusions : https://www.nparks.gov.sg/florafaunaweb/flora/1/6/1638 ; https://fr.wikipedia.org/wiki/Beaucarnea ; https://fr.wikipedia.org/wiki/Beaucarnea_recurvata (liens Owner lus, pas preuve d’arrivage).
Les résultats de places de marché ne sont pas utilisés comme autorité taxonomique.
Les catégories génériques ALOCASIA, ALOCASIA MELANGE, CACTUS MELANGE et NEPENTHES MELANGE ne génèrent aucune fiche.

## Taxonomie et prudence

Nephrolepis suit le classement Polypodiaceae affiché par Kew au contrôle, avec mention des classements alternatifs. RHS donne Lomariopsidaceae et NParks Nephrolepidaceae.
Les températures/humidités des filtres sont des repères de culture, non des résultats expérimentaux. Pas d’observation Owner inventée.
Toxicité non établie = null, jamais fausse preuve de sécurité. Le filtre animaux n’admet que false explicite. Sources spécifiques ASPCA pour Chlorophytum et Beaucarnea ; NParks/RHS pour Hoya ; NC State pour les plantes irritantes.

## Médias

Recherche dans catalogue, noms, alias et documentation de provenance : aucun média exact réutilisable trouvé pour ces neuf identités. MEDIA_STATUS=MISSING pour chacune.
Aucun téléchargement de photographie, aucune génération, aucune substitution entre espèces.
Les tableaux internes de droits des médias existants sont inchangés.

## Portée technique

Dataset canonique unique ; genres Asplenium, Nephrolepis et Beaucarnea ajoutés ; Fougères référence Asplenium/Nephrolepis/Dicksonia sans nouvelle fiche dupliquée.
Index, recherche, famille botanique et sitemap sont alimentés par le catalogue.
Présentation des sources et de la multiplication activée uniquement sur les neuf nouvelles fiches.
Les anciens compteurs figés des tests sont actualisés ; la sélection historique P1 utilise son dataset plutôt que les douze derniers éléments d’un catalogue extensible.

## Autorisation

BÊTA autorisée explicitement par la mission. Aucun GO PUBLIC global prouvé par le registre MASTER consulté, qui renvoie aux gates de publication existants. Après QA BÊTA, PUBLICATION_GO_REQUIRED pour ce périmètre, sans demande technique intermédiaire.
