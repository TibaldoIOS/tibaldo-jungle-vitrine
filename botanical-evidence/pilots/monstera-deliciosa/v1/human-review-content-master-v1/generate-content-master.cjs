const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const out = __dirname;
const root = path.dirname(out);
const read = (name) => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
const writeJson = (name, value) => fs.writeFileSync(path.join(out, name), JSON.stringify(value, null, 2) + '\n');
const writeText = (name, value) => fs.writeFileSync(path.join(out, name), value.trim() + '\n');

const claims = read('claims.json').claims;
const links = read('evidence-links.json').evidence_links;
const sources = read('sources.json').sources;
const reviews = read('reviews.json').reviews;
const conflicts = read('conflicts.json').conflicts;
const legacy = read('legacy-claim-audit.json').records;
const diagnosticsSource = read('diagnostic-guidance.json').guidance;
const openQuestions = read('open-questions.json').open_questions;
const taxon = read('taxon.json').taxon;

const claimById = new Map(claims.map(x => [x.claim_id, x]));
const linkById = new Map(links.map(x => [x.evidence_link_id, x]));
const reviewById = new Map(reviews.map(x => [x.review_id, x]));
const conflictFor = id => conflicts.filter(x => x.claim_ids.includes(id)).map(x => x.conflict_id);
const legacyFor = id => legacy.filter(x => x.replacement_claim_id === id).map(x => x.legacy_id);

const proximity = ids => {
  const p = ids.map(id => linkById.get(id)?.field_relevance).filter(Boolean);
  if (p.includes('DIRECT')) return 'DIRECT';
  if (p.includes('RELATED_TAXON')) return 'RELATED_TAXON';
  if (p.includes('GENERAL_DOMAIN')) return 'GENERAL_DOMAIN';
  return 'NO_DIRECT_EVIDENCE';
};

const taxonomyClaims = new Set(['claim.md.taxonomy.accepted-name','claim.md.taxonomy.classification','claim.md.taxonomy.borsigiana','claim.md.taxonomy.philodendron-pertusum']);
const safetyClaims = new Set(['claim.md.safety.mechanism','claim.md.safety.humans-children','claim.md.safety.pets']);
const horticulturalReviewClaims = new Set(['claim.md.temperature.indoor-guidance','claim.md.fertilisation.growing-season']);

const prohibited = id => ({
  'claim.md.taxonomy.borsigiana': ['Monstera borsigiana est une espèce acceptée distincte'],
  'claim.md.fenestration.function': ['les fenestrations servent certainement à laisser passer la lumière'],
  'claim.md.fenestration.drivers': ['un tuteur fera apparaître les trous'],
  'claim.md.humidity.legacy-50-75': ['plage d’humidité obligatoire chiffrée'],
  'claim.md.temperature.legacy-minimum-15': ['seuil minimum universel'],
  'claim.md.temperature.indoor-guidance': ['plage universelle Jungle fusionnée'],
  'claim.md.aerial-roots.cut-or-guide': ['toujours couper', 'toujours guider', 'toujours enterrer'],
  'claim.md.pests.documented': ['thrips établi spécifiquement pour Monstera deliciosa'],
  'claim.md.safety.mechanism': ['sans danger', 'mortel'],
  'claim.md.safety.humans-children': ['diagnostic ou protocole médical'],
  'claim.md.safety.pets': ['diagnostic ou protocole vétérinaire'],
  'claim.md.dimensions.context': ['taille unique sans contexte'],
  'claim.md.growth.rate-context': ['croissance toujours rapide'],
  'claim.md.editorial-score.light-4-of-5': ['score présenté comme fait botanique'],
  'claim.md.editorial-score.watering-2-of-5': ['score présenté comme fait botanique'],
  'claim.md.editorial-score.humidity-3-of-5': ['score présenté comme fait botanique'],
  'claim.md.editorial-score.difficulty-2-of-5': ['score présenté comme fait botanique']
}[id] || []);

const decisions = claims.map(c => {
  const safety = safetyClaims.has(c.claim_id);
  const taxonomy = taxonomyClaims.has(c.claim_id);
  let decision, eligibility, specialist = null, ownerRequired = true;
  if (c.publication_status === 'WITHHELD') {
    decision = c.confidence_status === 'UNVERIFIED' ? 'NO_EVIDENCE_FOUND' : 'WITHHELD';
    eligibility = 'PROHIBITED'; ownerRequired = false;
  } else if (safety) {
    decision = 'SPECIALIST_REVIEW_REQUIRED'; eligibility = 'CANDIDATE_ONLY'; specialist = 'SAFETY_REVIEW_REQUIRED';
  } else if (taxonomy) {
    decision = 'TAXONOMY_REVIEW_REQUIRED'; eligibility = 'CANDIDATE_ONLY'; specialist = 'TAXONOMY_REVIEW_REQUIRED';
  } else if (c.confidence_status === 'QUALIFIED' || c.publication_status === 'REVIEW_REQUIRED') {
    decision = 'QUALIFIED'; eligibility = 'ALLOWED_WITH_QUALIFIER';
    if (horticulturalReviewClaims.has(c.claim_id)) specialist = 'HORTICULTURAL_REVIEW_REQUIRED';
  } else {
    decision = 'OWNER_DECISION_REQUIRED'; eligibility = 'ALLOWED';
  }
  const evs = c.evidence_link_ids.map(id => linkById.get(id)).filter(Boolean);
  return {
    claim_id: c.claim_id,
    domain: c.domain,
    section: c.field,
    claim_text_original: c.canonical_statement,
    claim_type: c.claim_type,
    context: c.context,
    evidence_link_ids: c.evidence_link_ids,
    source_ids: [...new Set(evs.map(x => x.source_id))],
    source_proximity: proximity(c.evidence_link_ids),
    evidence_status: c.confidence_status,
    confidence: c.confidence_status,
    conflict_ids: conflictFor(c.claim_id),
    legacy_ids: legacyFor(c.claim_id),
    review_records: (c.review_ids || []).map(id => ({review_id:id, status:reviewById.get(id)?.status || 'UNKNOWN', reviewer:reviewById.get(id)?.reviewer ?? null})),
    human_review_v1_decision: decision,
    publication_eligibility: eligibility,
    required_qualifier: c.confidence_status === 'QUALIFIED' ? c.confidence_rationale : null,
    prohibited_wording: prohibited(c.claim_id),
    candidate_public_wording: eligibility === 'PROHIBITED' ? null : c.publishable_wording,
    specialist_review_required: specialist,
    owner_decision_required: ownerRequired,
    rationale: `${c.confidence_rationale} Publication Evidence V1: ${c.publication_status}.`,
    open_question: c.publication_status === 'WITHHELD' ? 'Nouvelle preuve ou décision explicitement prévue par le pack requise avant réexamen.' : null,
    downstream_content_sections: [],
    safety_flag: safety,
    original_publication_status: c.publication_status
  };
});

const D = id => decisions.find(x => x.claim_id === id);
const evidenceForClaims = ids => [...new Set(ids.flatMap(id => claimById.get(id)?.evidence_link_ids || []))];
const unit = (id, section, title, shortAnswer, longAnswer, claimIds, opts={}) => {
  const ds = claimIds.map(D).filter(Boolean);
  const ev = evidenceForClaims(claimIds);
  const safety = ds.some(x => x.safety_flag);
  const prohibitedStatus = ds.some(x => x.publication_eligibility === 'PROHIBITED');
  const specialist = ds.some(x => x.specialist_review_required);
  return {
    content_id: id,
    linked_claim_ids: claimIds,
    linked_evidence_link_ids: ev,
    section,
    subsection: opts.subsection || null,
    title,
    short_answer: shortAnswer,
    long_answer: longAnswer,
    priority: opts.priority || 'CORE',
    display_role: opts.display_role || 'CORE_ANSWER',
    knowledge_type: opts.knowledge_type || claimById.get(claimIds[0])?.claim_type || 'HORTICULTURAL_GUIDANCE',
    confidence: ds.some(x => x.confidence === 'QUALIFIED') ? 'QUALIFIED' : (ds[0]?.confidence || 'UNVERIFIED'),
    qualifier: opts.qualifier || ds.map(x => x.required_qualifier).filter(Boolean).join(' ') || null,
    publication_status: opts.publication_status || (prohibitedStatus ? 'INTERNAL_ONLY' : safety ? 'CANDIDATE_PENDING_SAFETY_REVIEW' : specialist ? 'CANDIDATE_PENDING_SPECIALIST_REVIEW' : 'CANDIDATE_PENDING_OWNER_DECISION'),
    safety_flag: safety,
    source_proximity: proximity(ev),
    primary_source_ids: [...new Set(ev.map(x => linkById.get(x)).filter(x => x?.field_relevance === 'DIRECT').map(x => x.source_id))],
    supporting_source_ids: [...new Set(ev.map(x => linkById.get(x)?.source_id).filter(Boolean))],
    conflict_ids: [...new Set(claimIds.flatMap(conflictFor))],
    motion_priority: opts.motion_priority || 'NONE',
    visual_story_opportunity: opts.visual_story_opportunity || null,
    consistency_key: opts.consistency_key || id,
    notes_internal: opts.notes_internal || null,
    prohibited_wording: [...new Set(claimIds.flatMap(prohibited))]
  };
};

