# JUNGLE — OWNER FEEDBACK V3 MATRIX

Date de consolidation : 2026-08-22  
Branche : `beta/jungle-editorial-experience-v3`  
Base : `96db1045bd9151470ac5a4a6ef6d648cfe2aa219`

Statuts : `DONE`, `PARTIAL`, `BLOCKED_OWNER_ASSET`, `NOT_APPLICABLE`, `FAIL`.

| ID | Demande propriétaire | Page / système | Statut | Implémentation ou raison | Test / preuve |
|---|---|---|---|---|---|
| V3-01 | Matrice exhaustive des retours | Transversal | DONE | Ce document conserve chaque exigence V3 et son état. | Relecture croisée avec le brief V3. |
| V3-02 | Architecture magazine, photo/SVG/species différenciés | Transversal | DONE | Photo pour le master Monstera, SVG validés pour navigation/décor, Species V3 limité à Thai. | Routes et composants dédiés, captures 390/1440. |
| V3-03 | Photo Genus Hero V1 | `/plantes/monstera` | DONE | Composant central, photo réelle existante autorisée, overlay, crops, dimensions et LCP prioritaire. | HTTP 200, capture, test registre/fallback. |
| V3-04 | Photos de genre au-delà de Monstera | 30 autres univers | BLOCKED_OWNER_ASSET | Aucun asset Internet/IA n’est utilisé. Les besoins sont inventoriés dans `JUNGLE_V3_OWNER_ASSET_LIST.md`. | Revue du registre : Monstera seul activé. |
| V3-05 | Conserver les Botanical SVG approuvés | `/plantes` / répertoire | DONE | Alocasia V3.2, Chlorophytum, Dicksonia et Strelitzia sont réemployés comme motifs ; aucun SVG rejeté n’est promu en Hero. | Inspection HTML/CSS et captures. |
| V3-06 | Noms de genres non cassés | `/plantes` | DONE | Noms entiers, `word-break: normal`, `overflow-wrap: normal`, `hyphens: none`; 31 entrées. | Mesures 360/390 et test word-break. |
| V3-07 | Univers essentiels V3 | `/plantes` | DONE | Mosaïque éditoriale 6 entrées, ratios/couleurs/numéros/descripteurs/SVG et micro-mouvements sans boucle. | Capture 390/1440, reduced-motion. |
| V3-08 | Botanical Directory V3 | `/plantes` | DONE | Mobile : accordéon vertical exclusif. Desktop : index + scène botanique. Tous les liens restent dans le HTML. | Clavier/touch, ARIA, HTML rendu. |
| V3-09 | Menu/index rapide flottant | `/plantes` | NOT_APPLICABLE | Le bouton flottant n’est pas retenu : conflit inutile avec le dock mobile. Un lien d’index explicite reste dans le Hero. | Parcours mobile et mesure de collision. |
| V3-10 | Filtres basés sur données fiables | `/plantes` | NOT_APPLICABLE | Aucun filtre ajouté : la taxonomie disponible ne justifie pas encore une facette homogène sur 31 univers. | Absence de filtre artificiel. |
| V3-11 | SOS « Observer. Puis agir. » | `/plantes` | DONE | Composition courte, trois signes, SVG botanique décoratif, CTA et contraste dédié. | Capture mobile/desktop. |
| V3-12 | Species Editorial System V3 limité à Thai | Thai Constellation | DONE | Routage strict sur le slug Thai ; aucune autre fiche n’utilise le composant V3. | Test de routage et non-régression Veitchii. |
| V3-13 | Hero Species réel et autorisé | Thai Constellation | DONE | Le Hero validé conserve la planche photographique locale existante ; aucun média externe/IA. | Capture 390/1440, requêtes réseau. |
| V3-14 | Navigation sticky Species affinée | Thai Constellation | DONE | Navigation existante conservée, scroll horizontal tactile, active state, cibles tactiles et safe-area. | 360/390, clavier/touch. |
| V3-15 | Identité botanique compacte | Thai Constellation | DONE | Feuille d’identité unique : nom, famille/genre, ordre, statut, port, synonymes ; desktop 2 colonnes, mobile continu. | Hauteur avant/après et captures. |
| V3-16 | Cultivar moins dominant | Thai Constellation | DONE | L’information cultivar devient un accent latéral intégré, pas un panneau pleine hauteur. | Capture Identité. |
| V3-17 | Entretien sans cartes clonées | Thai Constellation | DONE | Lumière métrique, arrosage processus, humidité métrique, difficulté signature. | Capture Entretien et inspection DOM. |
| V3-18 | Substrat/rempotage/fertilisation/multiplication restructurés | Thai Constellation | DONE | Composition matière, rythme de culture et étapes, exclusivement depuis les données existantes. | Capture Conditions et revue du contenu. |
| V3-19 | Problèmes V3 | Thai Constellation | DONE | Accordéon prudent `Causes possibles` / `Bon réflexe`, indicateur SVG unique. | ARIA, clavier/touch, reduced-motion. |
| V3-20 | FAQ V3 compacte | Thai Constellation | DONE | Accordéon compact partagé, un indicateur, réponses présentes dans le HTML initial. | ARIA, hauteur avant/après. |
| V3-21 | Comparaison Thai / Albo | Thai Constellation | PARTIAL | Comparaison textuelle fiable renforcée. Pas de fausse comparaison photo sans asset Albo propriétaire documenté. | Contenu rendu ; besoin photo listé P1. |
| V3-22 | Plantes proches éditoriales | Thai Constellation | DONE | Trois Monstera documentés, image locale existante, différence éditoriale et CTA. | Liens internes et capture. |
| V3-23 | Dock mobile / safe-area | Transversal | DONE | Dock compact, largeur bornée, safe-area iPhone et réserve basse de document. | 360/390, dernier contenu accessible. |
| V3-24 | Footer mobile compact | Transversal | DONE | Logo, espaces, typographie et grille resserrés ; footer transit déjà supprimé sur les prototypes compacts. | Mesure de hauteur et capture bas de page. |
| V3-25 | Iconographie SVG cohérente | Navigation, CTA, SOS, répertoire, footer | DONE | Les flèches fonctionnelles des surfaces V3 utilisent un SVG local ; aucun emoji bleu `↗️`. | Recherche de code et capture. |
| V3-26 | Carrousel « Zone verte » contenu dans le viewport | Footer / Itinéraire | DONE | Scroll horizontal natif borné au composant, snap, cartes flexibles, aucune marge négative body. | `document.scrollWidth === clientWidth` à 360/390. |
| V3-27 | Audit overflow global | Prototypes + services | DONE | Règles de conteneur et carrousels durcis ; audit automatisé aux quatre largeurs. | Rapport de mesures, zéro overflow document. |
| V3-28 | Motion Language V3 | V3 uniquement | DONE | Reveal/stagger/line/score/SVG/accordéon, animations uniques et CSS léger. | Reduced-motion et absence de dépendance. |
| V3-29 | Compactage mobile Thai | Thai Constellation | DONE | Identité, entretien, FAQ et fin de page recomposés. | 390 px : page 13 354 → 11 954 px (-10,5 %), Identité 2 393 → 1 492 px (-37,7 %), Entretien 2 173 → 1 146 px (-47,3 %), FAQ 771 → 604 px (-21,7 %). |
| V3-30 | Couleur et rythme éditorial | `/plantes`, Monstera, Thai | DONE | Vert, crème, sauge et rose employés par fonction, sans alternance mécanique de cartes. | Planche 390/1440. |
| V3-31 | Faits botaniques inchangés | Thai / Monstera | DONE | Aucune taxonomie ou règle de culture nouvelle ; contenu existant restructuré. | Diff des données : aucun fichier catalogue modifié. |
| V3-32 | Prototypes masters uniquement | 3 surfaces | DONE | `/plantes`, Monstera et Thai seulement ; aucun rollout Species ni Photo Hero global. | Diff de routage et registre. |
| V3-33 | Services prioritaires sans refonte générale | Contact/Itinéraire, SOS, rempotage | DONE | Corrections transversales dock/footer/overflow/icônes ; contenu service préservé. | Smoke tests et captures. |
| V3-34 | Accessibilité et performance | Transversal | DONE | ARIA, touch targets, focus existant, reduced-motion, SVG/CSS, photo dimensionnée, zéro grosse dépendance. | Tests et inspection runtime. |
| V3-35 | BÊTA noindex, sans sitemap, beta-shop | Environnement BÊTA | DONE | Garde-fous existants préservés et recertifiés après déploiement. | robots, sitemap 404, liens Boutique. |
| V3-36 | Jungle public intact | Production | DONE | Aucun merge `main`, aucun déploiement public, aucun changement d’infrastructure. | HEAD public et HTTP/canonical de contrôle. |
| V3-37 | Déploiement direct BÊTA + rollback | Sites BÊTA | DONE | La version précédente BÊTA v2 est consignée comme rollback ; la version V3 est publiée depuis le commit poussé après batterie verte. | Version et identifiants détaillés dans le rapport final. |
| V3-38 | Captures Owner Review | Prototypes/services | DONE | Captures finales 390/1440 et Itinéraire 390 produites après QA. | Dossier `artifacts/jungle-editorial-experience-v3/`. |
| V3-39 | Liste d’assets propriétaire | Transversal | DONE | Priorités, cadrages et statut par genre consignés séparément. | `JUNGLE_V3_OWNER_ASSET_LIST.md`. |
| V3-40 | Interdictions | Gouvernance | DONE | Aucun main/public/Search Console/DNS/Supabase/Shop/Caisse/Stripe/Beta Lab/Email/Événementiel. | Git + historique de déploiement. |

## Points restant volontairement conditionnels

- La comparaison photographique Thai / Albo reste `PARTIAL` tant qu’une photo propriétaire d’Albo clairement attribuée n’est pas fournie.
- Le Photo Genus Hero au-delà de Monstera reste `BLOCKED_OWNER_ASSET` genre par genre. Le fallback conserve le Hero existant sans image arbitraire.
- La comparaison textuelle Thai / Albo est livrée ; sa composante photographique demeure la seule partie volontairement conditionnelle de ce prototype.
