import { plants } from '../plants/catalog.ts';
import { exactVerifiedPrimaryMedia } from '../plants/verified-media-api-contract.ts';

export type EditorialSource = { id: string; title: string; publisher: string; url: string; supports: string; limitation: string };
export type EditorialChapter = { id: string; title: string; kind: string; paragraphs: string[]; sources: string[] };
export type EditorialCallout = { kind: 'myth' | 'observation' | 'summary'; title: string; text: string; contrast?: string; after: string };
export type EditorialArticle = {
  slug: string; title: string; subtitle: string; eyebrow: string; category: string;
  publishedAt: string; updatedAt: string; author: string; readingTime: number;
  heroMedia: { genre: string; slug: string; context: string };
  intro: string; chapters: EditorialChapter[]; callouts: EditorialCallout[];
  sources: EditorialSource[]; relatedPlants: { genre: string; slug: string; label: string }[];
  relatedArticles: string[]; seo: { title: string; description: string };
};

// Independently researched pilot. Plantlovers was topic inspiration only;
// no Plantlovers text, sequence or media is reproduced. No nomenclature absence claim.
export const editorialArticles: EditorialArticle[] = [{
  slug: 'monstera-half-moon',
  title: 'Half Moon : variété rare ou simple motif ?',
  subtitle: 'Avant d’acheter une feuille spectaculaire, regardons la plante entière.',
  eyebrow: 'Décryptage n°001', category: 'Panachure',
  publishedAt: '2026-09-10', updatedAt: '2026-09-10', author: 'TIBALDO Jungle', readingTime: 5,
  heroMedia: { genre: 'monstera', slug: 'thai-constellation', context: 'Monstera deliciosa ‘Thai Constellation’. Photographie de panachure, et non démonstration d’un motif Half Moon.' },
  intro: 'Une moitié verte, une moitié claire : le contraste arrête le regard. Mais lorsqu’une annonce promet une Monstera « Half Moon », parle-t-elle du nom de la plante, de sa dernière feuille ou de ce qu’elle produira demain ? Ce ne sont pas les mêmes choses.',
  chapters: [
    { id: 'l-annonce', title: 'Une belle photo n’est pas une identité.', kind: 'Vocabulaire commercial · lecture TIBALDO', sources: ['rhs-names'], paragraphs: [
      'Dans le langage des collectionneurs, « Half Moon » évoque une feuille dont deux grandes zones contrastées se partagent le limbe, souvent de part et d’autre de la nervure centrale. C’est une description visuelle. Employée seule dans une annonce, elle ne suffit pas à établir l’identité d’un cultivar distinct.',
      'Il faut donc dissocier trois informations : le nom botanique de la plante, la dénomination de la sélection vendue, et le motif visible sur un spécimen. La RHS explique que descriptions, origines et références aident à préciser l’application des noms de cultivars. L’absence d’un nom dans une recherche rapide ne prouve pas son inexistence : nous ne prétendons pas dresser ici un registre mondial des « Half Moon ».',
      'Avant de payer pour une appellation séduisante, demandez ce qu’elle désigne précisément. La réponse devrait parler de la plante proposée, pas seulement de sa ressemblance avec une photo de collection.'
    ] },
    { id: 'la-pousse', title: 'La suite se joue au point de croissance.', kind: 'Repère botanique', sources: ['uf-chimeras'], paragraphs: [
      'Dans une panachure chimérique, des tissus génétiquement différents coexistent dans la plante. Leur organisation au méristème — une zone où les cellules se divisent — participe à la répartition des couleurs. Le dessin du limbe est un résultat visible, pas un patron que chaque feuille suivante recopierait.',
      'Les références universitaires distinguent plusieurs organisations de chimères, de stabilité différente. Certaines peuvent changer au fil de la croissance. Une séparation visuelle vert/blanc ne permet toutefois pas, à elle seule, de diagnostiquer l’organisation microscopique du méristème d’une Monstera.',
      'Notre lecture pratique : observez plusieurs feuilles successives et la croissance récente. Cela donne un historique du spécimen ; cela ne transforme pas cet historique en garantie sur sa prochaine feuille.'
    ] },
    { id: 'la-bouture', title: 'Acheter une bouture, pas seulement une feuille.', kind: 'Propagation · Monstera deliciosa', sources: ['umn-monstera'], paragraphs: [
      'Pour une bouture de tige de Monstera deliciosa, le nœud et son bourgeon axillaire comptent. Une feuille détachée avec son pétiole, mais sans nœud, ne donne pas une nouvelle pousse complète selon le guide de l’Université du Minnesota. Le plus beau limbe de l’annonce ne remplace donc pas la partie qui permettra à la plante de repartir.',
      'Demandez une vue nette de la tige et du point de croissance, puis faites préciser l’état vendu : bouture fraîche, bouture enracinée ou plante déjà en croissance. Ces situations ne sont pas interchangeables. La présence d’un nœud est une condition de propagation, pas une promesse de reproduction exacte du partage blanc/vert.'
    ] },
    { id: 'le-vert', title: 'Le vert n’est pas le second rôle.', kind: 'Physiologie & observation horticole', sources: ['uf-chimeras', 'rhs-reversion', 'umn-monstera'], paragraphs: [
      'Dans une panachure blanche liée à l’absence de chlorophylle, les zones blanches ne captent pas la lumière comme les tissus verts chlorophylliens. Une grande surface claire n’est donc pas un bonus de photosynthèse. Le guide du Minnesota rappelle que les formes panachées de Monstera peuvent pousser plus lentement.',
      'La RHS décrit aussi le retour de pousses entièrement vertes chez certaines plantes panachées : plus vigoureuses, elles peuvent prendre le dessus. À l’inverse, des pousses entièrement blanches sont faibles. Ce constat général ne permet pas de calculer le risque individuel d’une Monstera à partir d’une photo.',
      'Préférer une panachure marbrée, avec du vert réparti dans le feuillage, relève ici de notre conseil de culture et de choix personnel. Ce n’est ni une règle universelle de beauté, ni un certificat de stabilité. On peut aimer une feuille très blanche sans confondre son attrait avec la vigueur de la plante.'
    ] },
    { id: 'avant-d-acheter', title: 'Quatre questions, avant le coup de cœur.', kind: 'Le regard de TIBALDO', sources: [], paragraphs: [
      'Est-ce la plante photographiée qui sera vendue ? Une image d’exemple ne renseigne pas sur l’état du spécimen que vous recevrez. Demandez une vue récente de l’ensemble, sans vous limiter à sa feuille la plus spectaculaire.',
      'Quel nom et quelle origine le vendeur peut-il documenter ? Gardez l’appellation de la sélection distincte du descriptif « Half Moon ». Une formulation précise est plus utile qu’une accumulation de superlatifs.',
      'Que voit-on sur les dernières pousses et sur la tige ? Regardez le feuillage dans son ensemble. Pour une bouture, faites montrer le nœud, le bourgeon et, si elle est vendue enracinée, les racines.',
      'Qu’est-ce qui est réellement garanti ? La description du sujet livré doit être claire. Le prix, la rareté annoncée et la beauté d’une feuille ne constituent pas une assurance sur le dessin des suivantes.'
    ] }
  ],
  callouts: [
    { kind: 'myth', after: 'l-annonce', title: 'Un mot sur l’étiquette, deux lectures.', text: '« Half Moon » suffit à identifier une variété particulière.', contrast: 'Le motif décrit une apparence. L’identité de la plante et l’origine de la sélection restent à documenter séparément.' },
    { kind: 'observation', after: 'la-bouture', title: 'Le détail qui change tout', text: 'La photo d’une feuille vous montre ce qui existe. Le nœud et le point de croissance vous renseignent sur la partie qui peut repartir.' },
    { kind: 'summary', after: 'avant-d-acheter', title: 'Achetez une plante. Pas la promesse d’un dessin.', text: 'Half Moon décrit d’abord un effet visuel. Regardez l’identité, la plante entière et sa croissance. Une feuille peut être exceptionnelle sans annoncer une série de feuilles identiques.' }
  ],
  sources: [
    { id: 'rhs-names', title: 'Nomenclatural standards', publisher: 'Royal Horticultural Society · Herbarium', url: 'https://apps.rhs.org.uk/rhsherbarium/standards_details.asp', supports: 'Comment documenter l’identité et l’usage d’un nom de cultivar.', limitation: 'Cette référence n’est pas un inventaire exhaustif des appellations Half Moon.' },
    { id: 'uf-chimeras', title: 'Genetic selection — Chimeras', publisher: 'University of Florida / Kentucky / Texas A&M', url: 'https://propg.ifas.ufl.edu/03-genetic-selection/04-genetic-chimera.html', supports: 'Méristèmes, tissus chimériques, chlorophylle et différences de stabilité.', limitation: 'Principes généraux : une photographie ne permet pas un diagnostic cellulaire du spécimen.' },
    { id: 'umn-monstera', title: 'Monstera deliciosa', publisher: 'University of Minnesota Extension', url: 'https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/propagating-monstera-deliciosa', supports: 'Bouturage avec nœud et bourgeon ; limites d’une feuille seule ; croissance des formes panachées.', limitation: 'Aucune garantie sur la disposition de la panachure d’une future feuille.' },
    { id: 'rhs-reversion', title: 'Reversion in plants', publisher: 'Royal Horticultural Society · Advice', url: 'https://www.rhs.org.uk/problems/reversion', supports: 'Retour de pousses vertes et vigueur relative des pousses vertes ou blanches.', limitation: 'Observation horticole générale, sans probabilité chiffrée applicable à chaque Monstera.' }
  ],
  relatedPlants: [
    { genre: 'monstera', slug: 'deliciosa', label: 'Monstera deliciosa' },
    { genre: 'monstera', slug: 'thai-constellation', label: 'Thai Constellation' },
    { genre: 'monstera', slug: 'albo-variegata', label: 'Albo Variegata' }
  ], relatedArticles: [],
  seo: { title: 'Half Moon : motif ou variété de Monstera ? | L’Œil végétal', description: 'Que signifie Half Moon sur une Monstera ? Panachure, nœud, bouturage et limites des promesses : un décryptage documenté par TIBALDO Jungle.' }
}];

export const getEditorialArticle = (slug: string) => editorialArticles.find(a => a.slug === slug);
export function editorialMedia(article: EditorialArticle) {
  const plant = plants.find(p => p.genre === article.heroMedia.genre && p.slug === article.heroMedia.slug);
  return plant ? exactVerifiedPrimaryMedia(plant) : null;
}
export const editorialDate = (date: string) => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