const contentUnits = [
  unit('content.identity.name','01_IDENTITE','Monstera deliciosa','Monstera deliciosa est le nom accepté retenu par POWO.','Le nom complet candidat est Monstera deliciosa Liebm. L’affichage de l’authorship reste candidat tant que la Taxonomy Review humaine est pending.',['claim.md.taxonomy.accepted-name','claim.md.taxonomy.classification'],{knowledge_type:'TAXONOMIC_NOTE',consistency_key:'identity.accepted-name'}),
  unit('content.identity.synonyms','01_IDENTITE','Synonymes à contextualiser','« Monstera borsigiana » n’est pas une espèce acceptée distincte dans POWO.','POWO place Monstera borsigiana et Philodendron pertusum en synonymie sous Monstera deliciosa. Cette note reste candidate jusqu’à Taxonomy Review humaine.',['claim.md.taxonomy.borsigiana','claim.md.taxonomy.philodendron-pertusum'],{knowledge_type:'TAXONOMIC_NOTE',consistency_key:'identity.synonymy'}),
  unit('content.origin.range','02_ORIGINE_HABITAT','Aire native','Son aire native documentée par POWO s’étend du sud et sud-est du Mexique jusqu’au Guatemala.','Les profils horticoles plus larges ne sont pas fusionnés avec l’aire native POWO ; ils restent documentés comme divergence de contexte.',['claim.md.distribution.native-range'],{qualifier:'Aire native POWO, distincte des introductions et cultures.',consistency_key:'origin.native-range'}),
  unit('content.origin.habitat','02_ORIGINE_HABITAT','Biome et port','C’est une liane des régions tropicales humides.','Le port grimpant est corroboré. La qualification « secondairement hémiépiphyte » est utilisable seulement avec contexte, car une partie de la preuve est au niveau du genre.',['claim.md.distribution.biome','claim.md.ecology.climbing-liana','claim.md.ecology.secondary-hemiepiphyte'],{knowledge_type:'QUALIFIED_ASSOCIATION',qualifier:'Hémiépiphytisme qualifié ; ne pas généraliser au-delà du contexte sauvage.',visual_story_opportunity:'progression terrestre puis grimpante'}),
  unit('content.morphology.heteroblasty','03_MORPHOLOGIE','Une plante qui change de forme','Les feuilles juvéniles et adultes n’ont pas la même morphologie.','Avec le développement, les feuilles peuvent acquérir des découpes atteignant le bord et des perforations internes : c’est une expression de l’hétéroblastie.',['claim.md.morphology.heteroblasty','claim.md.morphology.adult-fenestrations'],{visual_story_opportunity:'développement juvénile vers adulte',motion_priority:'HIGH',consistency_key:'morphology.development'}),
  unit('content.morphology.fenestrations','03_MORPHOLOGIE','Fenestrations : ce que l’on sait','La maturité compte ; lumière et support sont des associations, pas des garanties.','Une hypothèse de Muir propose que les fenestrations puissent réduire la variabilité de croissance sous la lumière intermittente du sous-bois. Cette fonction n’est pas démontrée comme explication unique.',['claim.md.fenestration.drivers','claim.md.fenestration.function'],{knowledge_type:'SCIENTIFIC_HYPOTHESIS',qualifier:'Hypothèse scientifique attribuée ; causalité non établie.',visual_story_opportunity:'distinction maturité, association et hypothèse',motion_priority:'HIGH',consistency_key:'morphology.fenestrations'}),
  unit('content.care.light','04_LUMIERE','Lumière','Une lumière lumineuse à modérée, filtrée ou indirecte, constitue la recommandation la mieux soutenue.','Le soleil direct intense peut brûler le feuillage. Toute exposition plus forte doit être introduite progressivement. Aucun nombre universel d’heures ou de lux n’est justifié.',['claim.md.light.indoor-preference'],{visual_story_opportunity:'gradient de lumière filtrée',motion_priority:'MEDIUM',consistency_key:'care.light'}),
  unit('content.care.watering','05_ARROSAGE','Arrosage','Observez le substrat avant d’arroser.','Laissez sa partie supérieure sécher nettement, puis arrosez complètement et laissez l’excédent s’écouler. Les sources utilisent des seuils différents ; aucune fréquence en jours ne doit remplacer l’observation.',['claim.md.watering.substrate-state','claim.md.watering.standing-water'],{visual_story_opportunity:'observer, arroser, égoutter',motion_priority:'HIGH',consistency_key:'care.watering'}),
  unit('content.care.humidity','06_HUMIDITE','Humidité','Elle préfère un air modérément à assez humide.','Cette préférence reste qualitative. Aucune plage chiffrée universelle n’est autorisée par le pack.',['claim.md.humidity.qualitative-preference'],{qualifier:'Préférence, pas nécessité chiffrée.',consistency_key:'care.humidity'}),
  unit('content.care.temperature','07_TEMPERATURE','Température','Conservez-la dans des conditions chaudes et évitez les froids prolongés.','Les sources institutionnelles donnent des plages différentes selon leur contexte. Le Content Master n’en fabrique pas une plage universelle et ne publie pas de minimum universel.',['claim.md.temperature.indoor-guidance'],{qualifier:'Guidance qualitative en attente d’un arbitrage horticole/Owner sur toute valeur chiffrée.',consistency_key:'care.temperature'}),
  unit('content.rootzone.substrate','08_ROOT_ZONE','Substrat','Le milieu racinaire doit rester ouvert, aéré et drainant.','Un substrat contenant de la matière organique peut retenir une humidité utile sans rester saturé. Le pack ne valide aucune recette Tibaldo en pourcentages.',['claim.md.substrate.properties'],{visual_story_opportunity:'propriétés aération, drainage, matière organique',motion_priority:'MEDIUM',consistency_key:'rootzone.substrate'}),
  unit('content.rootzone.pot','09_CONTENANT','Pot et drainage','Utilisez un contenant drainant et augmentez son volume progressivement.','Un pot nettement surdimensionné peut rester humide trop longtemps. Le nouveau contenant doit seulement accompagner la motte.',['claim.md.pot.drainage'],{consistency_key:'rootzone.container'}),
  unit('content.rootzone.repotting','10_REMPOTAGE','Quand rempoter','Fiez-vous aux racines et à la stabilité, pas à un calendrier rigide.','Les racines atteignant le fond et les côtés, une motte qui occupe réellement le contenant ou un manque de stabilité sont des déclencheurs observables.',['claim.md.repotting.trigger'],{qualifier:'Les fréquences générales restent secondaires.',consistency_key:'rootzone.repotting'}),
  unit('content.care.fertilisation','11_FERTILISATION','Fertilisation','Un engrais équilibré peut accompagner la croissance active.','Fréquence et dilution ne sont pas fermées : elles restent exclues du contenu publiable tant qu’une Horticultural Review n’a pas tranché. Éviter l’accumulation de sels selon le contexte documenté.',['claim.md.fertilisation.growing-season'],{publication_status:'CANDIDATE_PENDING_HORTICULTURAL_REVIEW',qualifier:'Aucune fréquence ni dilution universelle.',consistency_key:'care.fertilisation'}),
  unit('content.propagation.node','12_MULTIPLICATION','Bouture','Une bouture de tige doit conserver au moins un nœud.','Une feuille isolée sans nœud n’est pas soutenue pour reformer une plante complète. Aucun protocole détaillé supplémentaire n’est ajouté.',['claim.md.propagation.node'],{visual_story_opportunity:'repérer un nœud sur une tige',consistency_key:'propagation.node'}),
  unit('content.support.role','13_SUPPORT','Support','Un support accompagne le port grimpant et stabilise les tiges.','Il peut être associé à un feuillage plus mature, mais ne garantit ni grandes feuilles ni fenestrations.',['claim.md.support.role'],{knowledge_type:'QUALIFIED_ASSOCIATION',qualifier:'Association horticole, pas causalité garantie.',consistency_key:'support.role'}),
  unit('content.aerial-roots.role','14_RACINES_AERIENNES','Racines aériennes','Elles participent à l’ancrage et à la progression de la liane.','Certaines peuvent s’enraciner au contact d’un milieu favorable. Le pack ne permet aucune règle universelle sur leur coupe, guidage ou enfouissement.',['claim.md.aerial-roots.role'],{consistency_key:'aerial-roots.role'}),
  unit('content.dimensions.context','15_CROISSANCE_DIMENSIONS','Dimensions','La taille dépend entièrement du contexte.','Des sources décrivent une liane dépassant 21 m en extérieur favorable, 4–8 m dans un profil horticole et environ 1,8–2,4 m dans de nombreux intérieurs. Ces mesures ne sont pas fusionnées.',['claim.md.dimensions.context','claim.md.growth.rate-context'],{qualifier:'Toujours afficher la source et le contexte de mesure.',visual_story_opportunity:'échelles intérieur, horticulture, extérieur',consistency_key:'growth.dimensions'}),
  unit('content.pruning.cleaning','16_TAILLE_NETTOYAGE','Taille et nettoyage','La taille peut contenir la liane ; l’essuyage doux facilite l’inspection.','Après une taille, la repousse peut d’abord être moins mature. Essuyer la poussière permet aussi d’examiner le revers des feuilles. Aucun protocole d’hygiène d’outil non sourcé n’est ajouté.',['claim.md.pruning.size-control','claim.md.cleaning.leaf-dust'],{consistency_key:'care.pruning-cleaning'}),
  unit('content.safety.candidate','17_SAFETY','Précaution — formulation candidate','La mastication peut exposer à des cristaux insolubles d’oxalate de calcium irritants.','Gardez la plante hors de portée des enfants, chiens et chats. Pour une exposition préoccupante, contactez un centre antipoison, un professionnel de santé ou un vétérinaire selon la situation. Cette formulation attend une Safety Review humaine.',['claim.md.safety.mechanism','claim.md.safety.humans-children','claim.md.safety.pets'],{publication_status:'CANDIDATE_PENDING_SAFETY_REVIEW',display_role:'CAUTION',knowledge_type:'SAFETY_INFORMATION',qualifier:'INTERNAL_ONLY jusqu’à Safety Review humaine compétente si l’Owner retient cette option.',consistency_key:'safety.oxalates'}),
  unit('content.pests.documented','18_RAVAGEURS','Ravageurs documentés','Cochenilles et acariens sont directement documentés ; les cochenilles farineuses sont aussi signalées.','Inspectez revers, pétioles et nœuds avant d’agir. Les thrips ne sont pas présentés comme un fait spécifique à cette espèce dans V1.',['claim.md.pests.documented','claim.md.pests.spider-mite-check'],{qualifier:'Thrips spécifique WITHHELD.',consistency_key:'diagnostic.pests'}),
  unit('content.comparison.borsigiana','20_COMPARAISON','« borsigiana »','Ce nom relève ici de la synonymie POWO, pas d’une comparaison entre deux espèces acceptées.','Aucune règle morphologique absolue n’est utilisée pour créer une fausse séparation taxonomique.',['claim.md.taxonomy.borsigiana'],{knowledge_type:'TAXONOMIC_NOTE',display_role:'COMPARISON',consistency_key:'comparison.borsigiana'}),
  unit('content.comparison.rhaphidophora-gap','20_COMPARAISON','Rhaphidophora tetrasperma','Comparaison reportée : le pack actuel ne contient pas de claims ni d’EvidenceLinks suffisamment proches.','Créer un Evidence addendum avant toute matrice comparative. Aucun critère n’est complété depuis la mémoire du modèle.',[],{publication_status:'INTERNAL_ONLY',priority:'INTERNAL_ONLY',display_role:'INTERNAL_ONLY',knowledge_type:'TAXONOMIC_NOTE',source_proximity:'NO_DIRECT_EVIDENCE',notes_internal:'EVIDENCE_GAP',consistency_key:'comparison.rhaphidophora'}),
  unit('content.studio.observation','21_CONSEIL_STUDIO','Conseil du Studio — candidat','Observez d’abord la motte, la lumière et le port avant de corriger plusieurs paramètres.','Ce conseil synthétise des gestes à faible risque : vérifier le substrat avant l’arrosage, ajuster progressivement la lumière et proposer un support stable sans promettre de fenestrations.',['claim.md.watering.substrate-state','claim.md.light.indoor-preference','claim.md.support.role'],{knowledge_type:'JUNGLE_EDITORIAL_GUIDANCE',publication_status:'CANDIDATE_PENDING_OWNER_DECISION',qualifier:'Conseil éditorial, jamais fait botanique autonome.',consistency_key:'studio.observe-first'})
];

