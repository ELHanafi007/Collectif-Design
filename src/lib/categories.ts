export interface SubCategory {
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  subCategories: SubCategory[];
  image: string;
  subtitle?: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "dessertes-chariots",
    name: "Dessertes / Chariots",
    slug: "dessertes-chariots",
    icon: "🛒",
    subtitle: "Mobilité & Style",
    image: "/dessertes.jpeg",
    subCategories: [
      { name: "Bar", slug: "bar" },
      { name: "Cuisine", slug: "cuisine" },
      { name: "Service", slug: "service" },
    ],
  },
  {
    id: "tables-basses",
    name: "Tables basses",
    slug: "tables-basses",
    icon: "☕",
    subtitle: "Cœur du Salon",
    image: "/tabledebasse.jpeg",
    subCategories: [
      { name: "Marbre", slug: "marbre" },
      { name: "Bois", slug: "bois" },
      { name: "Verre", slug: "verre" },
      { name: "Métal", slug: "metal" },
    ],
  },
  {
    id: "consoles",
    name: "Consoles",
    slug: "consoles",
    icon: "🖼️",
    subtitle: "Élégance de Passage",
    image: "/Console.jpeg",
    subCategories: [
      { name: "Entrée", slug: "entree" },
      { name: "Salon", slug: "salon" },
      { name: "Design", slug: "design" },
    ],
  },
  {
    id: "rangement",
    name: "Bibliothèques",
    slug: "bibliotheques",
    icon: "📚",
    subtitle: "Organisation & Design",
    image: "/bibliotheque.jpeg",
    subCategories: [
      { name: "Bibliothèques et Séparations", slug: "bibliotheques-et-separations" },
      { name: "Bureaux", slug: "bureaux" },
      { name: "Murales", slug: "murales" },
      { name: "Ouvertes", slug: "ouvertes" },
      { name: "Fermées", slug: "fermees" },
    ],
  },
  {
    id: "salle-a-manger",
    name: "Tables à manger",
    slug: "tables-a-manger",
    icon: "🍽️",
    subtitle: "Convivialité Royale",
    image: "/table a manger.jpeg",
    subCategories: [
      { name: "Tables à manger", slug: "tables-a-manger" },
      { name: "Rondes", slug: "rondes" },
      { name: "Rectangulaires", slug: "rectangulaires" },
      { name: "Ovales", slug: "ovales" },
      { name: "Extensibles", slug: "extensibles" },
      { name: "Chaises", slug: "chaises" },
    ],
  },
  {
    id: "tables-d-appoint",
    name: "Tables d’appoint",
    slug: "tables-d-appoint",
    icon: "🏺",
    subtitle: "Détails Raffinés",
    image: "/Tables d’appoint.jpeg",
    subCategories: [
      { name: "Bouts de canapé", slug: "bouts-de-canape" },
      { name: "Gigognes", slug: "gigognes" },
      { name: "Piédestaux", slug: "piedestaux" },
    ],
  },
  {
    id: "tables-de-chevet",
    name: "Tables de chevet",
    slug: "tables-de-chevet",
    icon: "🌙",
    subtitle: "Nuits Sereines",
    image: "/tablesdechevet.jpeg",
    subCategories: [
      { name: "Suspendues", slug: "suspendues" },
      { name: "Avec tiroirs", slug: "tiroirs" },
      { name: "Niches", slug: "niches" },
    ],
  },
  {
    id: "buffets",
    name: "Buffets",
    slug: "buffets",
    icon: "🚪",
    subtitle: "Rangement de Prestige",
    image: "/buffet.jpeg",
    subCategories: [
      { name: "Bahuts", slug: "bahuts" },
      { name: "Enfilades", slug: "enfilades" },
      { name: "Commodes", slug: "commodes" },
    ],
  },
  {
    id: "meubles-tv",
    name: "Meubles tv",
    slug: "meubles-tv",
    icon: "📺",
    subtitle: "Divertissement Chic",
    image: "/meubletv.jpeg",
    subCategories: [
      { name: "Muraux", slug: "muraux" },
      { name: "Bas", slug: "bas" },
      { name: "Bancs TV", slug: "bancs-tv" },
    ],
  },
  {
    id: "miroirs",
    name: "Miroirs",
    slug: "miroirs",
    icon: "🪞",
    subtitle: "Reflets de Luxe",
    image: "/miroires.jpeg",
    subCategories: [
      { name: "Muraux", slug: "muraux" },
      { name: "Sur pied", slug: "sur-pied" },
      { name: "Ronds", slug: "ronds" },
    ],
  },
  {
    id: "salons",
    name: "Salons",
    slug: "salons",
    icon: "🛋️",
    subtitle: "Confort Absolu",
    image: "/salon.jpeg",
    subCategories: [
      { name: "Canapés", slug: "canapes" },
      { name: "Fauteuils", slug: "fauteuils" },
      { name: "Chaises", slug: "chaises" },
      { name: "Poufs", slug: "poufs" },
    ],
  },
  {
    id: "decoration",
    name: "Décoration",
    slug: "decoration",
    icon: "✨",
    subtitle: "Détails d'Émotion",
    image: "/decoration.jpeg",
    subCategories: [
      { name: "Tableaux", slug: "tableaux" },
      { name: "Lustres", slug: "lustres" },
      { name: "Lampes", slug: "lampes" },
      { name: "Tapis", slug: "tapis" },
    ],
  },
];
