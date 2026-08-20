# Jungle multilingue V2 — Vague 1 botanique

## Périmètre publié en bêta

La Vague 1 contient 69 routes françaises, soit 207 pages botaniques FR/EN/ES. La projection sitemap bêta contient 213 URL car elle conserve aussi les deux familles pilotes non botaniques (`/` et le guide d’arrosage), elles-mêmes disponibles en trois langues.

- Hub (1) : `/plantes`
- Regroupement éditorial (1) : `/plantes/bananiers`
- Genres (26) : `/plantes/aloe`, `/plantes/chlorophytum`, `/plantes/yucca`, `/plantes/cycas`, `/plantes/plumeria`, `/plantes/equisetum`, `/plantes/ficus`, `/plantes/syngonium`, `/plantes/hoya`, `/plantes/sansevieria`, `/plantes/fougeres`, `/plantes/musa`, `/plantes/ensete`, `/plantes/alocasia`, `/plantes/anthurium`, `/plantes/monstera`, `/plantes/philodendron`, `/plantes/epipremnum`, `/plantes/asparagus`, `/plantes/colocasia`, `/plantes/pilea`, `/plantes/peperomia`, `/plantes/maranta`, `/plantes/calathea`, `/plantes/cactus`, `/plantes/epiphyllum`
- Familles éditorialisées (3) : `/plantes/famille/araceae`, `/plantes/famille/asparagaceae`, `/plantes/famille/musaceae`
- Identités (38) : `/plantes/alocasia/imperial-red`, `/plantes/anthurium/pallidiflorum`, `/plantes/anthurium/veitchii`, `/plantes/philodendron/billietiae`, `/plantes/pilea/peperomioides`, `/plantes/asparagus/plumosus`, `/plantes/epipremnum/marble-queen`, `/plantes/epiphyllum/anguliger`, `/plantes/monstera/deliciosa`, `/plantes/monstera/thai-constellation`, `/plantes/monstera/mint`, `/plantes/monstera/adansonii`, `/plantes/philodendron/royal-queen`, `/plantes/anthurium/delta-force`, `/plantes/philodendron/melanochrysum`, `/plantes/philodendron/brasil`, `/plantes/anthurium/regale`, `/plantes/anthurium/papillilaminum-dark-phoenix`, `/plantes/anthurium/forgetii-dark-form-silver-blush`, `/plantes/philodendron/gloriosum`, `/plantes/philodendron/grazielae`, `/plantes/monstera/burle-marx-flame`, `/plantes/monstera/esqueleto`, `/plantes/pilea/cadierei`, `/plantes/colocasia/esculenta-eddo`, `/plantes/yucca/rostrata`, `/plantes/cycas/revoluta`, `/plantes/aloe/vera`, `/plantes/chlorophytum/comosum`, `/plantes/plumeria/rubra`, `/plantes/equisetum/japonicum`, `/plantes/maranta/lemon-lime`, `/plantes/anthurium/clarinervium`, `/plantes/anthurium/warocqueanum`, `/plantes/musa/basjoo`, `/plantes/musa/sikkimensis-red-tiger`, `/plantes/musa/florida-variegata`, `/plantes/ensete/ventricosum-maurelii`

L’inventaire machine de référence est `lib/i18n/wave1-inventory.generated.json`.

## Exclusions de la Vague 1

Toutes les routes locales, commerciales, services, événements, substrats, fleurs, rempotage et conseils (hors guide pilote déjà validé) sont exclues. Les pages de famille absentes du sitemap indexable français ou dépourvues d’éditorial propre ne sont pas créées artificiellement.

## Architecture

- Le contenu français demeure la source éditoriale.
- Les traductions statiques EN/ES sont produites à la construction, jamais chargées simultanément dans le navigateur.
- La taxonomie, les médias, les identifiants, les relations, les noms scientifiques, les cultivars et les `encyclopedia_slug` sont partagés et protégés.
- Le statut de chaque traduction est enregistré avec l’empreinte SHA-256 de sa source française. Une source modifiée rend EN/ES `outdated`; aucune republication automatique n’est permise.
- Les routes EN/ES conservent le chemin français après leur préfixe.
- Une route non publiée échoue en 404 et ne reçoit ni canonical ni hreflang indexable.
- L’API botanique V1/V2 reste strictement indépendante de la langue.

## Contrôle éditorial et SEO

Une publication exige `published`, parité `validated`, empreinte source identique et présence de toutes les structures. Les contrôles couvrent les 69 triplets : HTTP, `html lang`, canonical autoréférente, hreflang réciproques FR/EN/ES/x-default, title, description, Open Graph, breadcrumbs, ALT, FAQ, JSON-LD, collisions d’identité, 404 et sitemap bêta. Le sitemap de production n’est pas modifié.

## Qualité linguistique

Les noms scientifiques et cultivars sont verrouillés. Une normalisation horticole corrige les formulations littérales détectables et protège notamment `Imperial Red`, `Marble Queen`, `Royal Queen`, `Delta Force`, `Dark Phoenix`, `Burle Marx Flame`, `Red Tiger`, `Mint` et `Lemon Lime`. Une relecture éditoriale humaine reste recommandée avant toute production, particulièrement pour les textes diagnostiques longs.

## Vague 2 estimée

Vague 2 recommandée : conseils et guides nationaux indexables, après inventaire éditorial séparé. Charge estimée : 2 à 4 jours de traduction, relecture botanique, QA SEO et responsive selon le nombre exact de guides retenus. Les routes locales/commerciales doivent constituer une vague distincte afin de préserver leur intention Lille/Nord/Studio.