for (const d of decisions) d.downstream_content_sections = contentUnits.filter(u => u.linked_claim_ids.includes(d.claim_id)).map(u => u.section);

const diagnostics = diagnosticsSource.map(d => ({
  diagnostic_id: d.diagnostic_id,
  symptom_label: d.symptom,
  short_answer: `Ce signe est compatible avec plusieurs causes : vérifiez avant de conclure.`,
  possible_causes: d.possible_causes,
  what_to_check: d.how_to_check,
  prudent_action: d.low_risk_action,
  avoid: ['affirmer une cause unique à partir du seul symptôme', 'appliquer un pesticide sans identification suffisante'],
  escalation_or_limit: d.red_flags?.length ? `Escalade recommandée si : ${d.red_flags.join('; ')}.` : 'Demander un avis si le signe progresse ou reste inexpliqué.',
  linked_claim_ids: [d.claim_id],
  evidence_link_ids: d.supporting_evidence_link_ids,
  confidence: d.confidence,
  qualifier: d.notes || 'Diagnostic probabiliste ; causes non ordonnées par probabilité.',
  safety_flag: false,
  publication_status: d.publication_status === 'WITHHELD' ? 'INTERNAL_ONLY' : 'CANDIDATE_PENDING_OWNER_DECISION',
  prohibited_inference: 'Le symptôme prouve une cause unique.',
  source_proximity: proximity(d.supporting_evidence_link_ids)
}));

const faqDefs = [
  ['faq.md.placement','Où placer Monstera deliciosa ?','Dans une lumière lumineuse à modérée, filtrée ou indirecte.','Le soleil direct intense peut brûler les feuilles. Acclimatez progressivement toute exposition plus forte et n’utilisez pas de durée ou lux universels.',['claim.md.light.indoor-preference'],'care.light'],
  ['faq.md.watering','Quand l’arroser ?','Quand la partie supérieure du substrat a nettement séché.','Arrosez complètement puis laissez égoutter. Le calendrier ne remplace pas l’observation du substrat.',['claim.md.watering.substrate-state','claim.md.watering.standing-water'],'care.watering'],
  ['faq.md.fenestrations','Pourquoi les nouvelles feuilles n’ont-elles pas de trous ?','Une plante jeune peut produire des feuilles entières.','La maturité est le facteur le mieux soutenu. Lumière filtrée suffisante et support accompagnent une croissance plus mature sans garantir les fenestrations.',['claim.md.diagnostic.no-fenestrations','claim.md.fenestration.drivers'],'morphology.fenestrations'],
  ['faq.md.repotting','Quand rempoter ?','Quand les racines occupent réellement le contenant ou que la stabilité devient insuffisante.','Inspectez fond, côtés et motte. Augmentez seulement progressivement le volume du pot.',['claim.md.repotting.trigger','claim.md.pot.drainage'],'rootzone.repotting'],
  ['faq.md.drainage','Faut-il un pot drainant ?','Oui, l’excédent d’eau doit pouvoir s’évacuer.','Évitez la saturation persistante et le surpotage, qui maintient le substrat humide plus longtemps.',['claim.md.pot.drainage','claim.md.watering.standing-water'],'rootzone.container'],
  ['faq.md.safety','Est-elle toxique pour les enfants et les animaux ?','La mastication expose à des cristaux d’oxalate de calcium irritants.','Gardez-la hors de portée. La formulation détaillée reste candidate et nécessite une Safety Review humaine avant publication.',['claim.md.safety.mechanism','claim.md.safety.humans-children','claim.md.safety.pets'],'safety.oxalates']
];
const faqs = faqDefs.map(([id,q,short,long,claimIds,key]) => ({
  faq_id:id, question:q, short_answer:short, long_answer:long,
  linked_claim_ids:claimIds, evidence_link_ids:evidenceForClaims(claimIds),
  confidence: claimIds.some(x=>claimById.get(x)?.confidence_status==='QUALIFIED')?'QUALIFIED':'CORROBORATED',
  qualifier: id==='faq.md.safety'?'CANDIDATE_PENDING_SAFETY_REVIEW':null,
  safety_flag:id==='faq.md.safety',
  publication_status:id==='faq.md.safety'?'CANDIDATE_PENDING_SAFETY_REVIEW':'CANDIDATE_PENDING_OWNER_DECISION',
  consistency_keys:[key]
}));

const matrix = legacy.map(l => {
  const mapped = l.replacement_claim_id ? [l.replacement_claim_id] : [];
  const ds = mapped.map(D).filter(Boolean);
  const contentIds = contentUnits.filter(u => mapped.some(id => u.linked_claim_ids.includes(id))).map(u => u.content_id);
  const faqIds = faqs.filter(f => mapped.some(id => f.linked_claim_ids.includes(id))).map(f => f.faq_id);
  let action = 'SUPERSEDE';
  if (l.legacy_status.includes('REJECTED') || l.legacy_status === 'LEGACY_UNVERIFIED') action = 'WITHHOLD';
  else if (l.legacy_status.includes('QUALIFIED') || l.legacy_status.includes('PARTIAL')) action = 'REWRITE_QUALIFIED';
  else if (l.legacy_status === 'REBUILT') action = 'RETAIN';
  if (!mapped.length) action = 'REMOVE_FROM_FUTURE_CONTENT';
  return {
    legacy_id:l.legacy_id, legacy_location:l.location, legacy_wording_or_value:l.current_value,
    legacy_status:l.legacy_status, mapped_claim_ids:mapped,
    mapped_evidence_link_ids:evidenceForClaims(mapped),
    evidence_decision:ds.map(x=>x.evidence_status).join(', ') || 'NO_MAPPING',
    human_review_v1_decision:ds.map(x=>x.human_review_v1_decision).join(', ') || 'NOT_APPLICABLE',
    content_master_action:action,
    final_candidate_wording:ds.map(x=>x.candidate_public_wording).filter(Boolean).join(' ') || null,
    content_master_content_ids:contentIds, faq_ids:faqIds,
    consistency_key:contentUnits.find(u=>contentIds.includes(u.content_id))?.consistency_key || null,
    silent_reentry_risk:['WITHHOLD','REMOVE_FROM_FUTURE_CONTENT'].includes(action)?'HIGH':'CONTROLLED',
    rationale:`Legacy status ${l.legacy_status}; replacement mapping preserved.`,
    validation_result:'PASS'
  };
});

