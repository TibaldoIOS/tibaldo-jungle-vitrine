# Jungle BÊTA — Controlled Rollout + Consolidation V1

Date de contrôle : 22 août 2026. Cette matrice décrit exclusivement la branche BÊTA. Elle n'autorise ni rollout public ni réutilisation automatique d'un asset non validé.

## Décision de rollout

- Lot consolidé et activé : `/plantes` UX V2.1, Anthurium Content Master, Alocasia, Chlorophytum et Dicksonia Editorial Rhythm, Veitchii Species V2, Strelitzia Style Master et le HERO Bananiers historique validé.
- Botanical Heroes activables : Strelitzia, Alocasia V3.2, Chlorophytum et Dicksonia. Le HERO Bananiers reste un composant spécifique validé hors registre central.
- Prototype explicitement exclu : Monstera. Son statut reste `PROTOTYPE_REJECTED` et le hub utilise le fallback existant.
- Aucun nouveau dessin n'a été généré. Aucun hub incertain n'a été forcé dans le nouveau système.
- Les autres hubs restent disponibles et fonctionnels dans leur système historique, en attente d'adaptation ou de validation propriétaire.

## Classification design des morphologies

| Famille de composition | Genres concernés |
| --- | --- |
| Large leaf / shield | Alocasia, Colocasia, Anthurium |
| Fenestrated climber / vine | Monstera, Philodendron, Epipremnum, Syngonium, Hoya |
| Rosette / radial | Agave, Aloe, Chlorophytum, Sansevieria, Yucca |
| Fan / monumental foliage | Strelitzia, Musa, Ensete, Bananiers |
| Palm / cycad | Cycas |
| Tree fern / frond | Dicksonia, Fougères |
| Palmate shrub | Fatsia |
| Upright / segmented | Equisetum, Cactus, Plumeria, Ficus |
| Fine / trailing / compact | Asparagus, Epiphyllum, Pilea, Peperomia, Maranta, Calathea |

Cette classification sert au design et ne constitue pas une taxonomie scientifique.

## Matrice des 31 hubs

Abréviations : `V2.1` = nouveau Content System ; `ER1` = Editorial Rhythm V1 ; `MV1` = Motion Language V1 ; `legacy` = système historique fonctionnel ; `compact` = FAQ/diagnostic interactifs validés.

