import type { PilotPath, TranslatedLocale } from "./config";

export type LocalizedPilotPage = {
  kind: "home" | "collection" | "plant" | "guide";
  eyebrow: string;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  image: string;
  imageAlt: string;
  sections: { title: string; paragraphs: string[] }[];
  faq: { question: string; answer: string }[];
  breadcrumbs: string[];
  cta: string;
};

const en: Record<PilotPath, LocalizedPilotPage> = {
  "/": {
    kind: "home", eyebrow: "Plant studio · Lille", title: "Rare and tropical plants in Lille", seoTitle: "Tibaldo Jungle — Plant Studio in Lille", description: "Discover Tibaldo Jungle, a plant studio in Lille devoted to rare plants, honest care advice, repotting and horticultural substrates.", intro: "Indoor and outdoor plants, tropical species, unusual finds and practical guidance rooted in observation.", image: "/projet-boutique-tibaldo-jungle-lille.webp", imageAlt: "Tibaldo Jungle plant studio in Lille", breadcrumbs: ["Home"], cta: "Explore the plant library",
    sections: [
      { title: "A living collection", paragraphs: ["Tibaldo Jungle brings together characterful plants, botanical knowledge and hands-on advice. Each plant is considered in relation to light, space and the time you can realistically give it."] },
      { title: "Advice before products", paragraphs: ["The studio helps you understand roots, watering and growing media before recommending a purchase. The aim is a plant that can thrive in your home, not a short-lived impulse buy."] },
      { title: "A local studio", paragraphs: ["The studio is located at 3 place de l’Arbonnoise in Lille. Part of the collection is propagated and monitored in Wattignies in small batches."] },
    ],
    faq: [
      { question: "Where is Tibaldo Jungle?", answer: "The Plant Studio is at 3 place de l’Arbonnoise, 59000 Lille, near Cormontaigne." },
      { question: "Can I get help choosing a plant?", answer: "Yes. Light, available space, pets and care habits are considered before a plant is recommended." },
    ],
  },
  "/plantes": {
    kind: "collection", eyebrow: "Plant encyclopedia", title: "Understand living plants", seoTitle: "Indoor and tropical plant encyclopedia", description: "Explore plant genera, families, species and cultivars through detailed growing guides from Tibaldo Jungle.", intro: "Browse the main botanical groups, then open a detailed profile for the plant you want to understand.", image: "/alocasia-imperial-red.webp", imageAlt: "Tropical foliage in the Tibaldo Jungle plant encyclopedia", breadcrumbs: ["Home", "Plants"], cta: "Browse the pilot profiles",
    sections: [
      { title: "Botanical identity first", paragraphs: ["Scientific names, accepted taxonomy and cultivars remain shared across every language. Localised text explains those same identities without creating duplicate plants."] },
      { title: "Care in context", paragraphs: ["Light, temperature, substrate, watering and humidity only make sense together. The profiles focus on balanced growing conditions rather than rigid calendars."] },
      { title: "Pilot selection", paragraphs: ["This beta includes Cycas revoluta, Anthurium clarinervium, Monstera deliciosa ‘Thai Constellation’ and the banana plant collection."] },
    ],
    faq: [
      { question: "Are scientific plant names translated?", answer: "No. Scientific names and botanical identities remain identical in French, English and Spanish." },
      { question: "Does this encyclopedia show live stock?", answer: "No. Jungle is the permanent botanical reference; commercial availability belongs to the Shop and central backend." },
    ],
  },
  "/plantes/cycas/revoluta": {
    kind: "plant", eyebrow: "Plant encyclopedia · Cycadaceae", title: "Cycas revoluta", seoTitle: "Cycas revoluta: care, light and watering", description: "A practical, botanically grounded guide to growing Cycas revoluta: light, drainage, watering, toxicity and slow growth.", intro: "An ancient gymnosperm with a regular crown of tough fronds — and not a palm, despite its common name.", image: "/photo-reelle-a-venir.svg", imageAlt: "Cycas revoluta with a crown of rigid green fronds", breadcrumbs: ["Home", "Plants", "Cycas", "Cycas revoluta"], cta: "Return to all plants",
    sections: [
      { title: "Botanical identity", paragraphs: ["Cycas revoluta belongs to the Cycadaceae family and the order Cycadales. It originates from south-eastern China, southern Japan and Taiwan.", "Its thick caudex produces successive flushes of fronds. Growth is slow and a new crown may emerge all at once."] },
      { title: "Light and watering", paragraphs: ["Provide very bright light and acclimatise the plant gradually to direct sun. Water thoroughly, then wait until the growing medium has dried well before watering again.", "Drainage is essential. A constantly wet root zone is far more dangerous than a short dry period."] },
      { title: "Safety and seasonal rhythm", paragraphs: ["All parts are toxic if ingested, particularly the seeds. Keep the plant away from children and animals.", "Growth slows markedly in winter. Reduce water as light and temperature fall, while keeping the plant in the brightest suitable position."] },
    ],
    faq: [
      { question: "Is Cycas revoluta a palm?", answer: "No. It is a cycad, an ancient group of gymnosperms, despite common names that compare it with a palm." },
      { question: "Why are the leaves turning yellow?", answer: "Possible causes include old fronds, insufficient light, poor drainage or prolonged excess water. Check the root zone before changing care." },
      { question: "Is it toxic to pets?", answer: "Yes. Every part is toxic when eaten, and the seeds are particularly hazardous." },
    ],
  },
  "/plantes/anthurium/clarinervium": {
    kind: "plant", eyebrow: "Plant encyclopedia · Araceae", title: "Anthurium clarinervium", seoTitle: "Anthurium clarinervium: complete care guide", description: "Learn how to grow Anthurium clarinervium: bright filtered light, airy substrate, careful watering, humidity and botanical identity.", intro: "A Mexican Anthurium recognised by its velvety, heart-shaped leaves and striking pale veins.", image: "/photo-reelle-a-venir.svg", imageAlt: "Velvety heart-shaped leaf of Anthurium clarinervium", breadcrumbs: ["Home", "Plants", "Anthurium", "Anthurium clarinervium"], cta: "Explore other Anthurium",
    sections: [
      { title: "A terrestrial Anthurium", paragraphs: ["Anthurium clarinervium is an accepted species in the Araceae family. It grows on rocky, well-aerated ground in seasonally dry Mexican habitats.", "Its thick leaves store resources better than the foliage of many tropical aroids, but its roots still need air and controlled moisture."] },
      { title: "Balanced care", paragraphs: ["Give it bright filtered light, stable warmth and an open substrate made from coarse, moisture-buffering components. Avoid a dense mix that remains saturated.", "Water when the upper part of the substrate has dried and the pot feels lighter. Empty the saucer or decorative pot after drainage."] },
      { title: "Reading the foliage", paragraphs: ["Yellowing may follow excess water or root stress. Crisp margins more often point to irregular watering, salt build-up or very dry air.", "New leaves are delicate while expanding. Stable conditions are more useful than repeatedly moving or spraying the plant."] },
    ],
    faq: [
      { question: "Does Anthurium clarinervium need very high humidity?", answer: "Moderate, stable humidity is helpful, but healthy roots, airflow and consistent watering matter more than occasional misting." },
      { question: "Can it grow in direct sun?", answer: "Gentle early or late sun may be tolerated after acclimatisation. Hot midday sun can mark the velvety leaves." },
      { question: "Is it toxic?", answer: "Like other Araceae, it contains calcium oxalate crystals and should not be eaten by people or animals." },
    ],
  },
  "/plantes/monstera/thai-constellation": {
    kind: "plant", eyebrow: "Plant encyclopedia · Araceae", title: "Monstera deliciosa ‘Thai Constellation’", seoTitle: "Monstera Thai Constellation: complete care guide", description: "Care for Monstera deliciosa ‘Thai Constellation’: stable variegation, bright light, watering, support, substrate and troubleshooting.", intro: "A cream-speckled Monstera cultivar whose stable variegation resembles a star-filled sky.", image: "/monstera-thai-constellation-real.jpg", imageAlt: "Cream-variegated leaf of Monstera deliciosa Thai Constellation", breadcrumbs: ["Home", "Plants", "Monstera", "Thai Constellation"], cta: "Explore other Monstera",
    sections: [
      { title: "One cultivar, one identity", paragraphs: ["‘Thai Constellation’ is a horticultural cultivar of Monstera deliciosa. Its scientific and commercial identity remains the same in every language.", "The cream pattern is distributed through the plant’s tissues and is generally more stable than sectoral variegation, although every leaf remains different."] },
      { title: "Light, roots and support", paragraphs: ["Bright indirect light supports balanced growth without scorching pale areas. Use a chunky, aerated substrate and water fully once part of the mix has dried.", "A firm support helps the climbing stem mature. Guide aerial roots towards the support or substrate instead of cutting them routinely."] },
      { title: "Slower than green Monstera", paragraphs: ["Pale tissue contains less chlorophyll, so growth is usually slower than in an all-green Monstera deliciosa.", "Brown cream sections may reflect hot sun, root stress, salt accumulation or inconsistent watering. Diagnose the whole growing environment before cutting leaves."] },
    ],
    faq: [
      { question: "Is Thai Constellation variegation stable?", answer: "It is considered relatively stable because the pattern is present throughout the plant’s tissues, but the amount of cream varies from leaf to leaf." },
      { question: "Why are the cream areas turning brown?", answer: "Check direct sun, root health, watering consistency and mineral build-up. Pale tissue is naturally more sensitive." },
      { question: "Does it need a moss pole?", answer: "A support is not mandatory for survival, but it encourages orderly climbing and can support larger mature leaves." },
    ],
  },
  "/plantes/bananiers": {
    kind: "collection", eyebrow: "Horticultural collection · Musaceae", title: "Banana plants: Musa and Ensete", seoTitle: "Banana plants: care, Musa, Ensete and overwintering", description: "Compare Musa and Ensete and understand light, water, wind, substrate, cold tolerance and overwintering in northern France.", intro: "Similar tropical silhouettes can hide very different roots, offsets and winter strategies.", image: "/photo-reelle-a-venir.svg", imageAlt: "Group of Musa and Ensete banana plants", breadcrumbs: ["Home", "Plants", "Banana plants"], cta: "Explore all plants",
    sections: [
      { title: "Not a tree", paragraphs: ["A banana plant is a giant herb. Its apparent trunk is a pseudostem made from tightly wrapped leaf bases.", "Many Musa grow from rhizomes and produce offsets. Ensete are normally solitary, which changes both propagation and winter management."] },
      { title: "Growing around Lille", paragraphs: ["Northern France combines possible frost, winter rain, wind and low seasonal light. A sheltered position and freely draining soil are essential outdoors.", "Musa basjoo is the most suitable candidate in this pilot for protected outdoor cultivation. Tender cultivars and Ensete ventricosum ‘Maurelii’ require frost-free overwintering."] },
      { title: "Four distinct strategies", paragraphs: ["The pilot compares Musa basjoo, Musa sikkimensis ‘Red Tiger’, Musa ‘Florida Variegata’ and Ensete ventricosum ‘Maurelii’.", "Cold tolerance should never be copied from one taxon to another. Leaves, pseudostem and underground parts also have different thresholds."] },
    ],
    faq: [
      { question: "Are banana plants trees?", answer: "No. They are large herbaceous plants whose pseudostem is formed by overlapping leaf sheaths." },
      { question: "Can a banana plant stay outside near Lille?", answer: "Musa basjoo may survive with suitable drainage, shelter and crown protection. Other taxa in this pilot need more cautious frost-free treatment." },
      { question: "Do all banana plants produce offsets?", answer: "No. Musa commonly offset from rhizomes, whereas Ensete are normally solitary." },
    ],
  },
  "/conseils/arroser-plantes-interieur": {
    kind: "guide", eyebrow: "Practical guide · Watering", title: "Water houseplants without a fixed calendar", seoTitle: "How to water houseplants without a fixed schedule", description: "Learn when and how to water indoor plants by reading the substrate, pot weight, roots, light and season rather than following a calendar.", intro: "A fixed schedule cannot account for light, pot size, substrate, roots and seasonal growth. Learn to decide from evidence.", image: "/service-diagnostic-plantes-lille.jpg", imageAlt: "Checking a houseplant before watering", breadcrumbs: ["Home", "Advice", "Watering houseplants"], cta: "Explore the plant library",
    sections: [
      { title: "Check below the surface", paragraphs: ["A dry surface does not reveal the moisture deeper in the pot. Test the substrate at several centimetres and learn how the container feels when wet and when nearly dry.", "Leaves can provide clues, but waiting for severe wilting places unnecessary stress on many species."] },
      { title: "Water the whole root ball", paragraphs: ["When watering is needed, moisten the root ball evenly until excess water drains from the holes. Then empty the saucer or decorative pot.", "Small repeated sips can leave dry zones and encourage roots to remain near the surface."] },
      { title: "Adjust with the seasons", paragraphs: ["Plants generally use less water when light and temperature decrease. Do not keep a summer frequency through winter without checking the substrate.", "After repotting, moving a plant or changing its light, observe again: the previous rhythm may no longer be suitable."] },
    ],
    faq: [
      { question: "Should I water once a week?", answer: "Not automatically. A weekly check can be useful, but watering should depend on the plant and the current moisture in its root zone." },
      { question: "Is a little water often safer?", answer: "Usually not. Thorough watering followed by appropriate drying is more reliable than frequent small sips." },
      { question: "Should I water less in winter?", answer: "Often yes, because growth and evaporation slow down, but always check the actual substrate rather than relying only on the season." },
    ],
  },
};