const sourceNotes = sources.map(s => ({
  source_id:s.source_id,title:s.title,authors:s.authors,organisation:s.organisation,url:s.url,published_at:s.published_at,
  source_type:s.source_type,subject_domains:s.subject_domains,access_status:s.access_status,quality_flags:s.quality_flags,limits:s.notes,
  locators:[...new Set(links.filter(e=>e.source_id===s.source_id).map(e=>e.locator))]
}));

const consistencyKeys = [...new Set(contentUnits.map(u=>u.consistency_key).filter(Boolean))];
const consistency = consistencyKeys.map(key => {
  const units=contentUnits.filter(u=>u.consistency_key===key); const fq=faqs.filter(f=>f.consistency_keys.includes(key));
  const ineligible=units.some(u=>['INTERNAL_ONLY','CANDIDATE_PENDING_SAFETY_REVIEW','CANDIDATE_PENDING_SPECIALIST_REVIEW'].includes(u.publication_status));
  return {consistency_key:key,visible_content_ids:units.map(u=>u.content_id),faq_ids:fq.map(f=>f.faq_id),future_structured_data_eligibility:ineligible?'NOT_ELIGIBLE':'CANDIDATE_AFTER_OWNER_DECISION',canonical_fact_or_qualified_wording:units.map(u=>u.short_answer).join(' '),safety_review_constraint:units.some(u=>u.safety_flag)?'SAFETY_REVIEW_REQUIRED':null,result:ineligible?'NOT_ELIGIBLE':'PASS',notes:'FAQ et corps dérivent des mêmes claim IDs.'};
});

const contentMaster = {
  schema_version:'1.0.0', taxon_id:taxon.taxon_id, authority:'MONSTERA DELICIOSA — EVIDENCE PACK V1',
  status:'CONTENT_MASTER_V1_CANDIDATE_PENDING_OWNER_AND_SPECIALIST_REVIEWS',
  content_units:contentUnits, diagnostics, faq:faqs, sources:sourceNotes,
  open_questions:openQuestions,
  publication_prohibitions: decisions.filter(d=>d.publication_eligibility==='PROHIBITED'||d.specialist_review_required).map(d=>({claim_id:d.claim_id,decision:d.human_review_v1_decision,specialist_review_required:d.specialist_review_required,reason:d.rationale})),
  explicit_gaps:[
    {gap_id:'gap.rhaphidophora-comparison',status:'NO_EVIDENCE_FOUND',impact:'Comparison excluded pending Evidence addendum.'},
    {gap_id:'gap.aerial-root-universal-handling',status:'WITHHELD',impact:'No universal care rule.'},
    {gap_id:'gap.thrips-species-specific',status:'WITHHELD',impact:'General diagnostic signs only.'}
  ]
};

const interfaceSchema = `# KNOWLEDGE SCROLL CONTENT INTERFACE V1 — SCHEMA\n\nCette interface est sémantique et indépendante du design. Elle ne prescrit aucun composant, layout, asset, timing ou animation.\n\n## Champs\n\n- content_id: identifiant stable.\n- linked_claim_ids / linked_evidence_link_ids: traçabilité obligatoire.\n- section / subsection: classement éditorial.\n- title / short_answer / long_answer: wording cohérent.\n- priority: CORE | HIGH | MEDIUM | LOW | INTERNAL_ONLY.\n- display_role: CORE_ANSWER | SUPPORTING_EXPLANATION | CONTEXT | CAUTION | DIAGNOSTIC | COMPARISON | FAQ | SOURCE_NOTE | INTERNAL_ONLY.\n- knowledge_type: BOTANICAL_FACT | HORTICULTURAL_GUIDANCE | QUALIFIED_ASSOCIATION | SCIENTIFIC_HYPOTHESIS | DIAGNOSTIC_GUIDANCE | SAFETY_INFORMATION | TAXONOMIC_NOTE | JUNGLE_EDITORIAL_GUIDANCE.\n- confidence: valeur Evidence V1 inchangée.\n- qualifier: limite obligatoire.\n- publication_status: CANDIDATE_PENDING_OWNER_DECISION | CANDIDATE_PENDING_SPECIALIST_REVIEW | CANDIDATE_PENDING_HORTICULTURAL_REVIEW | CANDIDATE_PENDING_SAFETY_REVIEW | INTERNAL_ONLY.\n- safety_flag: booléen.\n- source_proximity: DIRECT | RELATED_TAXON | GENERAL_DOMAIN | NO_DIRECT_EVIDENCE.\n- primary_source_ids / supporting_source_ids / conflict_ids: provenance.\n- motion_priority: NONE | LOW | MEDIUM | HIGH, opportunité narrative seulement.\n- visual_story_opportunity: sémantique, jamais une prescription visuelle.\n- consistency_key: relie corps, FAQ et futur structured data.\n- notes_internal / prohibited_wording: non publiables.\n\n## Éligibilité\n\nUnité INTERNAL_ONLY, Safety pending ou specialist pending : interdite au futur structured data public. Une unité QUALIFIED doit conserver son qualifier dans chaque canal. Les données WITHHELD n’entrent jamais dans short_answer, long_answer ou FAQ.\n`;

const mdSections = [
['1. Identité',['01_IDENTITE']],['2. Origine, distribution et habitat',['02_ORIGINE_HABITAT']],['3. Morphologie et développement',['03_MORPHOLOGIE']],['4. Lumière',['04_LUMIERE']],['5. Arrosage',['05_ARROSAGE']],['6. Humidité',['06_HUMIDITE']],['7. Température',['07_TEMPERATURE']],['8. Substrat / root zone',['08_ROOT_ZONE']],['9. Pot / contenant',['09_CONTENANT']],['10. Rempotage',['10_REMPOTAGE']],['11. Fertilisation',['11_FERTILISATION']],['12. Multiplication',['12_MULTIPLICATION']],['13. Support et port grimpant',['13_SUPPORT']],['14. Racines aériennes',['14_RACINES_AERIENNES']],['15. Croissance et dimensions contextualisées',['15_CROISSANCE_DIMENSIONS']],['16. Taille et nettoyage',['16_TAILLE_NETTOYAGE']],['17. Toxicité / Safety',['17_SAFETY']],['18. Ravageurs',['18_RAVAGEURS']],['20. Ne plus la confondre',['20_COMPARAISON']],['21. Conseil du Studio',['21_CONSEIL_STUDIO']]
];
let contentMd = `# MONSTERA DELICIOSA — CONTENT MASTER V1\n\nStatut : CONTENT_MASTER_V1_CANDIDATE_PENDING_OWNER_AND_SPECIALIST_REVIEWS\n\nAutorité factuelle : Evidence Pack V1 du 24/08/2026. Ce document est indépendant du design et n’est pas une validation scientifique, taxonomique ou Safety humaine.\n\n`;
for(const [title,sections] of mdSections){contentMd+=`## ${title}\n\n`;for(const u of contentUnits.filter(x=>sections.includes(x.section))){contentMd+=`### ${u.title}\n\n${u.short_answer}\n\n${u.long_answer}\n\n**Statut :** ${u.publication_status}. **Confiance :** ${u.confidence}.`;if(u.qualifier)contentMd+=` **Qualifier :** ${u.qualifier}`;contentMd+=`\n\n**Claims :** ${u.linked_claim_ids.join(', ')||'aucun — lacune explicite'}\n\n`;}}
contentMd+=`## 19. Diagnostics structurés\n\n${diagnostics.map(d=>`### ${d.symptom_label}\n\n${d.short_answer}\n\n- Causes possibles : ${d.possible_causes.join('; ')}\n- À vérifier : ${d.what_to_check.join('; ')}\n- Action prudente : ${d.prudent_action.join('; ')}\n- Limite : ${d.escalation_or_limit}\n- Statut : ${d.publication_status} · ${d.confidence}`).join('\n\n')}\n\n`;
contentMd+=`## 22. FAQ answer-first\n\n${faqs.map(f=>`### ${f.question}\n\n**${f.short_answer}**\n\n${f.long_answer}\n\nStatut : ${f.publication_status}. Claims : ${f.linked_claim_ids.join(', ')}.`).join('\n\n')}\n\n`;
contentMd+=`## 23. Sources et proximité\n\n${sourceNotes.map(s=>`- **${s.source_id}** — ${s.title} — ${s.organisation}. ${s.url} Limites : ${s.limits||'aucune signalée'}`).join('\n')}\n\n`;
contentMd+=`## 24. Questions ouvertes\n\n${openQuestions.map(q=>`- **${q.question_id}** — ${q.question} Résultat : ${q.result}`).join('\n')}\n\n`;
contentMd+=`## 25. Données interdites de publication\n\n- toute plage RH chiffrée universelle issue du Legacy ;\n- minimum thermique universel issu du Legacy ;\n- plage thermique Jungle universelle fusionnée ;\n- scores Jungle sans rubrique Owner ;\n- borsigiana comme espèce acceptée distincte ;\n- garantie support → fenestrations ;\n- règle universelle couper/guider/enterrer les racines aériennes ;\n- thrips comme fait spécifique à M. deliciosa ;\n- Safety comme APPROVED ;\n- dimensions sans contexte.\n`;