| Genre | Hero | Content | Rhythm | Motion | FAQ | Diagnostic | Données | Photo/asset | Éligibilité |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Agave | fallback | legacy | legacy | reveal | legacy | legacy | forte | photo fiche absente | NEEDS ADAPTATION |
| Alocasia | APPROVED V3.2 | V2.1 | ER1 | MV1 | compact | structuré | forte | asset local + 1 photo | READY FOR ROLLOUT |
| Aloe | fallback | legacy | legacy | reveal | legacy | legacy | générique | photo absente | OWNER INPUT REQUIRED |
| Anthurium | hero historique | V2.1 master | master | reveal | compact | structuré | forte | 3/8 fiches photographiées | READY FOR ROLLOUT |
| Asparagus | fallback | legacy | legacy | reveal | legacy | legacy | correcte | 1/1 photo | OWNER INPUT REQUIRED |
| Bananiers | custom validé | custom | custom | reveal | custom | custom | forte | SVG/CSS local | NEEDS ADAPTATION |
| Cactus | herbier | legacy | legacy | reveal | legacy | legacy | générique, 0 fiche | herbier seulement | INSUFFICIENT DATA |
| Calathea | fallback | legacy | legacy | reveal | legacy | legacy | générique, 0 fiche | photo absente | INSUFFICIENT DATA |
| Chlorophytum | APPROVED | V2.1 | ER1 | MV1 | compact | structuré | adéquate | asset local, photo fiche absente | READY FOR ROLLOUT |
| Colocasia | fallback | legacy | legacy | reveal | legacy | legacy | correcte | photo absente | OWNER INPUT REQUIRED |
| Cycas | fallback | legacy | legacy | reveal | legacy | legacy | forte | 1/1 photo | NEEDS ADAPTATION |
| Dicksonia | APPROVED | V2.1 | ER1 | MV1 | compact | structuré | forte | asset local, photo fiche absente | READY FOR ROLLOUT |
| Ensete | fallback | legacy | legacy | reveal | legacy | legacy | fiche forte | photo absente | OWNER INPUT REQUIRED |
| Epiphyllum | fallback | legacy | legacy | reveal | legacy | legacy | correcte | 1/1 photo | OWNER INPUT REQUIRED |
| Epipremnum | fallback | legacy | legacy | reveal | legacy | legacy | correcte | 1/1 photo | OWNER INPUT REQUIRED |
| Equisetum | fallback | legacy | legacy | reveal | legacy | legacy | correcte | photo absente | OWNER INPUT REQUIRED |
| Fatsia | fallback | legacy | legacy | reveal | legacy | legacy | forte | photo absente | NEEDS ADAPTATION |
| Ficus | fallback | legacy | legacy | reveal | legacy | legacy | générique, 0 fiche | photo absente | INSUFFICIENT DATA |
| Fougères | fallback | legacy | legacy | reveal | legacy | legacy | groupe large, 0 fiche | photo absente | INSUFFICIENT DATA |
| Hoya | fallback | legacy | legacy | reveal | legacy | legacy | générique, 0 fiche | photo absente | INSUFFICIENT DATA |
| Maranta | fallback | legacy | legacy | reveal | legacy | legacy | correcte | 1/1 photo | OWNER INPUT REQUIRED |
| Monstera | REJECTED, désactivé | legacy | legacy | reveal | legacy | legacy | forte | 4/6 photos, hero refusé | OWNER INPUT REQUIRED |
| Musa | fallback | legacy | legacy | reveal | legacy | legacy | forte | 0/3 photo | OWNER INPUT REQUIRED |
| Peperomia | herbier | legacy | legacy | reveal | legacy | legacy | générique, 0 fiche | herbier seulement | INSUFFICIENT DATA |
| Philodendron | fallback | legacy | legacy | reveal | legacy | legacy | forte | 2/6 photos | NEEDS ADAPTATION |
| Pilea | herbier | legacy | legacy | reveal | legacy | legacy | correcte | 1/2 photo | OWNER INPUT REQUIRED |
| Plumeria | fallback | legacy | legacy | reveal | legacy | legacy | correcte | photo absente | OWNER INPUT REQUIRED |
| Sansevieria | fallback | legacy | legacy | reveal | legacy | legacy | générique, 0 fiche | photo absente | INSUFFICIENT DATA |
| Strelitzia | STYLE MASTER | legacy riche | spécifique | reveal | legacy | legacy + comparaison | forte | SVG inline, photos fiches absentes | NEEDS ADAPTATION |
| Syngonium | fallback | legacy | legacy | reveal | legacy | legacy | générique, 0 fiche | photo absente | INSUFFICIENT DATA |
| Yucca | fallback | legacy | legacy | reveal | legacy | legacy | correcte | photo absente | OWNER INPUT REQUIRED |

Résultat : 31 hubs ; 4 sur le nouveau Content System validé ; 5 HERO visuellement validés au total (4 dans le registre central + Bananiers custom) ; 27 hubs restent à revoir avant un rollout plus large.

## Matrice des 46 fiches espèces/cultivars

Le Species Page System V2 reste activé uniquement sur Anthurium veitchii. Les 45 autres fiches restent sur le système historique pour éviter un rollout non validé.

