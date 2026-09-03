/** Owner-confirmed commercial paths, 2026-09-03. No stock, exclusive
 * dealership, delivery area or live checkout is implied by this content. */
export const substrateLocalCommerce = {
  openingDate: "26 septembre 2026",
  retailer: "TIBALDO Jungle, revendeur Sybotanica à Lille",
  shopNotice: "Le click & collect passe par le Shop, pour les références publiées avec le retrait activé. Si votre mélange n’y figure pas encore, appelez le Studio avant de vous déplacer.",
  nearby: "Depuis Lambersart, Lomme, La Madeleine, Marcq-en-Barœul, Saint-André-lez-Lille ou Loos, retrouvez le conseil et les substrats au même endroit : le Studio de Lille, près du métro Cormontaigne.",
  metro: "Vous venez de Villeneuve-d’Ascq, Roubaix, Tourcoing, Croix ou Wasquehal ? Préparez le nom de votre plante et les dimensions de son pot. Depuis Ronchin, Faches-Thumesnil, Wattignies ou Haubourdin, le retrait s’effectue également à Lille — pas sur le lieu de culture de Wattignies.",
  region: "Un déplacement depuis Douai ou Valenciennes dans le Nord, Lens, Arras ou Béthune dans le Pas-de-Calais ? Contactez-nous pour vérifier le mélange, le volume et la disponibilité avant de prendre la route. Dans les Hauts-de-France, notre point de rencontre reste le Studio lillois : un seul lieu d’achat et de retrait, quelle que soit votre ville de départ.",
} as const;

export const substrateLocalFaq = [
  { question: "Où trouver les substrats Sybotanica à Lille ?", answer: "TIBALDO Jungle est revendeur Sybotanica au Studio Végétal, 3 place de l’Arbonnoise, 59000 Lille, près du métro Cormontaigne. Ouverture du Studio le 26 septembre 2026. Les mélanges, volumes et conditionnements sont à confirmer avant votre visite." },
  { question: "Comment acheter ou préparer un retrait en boutique ?", answer: "Trois parcours : achat sur place au Studio à partir de son ouverture, contact par téléphone au 07 43 72 70 79 pour préparer votre besoin, ou click & collect via le Shop. Une demande téléphonique ne vaut pas confirmation de stock : convenez du mélange, du volume et des modalités avec le Studio." },
  { question: "Puis-je commander mon substrat en click & collect ?", answer: substrateLocalCommerce.shopNotice + " Le point de retrait est le Studio Végétal à Lille. Attendez la confirmation de préparation et les consignes de retrait avant de venir." },
  { question: "Tous les mélanges Sybotanica du guide sont-ils disponibles ?", answer: "Non, le guide présente des mélanges et leurs usages, pas un stock en temps réel. Une fiche fabricant ne garantit pas sa disponibilité chez TIBALDO. Vérifiez les références publiées dans le Shop ou contactez le Studio pour connaître les arrivages, conditionnements et tarifs." },
  { question: "Les substrats Sybotanica et les composants en vrac sont-ils la même offre ?", answer: "Non. Les mélanges Sybotanica sont des références fabricant ; la matériauthèque Jungle présente aussi des composants horticoles et la vente en vrac. Le conditionnement d’une référence Sybotanica ne doit pas être déduit de celui d’un composant en vrac. Demandez le volume et le format proposés pour votre besoin." },
  { question: "Quel mélange choisir pour un Monstera, un Anthurium ou une Alocasia ?", answer: "Le guide relie chaque plante aux mélanges à examiner, puis explique l’aération, le drainage et la rétention. Apportez le nom ou une photo de la plante, les dimensions du pot et vos habitudes d’arrosage : aucun substrat ne remplace un pot adapté, une bonne lumière et l’observation des racines." },
  { question: "Puis-je venir de la métropole lilloise, du Nord ou du Pas-de-Calais ?", answer: "Oui, la boutique est à Lille et accueille votre visite quelle que soit votre ville de départ. Pour un déplacement plus long, vérifiez d’abord la disponibilité par téléphone ou les conditions de retrait de votre commande Shop. Le site de préparation des plantes à Wattignies n’est pas l’adresse de la boutique." },
] as const;