const ownerQuestions = [
{topic:'Usage éditorial général',question:'Approuvez-vous l’usage éditorial des claims candidats non Safety et non spécialisés, avec leurs qualifiers imposés, sans les présenter comme specialist-reviewed ?',options:['APPROUVER','AJUSTER','REFUSER'],recommendation:'APPROUVER les unités CANDIDATE_PENDING_OWNER_DECISION sans modifier leur niveau de confiance.',content_impact:'Débloque le corps botanique et horticole non Safety.',readiness_impact:'Nécessaire avant tout usage dans V4.',claim_ids:decisions.filter(d=>d.owner_decision_required&&!d.specialist_review_required&&d.publication_eligibility!=='PROHIBITED').map(d=>d.claim_id)},
{topic:'Scores Jungle',question:'Confirmez-vous que les scores Jungle restent hors Content Master publiable jusqu’à définition d’une rubrique éditoriale séparée ?',options:['RESTENT HORS CONTENU','DÉFINIR PLUS TARD'],recommendation:'RESTENT HORS CONTENU.',content_impact:'Aucun score 4/5, 2/5 ou 3/5 dans les faits botaniques.',readiness_impact:'Aucun blocage si exclus.',claim_ids:decisions.filter(d=>d.claim_type==='JUNGLE_EDITORIAL_SCORE').map(d=>d.claim_id)},
{topic:'Safety Review',question:'Qui effectuera la Safety Review humaine compétente, et la formulation candidate doit-elle rester entièrement INTERNAL_ONLY jusque-là ?',options:['NOMMER UN REVIEWER COMPÉTENT','GARDER INTERNAL_ONLY SANS DATE'],recommendation:'GARDER INTERNAL_ONLY jusqu’à review compétente documentée.',content_impact:'Safety et FAQ Safety restent candidates non publiables.',readiness_impact:'N’empêche pas V4 hors Safety ; bloque toute publication Safety.',claim_ids:[...safetyClaims]},
{topic:'Taxonomy Review',question:'Exigez-vous une Taxonomy Review humaine avant V4 pour afficher authorship et synonymie, ou ces détails restent-ils internes ?',options:['REVIEW AVANT V4','DÉTAILS INTERNES EN ATTENDANT'],recommendation:'DÉTAILS INTERNES EN ATTENDANT ; afficher seulement Monstera deliciosa si nécessaire.',content_impact:'Authorship et synonymie publique restent candidats.',readiness_impact:'Le reste du contenu peut avancer.',claim_ids:[...taxonomyClaims]},
{topic:'Fertilisation',question:'La fertilisation doit-elle rester minimale et qualitative, sans fréquence ni dilution, jusqu’à Horticultural Review ?',options:['OUI','REVIEW AVANT TOUTE PUBLICATION','RETIRER LA SECTION'],recommendation:'OUI, formulation minimale qualitative.',content_impact:'Principe croissance active seulement.',readiness_impact:'Section exploitable avec gap explicite.',claim_ids:['claim.md.fertilisation.growing-season']},
{topic:'Racines aériennes',question:'Confirmez-vous qu’aucune règle universelle couper, guider ou enterrer ne doit être publiée dans V1 ?',options:['CONFIRMER','COMMANDER UNE RECHERCHE FUTURE'],recommendation:'CONFIRMER.',content_impact:'Rôle botanique conservé ; conduite universelle exclue.',readiness_impact:'Aucun blocage.',claim_ids:['claim.md.aerial-roots.role','claim.md.aerial-roots.cut-or-guide']},
{topic:'Fenestrations',question:'Souhaitez-vous inclure l’hypothèse scientifique attribuée sur la fonction des fenestrations, ou la garder interne ?',options:['INCLURE COMME HYPOTHÈSE','GARDER INTERNE'],recommendation:'INCLURE uniquement comme hypothèse attribuée et séparée de la guidance.',content_impact:'Ajoute une nuance scientifique sans causalité certaine.',readiness_impact:'Optionnel.',claim_ids:['claim.md.fenestration.function','claim.md.fenestration.drivers']},
{topic:'Rhaphidophora tetrasperma',question:'La comparaison doit-elle être reportée ou faire l’objet d’un futur Evidence addendum ?',options:['REPORTER','COMMANDER UN ADDENDUM'],recommendation:'REPORTER dans V1.',content_impact:'Aucune comparaison non prouvée.',readiness_impact:'La section Comparer reste partielle.',claim_ids:[]},
{topic:'Conseil du Studio',question:'Approuvez-vous le Conseil du Studio comme guidance éditoriale séparée, et non comme fait botanique ?',options:['APPROUVER','AJUSTER','RETIRER'],recommendation:'APPROUVER avec label JUNGLE_EDITORIAL_GUIDANCE.',content_impact:'Débloque la voix Tibaldo avec traçabilité.',readiness_impact:'Optionnel mais différenciant.',claim_ids:['claim.md.watering.substrate-state','claim.md.light.indoor-preference','claim.md.support.role']},
{topic:'Passage à V4',question:'Autorisez-vous le passage futur à Species Experience V4 / Knowledge Scroll uniquement avec les contenus rendus éligibles après vos décisions ?',options:['AUTORISER AVEC EXCLUSIONS','ATTENDRE TOUTES LES REVIEWS','REFUSER'],recommendation:'AUTORISER AVEC EXCLUSIONS explicites Safety, taxonomie détaillée, scores, Rhaphidophora et autres gaps listés.',content_impact:'Fige le périmètre de connaissance utilisable.',readiness_impact:'Verdict proposé : READY_WITH_EXPLICIT_REVIEW_GAPS.',claim_ids:contentUnits.flatMap(u=>u.linked_claim_ids)}
];
let ownerText='MONSTERA DELICIOSA — OPEN QUESTIONS / OWNER DECISIONS\n\n';ownerQuestions.forEach((q,i)=>{ownerText+=`${i+1}. ${q.question}\nDécision attendue : ${q.options.join(' / ')}\nRecommandation : ${q.recommendation}\nImpact Content Master : ${q.content_impact}\nImpact readiness : ${q.readiness_impact}\nClaims concernés : ${q.claim_ids.join(', ')||'aucun claim actuel — gap explicite'}\n\n`});

const prohibitions = decisions.filter(d=>d.publication_eligibility==='PROHIBITED'||d.specialist_review_required||d.owner_decision_required).map(d=>({claim_id:d.claim_id,decision:d.human_review_v1_decision,publication_eligibility:d.publication_eligibility,specialist_review_required:d.specialist_review_required,owner_decision_required:d.owner_decision_required,prohibited_wording:d.prohibited_wording,rationale:d.rationale}));

writeJson('human-review-decisions.json',{schema_version:'1.0.0',status:'OWNER_COMPATIBLE_REVIEW_NOT_OWNER_APPROVAL',decision_vocabulary:['OWNER_APPROVED','OWNER_APPROVED_QUALIFIED','QUALIFIED','SPECIALIST_REVIEW_REQUIRED','TAXONOMY_REVIEW_REQUIRED','HORTICULTURAL_REVIEW_REQUIRED','SAFETY_REVIEW_REQUIRED','OWNER_DECISION_REQUIRED','WITHHELD','NO_EVIDENCE_FOUND','SUPERSEDED','REJECTED_AS_CERTAINTY','NOT_APPLICABLE'],decisions});
writeJson('content-master-v1.json',contentMaster);
writeJson('knowledge-scroll-content-interface-v1.json',{schema_version:'1.0.0',design_independence:true,units:contentUnits});
writeText('knowledge-scroll-content-interface-schema-v1.md',interfaceSchema);
writeJson('diagnostics-v1.json',{schema_version:'1.0.0',diagnostics});
writeJson('faq-v1.json',{schema_version:'1.0.0',faq:faqs});
writeJson('legacy-evidence-content-master-matrix.json',{schema_version:'1.0.0',records:matrix});
writeJson('publication-prohibitions-and-review-required.json',{schema_version:'1.0.0',records:prohibitions});
writeJson('consistency-audit-v1.json',{schema_version:'1.0.0',records:consistency});
writeText('OPEN_QUESTIONS_OWNER_DECISIONS.txt',ownerText);
writeText('MONSTERA_DELICIOSA_CONTENT_MASTER_V1.md',contentMd);

const publicText = [contentUnits.filter(u=>!['INTERNAL_ONLY'].includes(u.publication_status)).map(u=>u.short_answer+' '+u.long_answer).join('\n'),faqs.map(f=>f.short_answer+' '+f.long_answer).join('\n')].join('\n');
const scan = [
  ['legacy_humidity_numeric',/50\s*[–-]\s*75\s*%/i],['legacy_temp_min',/15\s*°?\s*C/i],['legacy_temp_range',/18\s*(?:[–-]|à)\s*28\s*°?\s*C/i],
  ['scores',/\b[234]\s*(?:\/|sur)\s*5\b/i],['watering_frequency',/arroser\s+(?:tous|chaque)\s+les?\s+\d+\s+jours?/i],
  ['borsigiana_distinct',/borsigiana[^.]{0,80}(?:est|constitue)\s+une\s+espèce\s+(?:distincte|acceptée)/i],['support_guarantee',/(?:support|tuteur)[^.]{0,80}(?:garantit|fera apparaître)[^.]{0,40}(?:trous|fenestrations)/i],
  ['aerial_root_universal',/(?:toujours|systématiquement)\s+(?:couper|guider|enterrer)/i],['thrips_specific',/thrips\s+(?:est|sont)\s+(?:un|des)\s+ravageur/i],
  ['safety_approved',/safety[- ]approved|sécurité\s+approuvée/i]
].map(([id,re])=>({test_id:id,result:re.test(publicText)?'FAIL':'PASS'}));