| Routes | Système | Photo | Statut |
| --- | --- | --- | --- |
| `/plantes/anthurium/veitchii` | Species V2 | oui | BETA MISSION READY |
| `/plantes/alocasia/imperial-red`, `/plantes/anthurium/pallidiflorum`, `/plantes/anthurium/delta-force`, `/plantes/philodendron/billietiae`, `/plantes/philodendron/melanochrysum`, `/plantes/pilea/peperomioides`, `/plantes/asparagus/plumosus`, `/plantes/epipremnum/marble-queen`, `/plantes/epiphyllum/anguliger`, `/plantes/monstera/deliciosa`, `/plantes/monstera/thai-constellation`, `/plantes/monstera/mint`, `/plantes/monstera/adansonii`, `/plantes/maranta/lemon-lime`, `/plantes/cycas/revoluta` | legacy | oui | P2 POST-BETA |
| `/plantes/philodendron/royal-queen`, `/plantes/philodendron/brasil`, `/plantes/philodendron/gloriosum`, `/plantes/philodendron/grazielae`, `/plantes/anthurium/regale`, `/plantes/anthurium/papillilaminum-dark-phoenix`, `/plantes/anthurium/forgetii-dark-form-silver-blush`, `/plantes/anthurium/clarinervium`, `/plantes/anthurium/warocqueanum`, `/plantes/monstera/burle-marx-flame`, `/plantes/monstera/esqueleto`, `/plantes/pilea/cadierei`, `/plantes/colocasia/esculenta-eddo`, `/plantes/yucca/rostrata`, `/plantes/aloe/vera`, `/plantes/chlorophytum/comosum`, `/plantes/plumeria/rubra`, `/plantes/equisetum/japonicum`, `/plantes/musa/basjoo`, `/plantes/musa/sikkimensis-red-tiger`, `/plantes/musa/florida-variegata`, `/plantes/ensete/ventricosum-maurelii`, `/plantes/dicksonia/antarctica`, `/plantes/agave/americana-variegata`, `/plantes/fatsia/japonica-spiders-web`, `/plantes/strelitzia/alba`, `/plantes/strelitzia/caudata`, `/plantes/strelitzia/juncea`, `/plantes/strelitzia/nicolai`, `/plantes/strelitzia/reginae` | legacy | fallback | P1 PHOTO / P2 SYSTEM |

## Owner Photo Required

- P0 : aucune photographie bloquante pour la campagne BÊTA ; le fallback reste explicite et léger.
- P1 : portraits propriétaires complets de Chlorophytum comosum, Dicksonia antarctica, Agave americana ‘Variegata’, Fatsia japonica ‘Spider’s Web’, Musa basjoo, Ensete ventricosum ‘Maurelii’, Strelitzia nicolai et Strelitzia reginae. Type attendu : plante entière + feuille/port caractéristique, fond non trompeur, identification suffisamment établie.
- P2 : les 22 autres fiches listées avec fallback dans la matrice espèces. Elles peuvent attendre le post-BÊTA.
- L'observation « Augusta » ne doit être affectée à aucune fiche alba/nicolai sans identification préalable.

## Owner review — 10 pages

1. `/plantes`
2. `/plantes/alocasia`
3. `/plantes/chlorophytum`
4. `/plantes/dicksonia`
5. `/plantes/anthurium`
6. `/plantes/anthurium/veitchii`
7. `/plantes/strelitzia`
8. `/plantes/bananiers`
9. `/sos-plantes`
10. `/rempotage-plantes-lille`

## Contrôles techniques

- Build vinext complet et validation artefact Sites : PASS.
- Tests Jungle : 28/28 avant consolidation finale ; tests BÊTA dédiés ajoutés pour le registre, Shop, robots, sitemap et reduced-motion.
- Crawl local : 31/31 hubs et 46/46 fiches en HTTP 200.
- Responsive : 360×800, 390×844, 820×1180 et 1440×900 ; aucun scroll horizontal effectif sur l'échantillon prioritaire ; audit des 31 hubs sans erreur console.
- BÊTA : `X-Robots-Tag: noindex, nofollow`, meta robots cohérente, `robots.txt` fermé, `/sitemap.xml` en 404.
- Shop : aucune occurrence de `https://shop.tibaldo.fr` dans les sources applicatives ; tous les CTA externes utilisent `https://beta-shop.tibaldo.fr`.
- Assets SVG de prototypes : 1,2 à 4,5 Ko ; aucun asset distant ajouté ; aucune nouvelle dépendance.
- Rollback identifié avant publication : Sites BÊTA version 1, commit `b4bf42bf26f037402465d39f8a0149853acd2017`.

## Conditions restantes

- Le rollout général des 27 hubs non validés reste conditionné à des assets propriétaires et/ou à une adaptation éditoriale par morphologie.
- Les 45 Species Pages historiques ne sont pas transformées automatiquement ; elles sont classées P1 BÊTA ou P2 post-BÊTA.
- La campagne peut utiliser la version consolidée pour des missions ciblées, mais ne doit pas présenter tous les hubs comme visuellement finalisés.