const es: Record<PilotPath, LocalizedPilotPage> = {
  "/": {
    kind: "home", eyebrow: "Estudio vegetal · Lille", title: "Plantas raras y tropicales en Lille", seoTitle: "Tibaldo Jungle — Estudio Vegetal en Lille", description: "Descubre Tibaldo Jungle, un estudio vegetal en Lille dedicado a plantas raras, consejos honestos, trasplante y sustratos hortícolas.", intro: "Plantas de interior y exterior, especies tropicales, ejemplares singulares y consejos prácticos basados en la observación.", image: "/projet-boutique-tibaldo-jungle-lille.webp", imageAlt: "Estudio vegetal Tibaldo Jungle en Lille", breadcrumbs: ["Inicio"], cta: "Explorar la enciclopedia vegetal",
    sections: [
      { title: "Una colección viva", paragraphs: ["Tibaldo Jungle reúne plantas con carácter, conocimiento botánico y consejos prácticos. Cada elección tiene en cuenta la luz, el espacio y el tiempo que realmente puedes dedicarle."] },
      { title: "Aconsejar antes de vender", paragraphs: ["El estudio ayuda a entender las raíces, el riego y el sustrato antes de recomendar una compra. El objetivo es una planta capaz de prosperar en tu hogar."] },
      { title: "Un estudio local", paragraphs: ["El estudio se encuentra en 3 place de l’Arbonnoise, Lille. Parte de la colección se propaga y se cuida en Wattignies en pequeñas cantidades."] },
    ],
    faq: [
      { question: "¿Dónde está Tibaldo Jungle?", answer: "El Estudio Vegetal está en 3 place de l’Arbonnoise, 59000 Lille, cerca de Cormontaigne." },
      { question: "¿Puedo recibir ayuda para elegir una planta?", answer: "Sí. Antes de recomendarla se tienen en cuenta la luz, el espacio, los animales y tus hábitos de cuidado." },
    ],
  },
  "/plantes": {
    kind: "collection", eyebrow: "Enciclopedia vegetal", title: "Comprender el mundo vegetal", seoTitle: "Enciclopedia de plantas de interior y tropicales", description: "Explora géneros, familias, especies y cultivares mediante las fichas de cultivo detalladas de Tibaldo Jungle.", intro: "Recorre los principales grupos botánicos y abre la ficha detallada de la planta que quieras conocer.", image: "/alocasia-imperial-red.webp", imageAlt: "Follaje tropical de la enciclopedia Tibaldo Jungle", breadcrumbs: ["Inicio", "Plantas"], cta: "Consultar las fichas piloto",
    sections: [
      { title: "Primero, la identidad botánica", paragraphs: ["Los nombres científicos, la taxonomía aceptada y los cultivares son comunes a todos los idiomas. El texto localizado explica las mismas identidades sin duplicar plantas."] },
      { title: "Cuidados con contexto", paragraphs: ["Luz, temperatura, sustrato, riego y humedad solo tienen sentido en conjunto. Las fichas buscan el equilibrio y evitan calendarios rígidos."] },
      { title: "Selección piloto", paragraphs: ["Esta beta incluye Cycas revoluta, Anthurium clarinervium, Monstera deliciosa ‘Thai Constellation’ y la colección de bananeras."] },
    ],
    faq: [
      { question: "¿Se traducen los nombres científicos?", answer: "No. Los nombres científicos y las identidades botánicas son idénticos en francés, inglés y español." },
      { question: "¿La enciclopedia muestra el stock?", answer: "No. Jungle es la referencia botánica permanente; la disponibilidad comercial pertenece al Shop y al backend central." },
    ],
  },
  "/plantes/cycas/revoluta": {
    kind: "plant", eyebrow: "Enciclopedia vegetal · Cycadaceae", title: "Cycas revoluta", seoTitle: "Cycas revoluta: cuidados, luz y riego", description: "Guía práctica y botánica para cultivar Cycas revoluta: luz, drenaje, riego, toxicidad y crecimiento lento.", intro: "Una antigua gimnosperma con una corona regular de frondes coriáceas; pese a su nombre común, no es una palmera.", image: "/photo-reelle-a-venir.svg", imageAlt: "Cycas revoluta con una corona de frondes verdes rígidas", breadcrumbs: ["Inicio", "Plantas", "Cycas", "Cycas revoluta"], cta: "Volver a todas las plantas",
    sections: [
      { title: "Identidad botánica", paragraphs: ["Cycas revoluta pertenece a la familia Cycadaceae y al orden Cycadales. Procede del sudeste de China, el sur de Japón y Taiwán.", "Su caudex grueso produce coronas sucesivas de frondes. El crecimiento es lento y las hojas nuevas pueden aparecer en una sola brotación."] },
      { title: "Luz y riego", paragraphs: ["Necesita mucha luz y una adaptación gradual al sol directo. Riega a fondo y espera a que el sustrato se seque bien antes de volver a regar.", "El drenaje es esencial. Una zona radicular constantemente húmeda es mucho más peligrosa que un breve periodo seco."] },
      { title: "Seguridad y ritmo estacional", paragraphs: ["Todas las partes son tóxicas por ingestión, especialmente las semillas. Mantén la planta lejos de niños y animales.", "En invierno el crecimiento se ralentiza mucho. Reduce el riego cuando bajen la luz y la temperatura."] },
    ],
    faq: [
      { question: "¿Cycas revoluta es una palmera?", answer: "No. Es una cícada, un antiguo grupo de gimnospermas, aunque algunos nombres comunes la comparen con una palmera." },
      { question: "¿Por qué amarillean las hojas?", answer: "Puede deberse a hojas viejas, poca luz, drenaje deficiente o exceso de agua prolongado. Revisa las raíces antes de cambiar los cuidados." },
      { question: "¿Es tóxica para los animales?", answer: "Sí. Todas las partes son tóxicas si se ingieren y las semillas son especialmente peligrosas." },
    ],
  },
  "/plantes/anthurium/clarinervium": {
    kind: "plant", eyebrow: "Enciclopedia vegetal · Araceae", title: "Anthurium clarinervium", seoTitle: "Anthurium clarinervium: guía completa de cuidados", description: "Aprende a cultivar Anthurium clarinervium: luz filtrada, sustrato aireado, riego prudente, humedad e identidad botánica.", intro: "Un Anthurium mexicano reconocible por sus hojas aterciopeladas en forma de corazón y sus nervios claros.", image: "/photo-reelle-a-venir.svg", imageAlt: "Hoja aterciopelada y acorazonada de Anthurium clarinervium", breadcrumbs: ["Inicio", "Plantas", "Anthurium", "Anthurium clarinervium"], cta: "Explorar otros Anthurium",
    sections: [
      { title: "Un Anthurium terrestre", paragraphs: ["Anthurium clarinervium es una especie aceptada de la familia Araceae. Crece sobre terrenos rocosos y aireados en hábitats mexicanos con estación seca.", "Sus hojas gruesas almacenan recursos, pero las raíces necesitan aire y una humedad controlada."] },
      { title: "Cuidados equilibrados", paragraphs: ["Ofrécele luz filtrada intensa, temperatura estable y un sustrato abierto con componentes gruesos. Evita las mezclas densas que permanecen saturadas.", "Riega cuando la parte superior se haya secado y la maceta pese menos. Vacía el plato o cubremaceta tras el drenaje."] },
      { title: "Leer el follaje", paragraphs: ["El amarilleo puede indicar exceso de agua o estrés radicular. Los bordes secos suelen relacionarse con riego irregular, acumulación de sales o aire muy seco.", "Las hojas nuevas son frágiles mientras se despliegan. La estabilidad resulta más útil que mover o pulverizar la planta continuamente."] },
    ],
    faq: [
      { question: "¿Necesita una humedad muy alta?", answer: "Una humedad moderada y estable ayuda, pero unas raíces sanas, ventilación y riego constante son más importantes que pulverizar ocasionalmente." },
      { question: "¿Puede recibir sol directo?", answer: "Puede tolerar sol suave de primera o última hora tras aclimatarse. El sol fuerte del mediodía puede marcar las hojas." },
      { question: "¿Es tóxico?", answer: "Como otras Araceae, contiene cristales de oxalato de calcio y no debe ser ingerido por personas ni animales." },
    ],
  },
  "/plantes/monstera/thai-constellation": {
    kind: "plant", eyebrow: "Enciclopedia vegetal · Araceae", title: "Monstera deliciosa ‘Thai Constellation’", seoTitle: "Monstera Thai Constellation: guía completa de cuidados", description: "Cuidados de Monstera deliciosa ‘Thai Constellation’: variegación estable, luz, riego, tutor, sustrato y diagnóstico.", intro: "Un cultivar de Monstera salpicado de crema cuya variegación estable recuerda a un cielo estrellado.", image: "/monstera-thai-constellation-real.jpg", imageAlt: "Hoja crema variegada de Monstera deliciosa Thai Constellation", breadcrumbs: ["Inicio", "Plantas", "Monstera", "Thai Constellation"], cta: "Explorar otras Monstera",
    sections: [
      { title: "Un cultivar, una identidad", paragraphs: ["‘Thai Constellation’ es un cultivar hortícola de Monstera deliciosa. Su identidad científica y comercial permanece igual en todos los idiomas.", "El dibujo crema se distribuye por los tejidos y suele ser más estable que una variegación sectorial, aunque cada hoja sea diferente."] },
      { title: "Luz, raíces y tutor", paragraphs: ["Una luz indirecta intensa favorece el crecimiento sin quemar las zonas claras. Utiliza un sustrato grueso y aireado y riega cuando una parte de la mezcla se haya secado.", "Un tutor firme acompaña la maduración del tallo trepador. Dirige las raíces aéreas hacia el soporte o el sustrato."] },
      { title: "Más lenta que una Monstera verde", paragraphs: ["El tejido claro contiene menos clorofila, por lo que suele crecer más despacio que una Monstera deliciosa completamente verde.", "Las manchas marrones pueden indicar sol fuerte, estrés radicular, sales o riego irregular. Evalúa todo el entorno antes de cortar hojas."] },
    ],
    faq: [
      { question: "¿La variegación Thai Constellation es estable?", answer: "Se considera relativamente estable porque está presente en los tejidos de la planta, pero la cantidad de crema cambia entre hojas." },
      { question: "¿Por qué se vuelven marrones las zonas crema?", answer: "Revisa el sol directo, las raíces, la regularidad del riego y la acumulación de minerales. El tejido claro es más sensible." },
      { question: "¿Necesita un tutor de musgo?", answer: "No es imprescindible para sobrevivir, pero un soporte favorece un crecimiento ordenado y hojas adultas más grandes." },
    ],
  },
  "/plantes/bananiers": {
    kind: "collection", eyebrow: "Colección hortícola · Musaceae", title: "Bananeras: Musa y Ensete", seoTitle: "Bananeras: cuidados, Musa, Ensete e invernada", description: "Compara Musa y Ensete y comprende luz, agua, viento, sustrato, resistencia al frío e invernada en el norte de Francia.", intro: "Siluetas tropicales parecidas pueden ocultar raíces, hijuelos y estrategias de invierno muy diferentes.", image: "/photo-reelle-a-venir.svg", imageAlt: "Grupo de bananeras Musa y Ensete", breadcrumbs: ["Inicio", "Plantas", "Bananeras"], cta: "Explorar todas las plantas",
    sections: [
      { title: "No es un árbol", paragraphs: ["Una bananera es una gran planta herbácea. Su aparente tronco es un pseudotallo formado por las vainas de las hojas.", "Muchas Musa crecen mediante rizomas y producen hijuelos. Las Ensete suelen ser solitarias, lo que cambia su multiplicación y la gestión del invierno."] },
      { title: "Cultivo alrededor de Lille", paragraphs: ["El norte de Francia combina posibles heladas, lluvia invernal, viento y poca luz estacional. En exterior son esenciales un lugar protegido y un suelo drenante.", "Musa basjoo es la candidata más adecuada del piloto para un cultivo exterior protegido. Los cultivares sensibles y Ensete ventricosum ‘Maurelii’ deben invernar sin heladas."] },
      { title: "Cuatro estrategias", paragraphs: ["El piloto compara Musa basjoo, Musa sikkimensis ‘Red Tiger’, Musa ‘Florida Variegata’ y Ensete ventricosum ‘Maurelii’.", "La resistencia al frío nunca debe copiarse de un taxón a otro. Hojas, pseudotallo y partes subterráneas tienen límites diferentes."] },
    ],
    faq: [
      { question: "¿Las bananeras son árboles?", answer: "No. Son grandes herbáceas cuyo pseudotallo está formado por vainas foliares superpuestas." },
      { question: "¿Puede quedarse fuera cerca de Lille?", answer: "Musa basjoo puede sobrevivir con drenaje, protección y ubicación adecuados. Los demás taxones del piloto requieren una invernada más prudente." },
      { question: "¿Todas producen hijuelos?", answer: "No. Las Musa suelen producirlos desde sus rizomas, mientras que las Ensete suelen ser solitarias." },
    ],
  },
  "/conseils/arroser-plantes-interieur": {
    kind: "guide", eyebrow: "Guía práctica · Riego", title: "Regar plantas de interior sin calendario fijo", seoTitle: "Cómo regar plantas de interior sin un calendario fijo", description: "Aprende cuándo y cómo regar observando el sustrato, el peso de la maceta, las raíces, la luz y la estación.", intro: "Un calendario fijo no tiene en cuenta la luz, la maceta, el sustrato, las raíces ni el crecimiento estacional. Aprende a decidir con indicios reales.", image: "/service-diagnostic-plantes-lille.jpg", imageAlt: "Comprobación de una planta de interior antes del riego", breadcrumbs: ["Inicio", "Consejos", "Riego de plantas"], cta: "Explorar la enciclopedia vegetal",
    sections: [
      { title: "Comprueba bajo la superficie", paragraphs: ["Una superficie seca no revela la humedad en el interior. Comprueba el sustrato a varios centímetros y aprende a reconocer el peso de la maceta mojada y casi seca.", "Las hojas dan pistas, pero esperar a que la planta se marchite mucho provoca un estrés innecesario."] },
      { title: "Riega todo el cepellón", paragraphs: ["Cuando sea necesario, humedece el cepellón de forma uniforme hasta que el exceso salga por los agujeros. Después vacía el plato o cubremaceta.", "Pequeñas cantidades repetidas pueden dejar zonas secas y concentrar las raíces cerca de la superficie."] },
      { title: "Adapta el riego a la estación", paragraphs: ["Las plantas suelen consumir menos agua cuando disminuyen la luz y la temperatura. No mantengas la frecuencia de verano durante el invierno sin comprobar el sustrato.", "Después de trasplantar, mover la planta o cambiar su luz, vuelve a observar: el ritmo anterior puede dejar de ser adecuado."] },
    ],
    faq: [
      { question: "¿Debo regar una vez por semana?", answer: "No automáticamente. Revisar cada semana puede ser útil, pero solo debes regar según la planta y la humedad real de sus raíces." },
      { question: "¿Es más seguro regar poco y a menudo?", answer: "Normalmente no. Un riego completo seguido de un secado adecuado suele ser más fiable que pequeñas cantidades frecuentes." },
      { question: "¿Debo regar menos en invierno?", answer: "A menudo sí, porque el crecimiento y la evaporación disminuyen, pero comprueba siempre el sustrato real." },
    ],
  },
};

export const pilotTranslations: Record<TranslatedLocale, Record<PilotPath, LocalizedPilotPage>> = { en, es };