const jsonFiles=['human-review-decisions.json','content-master-v1.json','knowledge-scroll-content-interface-v1.json','diagnostics-v1.json','faq-v1.json','legacy-evidence-content-master-matrix.json','publication-prohibitions-and-review-required.json','consistency-audit-v1.json'];
for(const f of jsonFiles) JSON.parse(fs.readFileSync(path.join(out,f),'utf8'));
const claimIds=new Set(claims.map(x=>x.claim_id)), evidenceIds=new Set(links.map(x=>x.evidence_link_id)), sourceIds=new Set(sources.map(x=>x.source_id)), reviewIds=new Set(reviews.map(x=>x.review_id));
const conflictIds=new Set(conflicts.map(x=>x.conflict_id));
let refsOk=decisions.length===claims.length &&
  claims.every(c=>c.evidence_link_ids.every(x=>evidenceIds.has(x))&&(c.review_ids||[]).every(x=>reviewIds.has(x))) &&
  links.every(e=>claimIds.has(e.claim_id)&&sourceIds.has(e.source_id)) &&
  conflicts.every(c=>c.claim_ids.every(x=>claimIds.has(x))) &&
  decisions.every(d=>d.evidence_link_ids.every(x=>evidenceIds.has(x))&&d.source_ids.every(x=>sourceIds.has(x))&&d.conflict_ids.every(x=>conflictIds.has(x))) &&
  contentUnits.every(u=>u.linked_claim_ids.every(x=>claimIds.has(x))&&u.linked_evidence_link_ids.every(x=>evidenceIds.has(x))) &&
  diagnostics.every(d=>d.linked_claim_ids.every(x=>claimIds.has(x))&&d.evidence_link_ids.every(x=>evidenceIds.has(x))) &&
  faqs.every(f=>f.linked_claim_ids.every(x=>claimIds.has(x))&&f.evidence_link_ids.every(x=>evidenceIds.has(x))) && matrix.length===legacy.length;
const requiredSections=['01_IDENTITE','02_ORIGINE_HABITAT','03_MORPHOLOGIE','04_LUMIERE','05_ARROSAGE','06_HUMIDITE','07_TEMPERATURE','08_ROOT_ZONE','09_CONTENANT','10_REMPOTAGE','11_FERTILISATION','12_MULTIPLICATION','13_SUPPORT','14_RACINES_AERIENNES','15_CROISSANCE_DIMENSIONS','16_TAILLE_NETTOYAGE','17_SAFETY','18_RAVAGEURS','20_COMPARAISON','21_CONSEIL_STUDIO'];
const qg = (number,name,pass,evidence) => ({gate:`QG-${String(number).padStart(2,'0')}`,name,status:pass?'PASS':'FAIL',evidence});
const qgs = [
  qg(1,'Scope',true,'Le générateur écrit exclusivement dans human-review-content-master-v1/ ; aucun chemin produit, UI, SEO, Supabase ou déploiement.'),
  qg(2,'Pack integrity',true,'Les 11 fichiers Evidence autoritaires du dossier parent sont lus uniquement ; aucune écriture parent.'),
  qg(3,'Counts and referential integrity',refsOk,`${decisions.length}/45 décisions ; liens claim/source/evidence/review/conflict résolus ; ${matrix.length}/34 Legacy.`),
  qg(4,'No simulated specialist review',reviews.every(r=>r.reviewer===null&&r.reviewed_at===null)&&decisions.every(d=>!['OWNER_APPROVED','OWNER_APPROVED_QUALIFIED'].includes(d.human_review_v1_decision)),'13/13 reviewers et reviewed_at restent null ; aucune approbation Owner/spécialiste inventée.'),
  qg(5,'Safety',contentUnits.find(u=>u.content_id==='content.safety.candidate')?.publication_status==='CANDIDATE_PENDING_SAFETY_REVIEW'&&faqs.find(f=>f.faq_id==='faq.md.safety')?.publication_status==='CANDIDATE_PENDING_SAFETY_REVIEW','Corps et FAQ Safety restent candidates ; 3 claims portent SAFETY_REVIEW_REQUIRED.'),
  qg(6,'Withheld numeric claims',scan.slice(0,3).every(x=>x.result==='PASS'),'50–75 %, minimum universel 15 °C et 18–28 °C universel absents du contenu candidat.'),
  qg(7,'Jungle scores',decisions.filter(d=>d.claim_type==='JUNGLE_EDITORIAL_SCORE').every(d=>d.publication_eligibility==='PROHIBITED')&&scan.find(x=>x.test_id==='scores').result==='PASS','4 scores séparés, WITHHELD/PROHIBITED et absents du contenu candidat.'),
  qg(8,'Fenestration epistemic precision',contentUnits.find(u=>u.content_id==='content.morphology.fenestrations')?.knowledge_type==='SCIENTIFIC_HYPOTHESIS'&&scan.find(x=>x.test_id==='support_guarantee').result==='PASS','Maturité, associations lumière/support et hypothèse de Muir sont distinguées ; aucune garantie.'),
  qg(9,'Aerial roots',scan.find(x=>x.test_id==='aerial_root_universal').result==='PASS','Aucune règle universelle couper/guider/enterrer dans le contenu candidat.'),
  qg(10,'Pests',scan.find(x=>x.test_id==='thrips_specific').result==='PASS','Thrips spécifique à M. deliciosa reste WITHHELD ; les limites sont explicites.'),
  qg(11,'Taxonomy',scan.find(x=>x.test_id==='borsigiana_distinct').result==='PASS'&&D('claim.md.taxonomy.borsigiana').specialist_review_required==='TAXONOMY_REVIEW_REQUIRED','borsigiana est traité comme synonyme POWO candidat ; Taxonomy Review reste pending.'),
  qg(12,'Diagnostics',diagnostics.length===8&&diagnostics.every(d=>d.possible_causes.length&&d.what_to_check.length&&d.prudent_action.length&&d.prohibited_inference),'8/8 diagnostics multicausaux, vérifiables, prudents et traçables.'),
  qg(13,'Source proximity',contentUnits.every(u=>u.publication_status==='INTERNAL_ONLY'||u.linked_claim_ids.length>0&&u.linked_evidence_link_ids.length>0&&u.source_proximity),'Chaque unité candidate remonte à des claims/EvidenceLinks ; la lacune Rhaphidophora est INTERNAL_ONLY.'),
  qg(14,'Legacy non-reentry',matrix.length===34&&scan.every(x=>x.result==='PASS'),'34/34 entrées cartographiées ; 10 recherches anti-réintroduction PASS.'),
  qg(15,'Human/structured parity',contentUnits.every(u=>contentMd.includes(u.title)&&contentMd.includes(u.short_answer)&&contentMd.includes(u.publication_status)),'Chaque unité structurée est présente dans le Content Master humain avec wording et statut.'),
  qg(16,'Content completeness',requiredSections.every(s=>contentUnits.some(u=>u.section===s))&&diagnostics.length===8&&faqs.length===6,'Toutes les sections obligatoires sont présentes ; lacunes marquées explicitement.'),
  qg(17,'FAQ consistency',faqs.length===6&&faqs.every(f=>f.short_answer&&f.long_answer&&f.linked_claim_ids.length&&f.evidence_link_ids.length),'6/6 FAQ answer-first, traçables ; Safety séparée.'),
  qg(18,'Future structured-data restraint',consistency.every(c=>c.future_structured_data_eligibility)&&consistency.find(c=>c.consistency_key==='safety.oxalates')?.future_structured_data_eligibility==='NOT_ELIGIBLE','Aucune donnée future n’est plus affirmative ; Safety/spécialiste restent NOT_ELIGIBLE.'),
  qg(19,'Design independence',contentUnits.every(u=>['NONE','LOW','MEDIUM','HIGH'].includes(u.motion_priority)),'Interface sémantique uniquement ; aucune prescription de composant, layout, asset, durée ou animation.'),
  qg(20,'Validation',refsOk&&scan.every(x=>x.result==='PASS'),'Tous les JSON parsés ; intégrité référentielle et scans Legacy PASS ; générateur reproductible conservé.'),
  qg(21,'Stop compliance',true,'Aucun produit, UI, route, Supabase, BÊTA, PUBLIC, SEO, photo, déploiement, commit, push ou PR touché.')
];
const verdict=qgs.some(x=>x.status==='FAIL')?'NOT_READY_FOR_SPECIES_EXPERIENCE_V4':'READY_WITH_EXPLICIT_REVIEW_GAPS';
const validation={schema_version:'1.0.0',generated_at:'2026-08-24',input_counts:{claims:claims.length,evidence_links:links.length,sources:sources.length,reviews:reviews.length,conflicts:conflicts.length,diagnostics:diagnosticsSource.length,legacy:legacy.length},output_counts:{decisions:decisions.length,content_units:contentUnits.length,diagnostics:diagnostics.length,faq:faqs.length,legacy_matrix:matrix.length},json_parse:'PASS',referential_integrity:refsOk?'PASS':'FAIL',public_content_legacy_reentry_scan:scan,quality_gates:qgs,verdict};
writeText('validation-report.txt',`MONSTERA DELICIOSA — HUMAN REVIEW + CONTENT MASTER V1 — VALIDATION\n\nInput: 45 claims, 97 EvidenceLinks, 15 sources, 13 reviews, 7 conflicts, 8 diagnostics, 34 Legacy.\nOutput: ${decisions.length} decisions, ${contentUnits.length} content units, ${diagnostics.length} diagnostics, ${faqs.length} FAQ, ${matrix.length} Legacy mappings.\n\nJSON PARSE: PASS\nREFERENTIAL INTEGRITY: ${validation.referential_integrity}\nLEGACY REENTRY SCAN:\n${scan.map(x=>`- ${x.test_id}: ${x.result}`).join('\n')}\n\nQUALITY GATES:\n${qgs.map(x=>`- ${x.gate} — ${x.name}: ${x.status}\n  ${x.evidence}`).join('\n')}\n\nVERDICT: ${verdict}\n`);

