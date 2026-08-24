# KNOWLEDGE SCROLL CONTENT INTERFACE V1 — SCHEMA

Cette interface est sémantique et indépendante du design. Elle ne prescrit aucun composant, layout, asset, timing ou animation.

## Champs

- content_id: identifiant stable.
- linked_claim_ids / linked_evidence_link_ids: traçabilité obligatoire.
- section / subsection: classement éditorial.
- title / short_answer / long_answer: wording cohérent.
- priority: CORE | HIGH | MEDIUM | LOW | INTERNAL_ONLY.
- display_role: CORE_ANSWER | SUPPORTING_EXPLANATION | CONTEXT | CAUTION | DIAGNOSTIC | COMPARISON | FAQ | SOURCE_NOTE | INTERNAL_ONLY.
- knowledge_type: BOTANICAL_FACT | HORTICULTURAL_GUIDANCE | QUALIFIED_ASSOCIATION | SCIENTIFIC_HYPOTHESIS | DIAGNOSTIC_GUIDANCE | SAFETY_INFORMATION | TAXONOMIC_NOTE | JUNGLE_EDITORIAL_GUIDANCE.
- confidence: valeur Evidence V1 inchangée.
- qualifier: limite obligatoire.
- publication_status: CANDIDATE_PENDING_OWNER_DECISION | CANDIDATE_PENDING_SPECIALIST_REVIEW | CANDIDATE_PENDING_HORTICULTURAL_REVIEW | CANDIDATE_PENDING_SAFETY_REVIEW | INTERNAL_ONLY.
- safety_flag: booléen.
- source_proximity: DIRECT | RELATED_TAXON | GENERAL_DOMAIN | NO_DIRECT_EVIDENCE.
- primary_source_ids / supporting_source_ids / conflict_ids: provenance.
- motion_priority: NONE | LOW | MEDIUM | HIGH, opportunité narrative seulement.
- visual_story_opportunity: sémantique, jamais une prescription visuelle.
- consistency_key: relie corps, FAQ et futur structured data.
- notes_internal / prohibited_wording: non publiables.

## Éligibilité

Unité INTERNAL_ONLY, Safety pending ou specialist pending : interdite au futur structured data public. Une unité QUALIFIED doit conserver son qualifier dans chaque canal. Les données WITHHELD n’entrent jamais dans short_answer, long_answer ou FAQ.