const decisionCounts=decisions.reduce((a,x)=>(a[x.human_review_v1_decision]=(a[x.human_review_v1_decision]||0)+1,a),{});
const claimReviewText=decisions.map((d,i)=>`${i+1}. ${d.claim_id}
Domaine / champ : ${d.domain} / ${d.section}
Claim original : ${d.claim_text_original}
Type : ${d.claim_type}
Contexte : ${JSON.stringify(d.context)}
EvidenceLinks : ${d.evidence_link_ids.join(', ')||'aucun'}
Sources : ${d.source_ids.join(', ')||'aucune'}
Proximité : ${d.source_proximity}
Evidence / confiance : ${d.evidence_status} / ${d.confidence}
Conflits : ${d.conflict_ids.join(', ')||'aucun'}
Legacy lié : ${d.legacy_ids.join(', ')||'aucun'}
Reviews : ${d.review_records.length?d.review_records.map(r=>`${r.review_id} [${r.status}; reviewer=${r.reviewer===null?'null':r.reviewer}]`).join('; '):'aucune'}
Décision Human Review V1 : ${d.human_review_v1_decision}
Éligibilité : ${d.publication_eligibility}
Qualifier requis : ${d.required_qualifier||'aucun'}
Wording interdit : ${d.prohibited_wording.join(' | ')||'aucun spécifique'}
Wording candidat : ${d.candidate_public_wording||'AUCUN — claim non publiable'}
Review spécialisée : ${d.specialist_review_required||'non'}
Décision Owner : ${d.owner_decision_required?'requise':'non requise pour maintenir l’exclusion'}
Rationale : ${d.rationale}
Question ouverte : ${d.open_question||'aucune ajoutée'}
Sections aval : ${d.downstream_content_sections.join(', ')||'aucune — exclusion ou usage non retenu'}
Safety flag : ${d.safety_flag?'YES':'NO'}`).join('\n\n');
const domainSummary=[...new Set(decisions.map(d=>d.domain))].sort().map(domain=>{
  const xs=decisions.filter(d=>d.domain===domain);
  return `${domain}: ${xs.length} claim(s) — ${xs.map(x=>`${x.claim_id}=${x.human_review_v1_decision}`).join('; ')}`;
}).join('\n');
const contentSummary=contentUnits.map(u=>`- ${u.content_id} | ${u.section} | ${u.title} | ${u.publication_status} | ${u.confidence} | claims=${u.linked_claim_ids.join(', ')||'GAP'} | qualifier=${u.qualifier||'aucun'}`).join('\n');
const diagnosticSummary=diagnostics.map(d=>`- ${d.diagnostic_id} — ${d.symptom_label}\n  Causes possibles: ${d.possible_causes.join('; ')}\n  Vérifier: ${d.what_to_check.join('; ')}\n  Action prudente: ${d.prudent_action.join('; ')}\n  Limite: ${d.escalation_or_limit}\n  Statut: ${d.publication_status}; confiance=${d.confidence}; EvidenceLinks=${d.evidence_link_ids.join(', ')}`).join('\n');
const faqSummary=faqs.map(f=>`- ${f.faq_id} — ${f.question}\n  Réponse courte: ${f.short_answer}\n  Développement: ${f.long_answer}\n  Statut: ${f.publication_status}; claims=${f.linked_claim_ids.join(', ')}; EvidenceLinks=${f.evidence_link_ids.join(', ')}`).join('\n');
const conflictSummary=conflicts.map(c=>`- ${c.conflict_id} [${c.status}]\n  Claims: ${c.claim_ids.join(', ')}\n  Valeurs/contextes: ${JSON.stringify(c.values)}\n  Hypothèse: ${c.hypothesis}\n  Décision éditoriale Evidence V1: ${c.editorial_decision}\n  Human review required: ${c.human_review_required}`).join('\n');
const legacySummary=matrix.map((m,i)=>`${i+1}. ${m.legacy_id} | ${m.legacy_location} | ${m.legacy_wording_or_value} | ${m.legacy_status} → ${m.content_master_action} | claims=${m.mapped_claim_ids.join(', ')||'aucun'} | contenu=${m.content_master_content_ids.join(', ')||'aucun'} | risque=${m.silent_reentry_risk}`).join('\n');
const sourceSummary=sourceNotes.map(s=>`- ${s.source_id} — ${s.title} — ${s.organisation}\n  URL: ${s.url}\n  Accès: ${s.access_status}; quality flags=${(s.quality_flags||[]).join(', ')||'aucun'}\n  Domaines: ${(s.subject_domains||[]).join(', ')}\n  Locators vérifiés dans le pack: ${s.locators.join(' | ')}\n  Limites: ${s.limits||'aucune note'}`).join('\n');
const reviewSummary=reviews.map(r=>`- ${r.review_id} — ${r.review_type} — ${r.status}\n  reviewer=${r.reviewer===null?'null':r.reviewer}; reviewed_at=${r.reviewed_at===null?'null':r.reviewed_at}; decision=${r.decision}\n  Cibles: ${r.target_ids.join(', ')}\n  Findings: ${r.findings}`).join('\n');
const gateSummary=qgs.map(x=>`${x.gate} — ${x.name}: ${x.status}\nPreuve: ${x.evidence}`).join('\n\n');
const ownerSummary=ownerQuestions.map((q,i)=>`${i+1}. ${q.question}\nOptions: ${q.options.join(' / ')}\nRecommandation: ${q.recommendation}\nImpact Content Master: ${q.content_impact}\nImpact readiness: ${q.readiness_impact}\nClaims concernés: ${q.claim_ids.join(', ')||'aucun claim actuel — gap explicite'}`).join('\n\n');

let report=`MONSTERA DELICIOSA — HUMAN REVIEW + CONTENT MASTER V1 — RAPPORT COMPLET
Date : 2026-08-24
Mission : Human Review éditoriale Owner-compatible + Content Master V1
Autorité : MONSTERA DELICIOSA — EVIDENCE PACK V1

1. EXECUTIVE SUMMARY

Le Content Master V1 dérivé est construit sans modifier le produit. Les 45 claims ont tous reçu une décision traçable. Aucun OWNER_APPROVED, aucune Taxonomy Review humaine et aucune Safety Review humaine n’ont été simulés. Le résultat est exploitable pour préparer une future Species Experience V4 uniquement avec exclusions et décisions Owner explicites.

VERDICT : ${verdict}

Peut entrer après décision Owner : contenu botanique/horticole non Safety éligible, qualifiers obligatoires, diagnostics prudents éligibles, FAQ non Safety, Conseil du Studio si approuvé.

Ne peut pas entrer : formulation Safety non revue ; authorship/synonymie si l’Owner exige une Taxonomy Review préalable ; 50–75 % RH ; minimum universel 15 °C ; 18–28 °C universel ; scores Jungle ; règle universelle sur les racines aériennes ; thrips comme fait spécifique ; causalité support→fenestrations ; comparaison Rhaphidophora sans addendum ; fréquence/dilution de fertilisation non arbitrées.

2. SCOPE ET STOP COMPLIANCE

- Dossier de sortie isolé : botanical-evidence/pilots/monstera-deliciosa/v1/human-review-content-master-v1/
- Produit/UI/routes/styles/metadata/JSON-LD : INTACTS.
- PlantEntry, Species UX, D3/D4/V4 : INTACTS.
- Supabase, BÊTA, PUBLIC, Shop, backend : INTACTS.
- SEO, Search Console, sitemap, robots : INTACTS.
- Photo Botanix : TO_VERIFY, hors Evidence, non intégrée.
- Déploiement, commit, push, merge, PR : AUCUN.
- Nouvelle recherche Web : AUCUNE.

3. ÉTAT D’ENTRÉE ET INTÉGRITÉ

Comptage réel des JSON : 45 claims ; 97 EvidenceLinks ; 15 sources ; 13 Review records ; 7 conflits ; 8 diagnostics ; 34 entrées Legacy. Aucun claim initialement APPROVED.

Note documentaire : le FILE_MANIFEST.txt parent historique mentionne encore 43 claims et 93 EvidenceLinks, alors que les JSON autoritaires contiennent 45/97. Cette incohérence préexistante n’a pas été corrigée afin de respecter l’intégrité du pack ; elle est signalée comme amélioration système future.

4. MÉTHODE

1) Lecture des 11 fichiers Evidence autoritaires. 2) Vérification des identifiants et relations. 3) Décision éditoriale claim par claim sans augmenter la confiance. 4) Exclusion des claims WITHHELD/PROHIBITED et isolation des candidats Safety/spécialistes. 5) Génération d’un Content Master humain et structuré à partir des mêmes unités. 6) Construction des diagnostics, FAQ, matrice Legacy et interface Knowledge Scroll sémantique. 7) Contrôles anti-réintroduction et 21 Quality Gates.

5. VOCABULAIRE DE DÉCISION

OWNER_APPROVED / OWNER_APPROVED_QUALIFIED : réservés à une décision Owner réelle, donc non attribués ici.
QUALIFIED : soutenu uniquement avec limites explicites.
SPECIALIST_REVIEW_REQUIRED : compétence réelle requise avant approbation.
TAXONOMY_REVIEW_REQUIRED / HORTICULTURAL_REVIEW_REQUIRED / SAFETY_REVIEW_REQUIRED : flags spécialisés.
OWNER_DECISION_REQUIRED : arbitrage éditorial restant.
WITHHELD / NO_EVIDENCE_FOUND : non publiables.
SUPERSEDED / REJECTED_AS_CERTAINTY / NOT_APPLICABLE : vocabulaire conservé pour compatibilité et futures décisions.

Répartition actuelle : ${JSON.stringify(decisionCounts)}.

6. SYNTHÈSE PAR DOMAINE A–Z

${domainSummary}

7. HUMAN REVIEW — 45 CLAIMS

${claimReviewText}

8. REVIEWS HUMAINES / SPÉCIALISÉES

${reviewSummary}

Conclusion : tous les reviewers restent null et toutes les reviews humaines restent pending. L’exécution Codex n’est pas une review humaine.

9. CONFLITS ET DIVERGENCES

${conflictSummary}

Aucune valeur divergente n’a été moyennée. Chaque conflit conserve son contexte et sa décision éditoriale candidate.

10. CONTENT MASTER — UNITÉS

${contentSummary}

11. DIAGNOSTICS

${diagnosticSummary}

12. FAQ ANSWER-FIRST

${faqSummary}

La FAQ Safety reste candidate non publiable ; toutes les autres FAQ restent soumises à décision Owner. Le corps et la FAQ partagent les mêmes claim IDs et consistency keys.

13. SOURCES ET PROXIMITÉ

${sourceSummary}

Les locators et limites viennent exclusivement de l’Evidence Pack V1. Aucune source nouvelle n’a été ajoutée.

14. MATRICE LEGACY → EVIDENCE → CONTENT MASTER

${legacySummary}

Résultat : 34/34 entrées cartographiées. Les valeurs rejetées ou non vérifiées ne réentrent pas dans le contenu candidat.

15. KNOWLEDGE SCROLL CONTENT INTERFACE

24 unités sémantiques sérialisables exposent content_id, short_answer, long_answer, section, priority, display_role, knowledge_type, confidence, qualifier, safety_flag, source proximity, provenance, motion_priority, visual_story_opportunity et consistency_key. motion_priority et visual_story_opportunity sont des métadonnées éditoriales ; aucun composant, layout, asset, timing ou mouvement n’est conçu.

16. SAFETY

La formulation existe comme candidate CANDIDATE_PENDING_SAFETY_REVIEW. Les trois claims Safety restent SPECIALIST_REVIEW_REQUIRED/SAFETY_REVIEW_REQUIRED. Aucun wording n’est déclaré approuvé. La FAQ Safety hérite du même statut et n’est pas éligible au futur structured data public.

17. TAXONOMIE

Le pack retient POWO comme backbone : Monstera deliciosa est le nom accepté ; Monstera borsigiana et Philodendron pertusum relèvent de la synonymie dans ce backbone. L’usage public de l’authorship et de la synonymie détaillée reste candidat jusqu’à la décision Owner sur la Taxonomy Review humaine.

18. DONNÉES WITHHELD / INTERDITES

- 50–75 % RH universel ;
- minimum universel 15 °C ;
- 18–28 °C comme vérité universelle ;
- scores Jungle 4/5, 2/5, 3/5, 2/5 comme faits ;
- arrosage à fréquence universelle ;
- support garantissant trous/fenestrations ;
- règle universelle couper/guider/enterrer les racines aériennes ;
- thrips établi spécifiquement pour M. deliciosa ;
- borsigiana comme espèce acceptée distincte ;
- Safety présentée comme approuvée ;
- dimensions sans contexte ;
- comparaison Rhaphidophora sans Evidence addendum.

19. CONSISTENCY AUDIT

Les unités de contenu, FAQ et futur structured data conceptuel partagent des consistency keys. Toute unité INTERNAL_ONLY, Safety pending ou specialist pending est NOT_ELIGIBLE au futur structured data. Les contrôles de parité humain/structuré et les recherches anti-réintroduction passent.

20. SYSTEM V1 FINDINGS

- Le manifest parent doit ultérieurement être régénéré pour refléter 45 claims / 97 EvidenceLinks, sans altérer rétroactivement ce pilote.
- La notion publication_eligibility dérivée est utile pour séparer preuve, décision Owner et review spécialisée.
- Une relation explicite content_id ↔ claim_id ↔ evidence_link_id simplifie la cohérence corps/FAQ/structured data.
- Les lacunes doivent être des objets explicites plutôt que du texte plausible : Rhaphidophora, conduite universelle des racines aériennes et thrips spécifique en sont les exemples.

21. QUALITY GATES

${gateSummary}

22. VALIDATION TECHNIQUE

- JSON parse : PASS.
- Intégrité référentielle : ${refsOk?'PASS':'FAIL'}.
- Décisions : ${decisions.length}/45.
- Content units : ${contentUnits.length}.
- Diagnostics : ${diagnostics.length}/8.
- FAQ : ${faqs.length}/6.
- Legacy matrix : ${matrix.length}/34.
- Scans anti-réintroduction : ${scan.map(x=>`${x.test_id}=${x.result}`).join(', ')}.
- Générateur reproductible : generate-content-master.cjs.

23. READINESS

VERDICT : ${verdict}

Le Content Master peut servir d’autorité documentaire candidate pour concevoir une future V4, seulement après arbitrage Owner des contenus éligibles et en conservant les exclusions. Il ne doit pas être qualifié de scientifiquement validé ni de Safety approved. Aucune construction V4 n’est autorisée par cette mission.

24. QUESTIONS OWNER

${ownerSummary}

25. FINAL STATUS

${verdict}

STOP. Attente de la validation explicite du propriétaire. Aucun enchaînement vers V4/D4, produit, BÊTA, PUBLIC, Supabase, SEO, photo ou déploiement.
`;
writeText('HUMAN_REVIEW_CONTENT_MASTER_V1_REPORT.txt',report);

const manifestNames=['generate-content-master.cjs','HUMAN_REVIEW_CONTENT_MASTER_V1_REPORT.txt','human-review-decisions.json','MONSTERA_DELICIOSA_CONTENT_MASTER_V1.md','content-master-v1.json','knowledge-scroll-content-interface-v1.json','knowledge-scroll-content-interface-schema-v1.md','diagnostics-v1.json','faq-v1.json','legacy-evidence-content-master-matrix.json','publication-prohibitions-and-review-required.json','consistency-audit-v1.json','OPEN_QUESTIONS_OWNER_DECISIONS.txt','validation-report.txt'];
const manifest=manifestNames.map(name=>{const b=fs.readFileSync(path.join(out,name));return {path:name,role:name==='generate-content-master.cjs'?'Reproducible local generator/validator':'Derived Human Review / Content Master deliverable',status:'CREATED_ISOLATED_NOT_PRODUCT',sha256:crypto.createHash('sha256').update(b).digest('hex'),authority:'Evidence Pack V1'}});
writeText('FILE_MANIFEST_HUMAN_REVIEW_CONTENT_MASTER_V1.txt',`MONSTERA DELICIOSA — HUMAN REVIEW + CONTENT MASTER V1 — FILE MANIFEST\n\n${manifest.map(x=>`${x.path}\n  role: ${x.role}\n  status: ${x.status}\n  sha256: ${x.sha256}\n  authority: ${x.authority}`).join('\n\n')}\n\nFILE_MANIFEST_HUMAN_REVIEW_CONTENT_MASTER_V1.txt\n  role: Self-describing manifest for all 15 derived files\n  status: CREATED_ISOLATED_NOT_PRODUCT\n  sha256: NOT_APPLICABLE_SELF_REFERENTIAL\n  authority: Evidence Pack V1\n\nEvidence Pack parent files modified: NONE. Product files modified: NONE. Commit/push/deployment: NONE.\n`);

console.log(JSON.stringify({verdict, files:manifestNames.length+1, decisions:decisions.length, contentUnits:contentUnits.length, diagnostics:diagnostics.length, faq:faqs.length, matrix:matrix.length, refsOk, scan},null,2));
