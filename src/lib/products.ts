export interface Product {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  discount?: number;
  image: string;
  images?: string[];
  category: string;
  sub_category: string;
  material: string;
  description: string;
  featured?: boolean;
  dimensions?: string;
  weight?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  customizable?: boolean;
  warranty?: string;
  deliveryTime?: string;
  created_at?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "canape-marindra",
    name: "Canapé Contemporain Marindra",
    price: "14500",
    oldPrice: "19000",
    discount: 23,
    image: "/salon.jpeg",
    images: ["/salon.jpeg", "/tabledebasse.jpeg"],
    category: "Salons",
    sub_category: "Modernes",
    material: "Tissu bouclé premium, Piétement laiton brossé",
    description: "Canapé au design contemporain, avec une assise confortable et des lignes simples. Il repose sur une structure moderne aux finitions d'exception.",
    dimensions: "L230 x P95 x H80 cm",
    inStock: true
  },
  {
    id: "table-basse-atlas",
    name: "Table Basse ATLAS",
    price: "6500",
    oldPrice: "8500",
    discount: 23,
    image: "/tabledebasse.jpeg",
    images: ["/tabledebasse.jpeg", "/Console.jpeg"],
    category: "Tables",
    sub_category: "Tables basses",
    material: "Marbre de Carrare, Acier thermolaqué noir",
    description: "Plateau en marbre naturel de Carrare sculpté à la main, reposant sur une structure en acier noir mat. Une pièce maîtresse intemporelle.",
    dimensions: "D90 x H40 cm",
    inStock: true
  },
  {
    id: "tables-chevet-elysee",
    name: "Tables de Chevet ELYSÉE",
    price: "3800",
    oldPrice: "5000",
    discount: 24,
    image: "/tablesdechevet.jpeg",
    images: ["/tablesdechevet.jpeg"],
    category: "Chambre",
    sub_category: "Tables de chevet",
    material: "Chêne massif teinté noir, Poignées laiton doré",
    description: "Un duo de tables de chevet en chêne teinté noir et détails en laiton doré. Allie minimalisme et fonctionnalité prestigieuse.",
    dimensions: "L50 x P40 x H55 cm",
    inStock: true
  },
  {
    id: "bibliotheque-pyramides",
    name: "Bibliothèque PYRAMIDES",
    price: "9500",
    oldPrice: "12500",
    discount: 24,
    image: "/bibliotheque.jpeg",
    images: ["/bibliotheque.jpeg"],
    category: "Meubles",
    sub_category: "Rangement",
    material: "Noyer d'Amérique massif, Cadre renforcé",
    description: "Structure géométrique sculpturale en noyer massif. Idéale pour exposer vos livres d'art et objets décoratifs précieux.",
    dimensions: "L120 x P35 x H180 cm",
    inStock: true
  },
  {
    id: "table-manger-paloma",
    name: "Table à Manger PALOMA",
    price: "12500",
    oldPrice: "16500",
    discount: 24,
    image: "/table a manger.jpeg",
    images: ["/table a manger.jpeg", "/decoration.jpeg"],
    category: "Tables",
    sub_category: "Salle à manger",
    material: "Marbre blanc Calacatta, Chêne naturel",
    description: "Superbe table de repas pouvant accueillir jusqu'à 8 convives. Plateau en marbre Calacatta et pieds croisés en chêne massif.",
    dimensions: "L220 x P100 x H76 cm",
    inStock: true
  },
  {
    id: "console-ecume",
    name: "Console d'Exception ÉCUME",
    price: "5200",
    oldPrice: "6800",
    discount: 23,
    image: "/Console.jpeg",
    images: ["/Console.jpeg"],
    category: "Meubles",
    sub_category: "Console",
    material: "Acier texturé, Finition feuille d'or",
    description: "Console élégante en métal brossé texturé. Sa silhouette aérienne et ses finitions dorées habillent vos entrées avec classe.",
    dimensions: "L140 x P35 x H80 cm",
    inStock: true
  },
  {
    id: "desserte-mario",
    name: "Desserte Haute Couture MARIO",
    price: "4200",
    oldPrice: "5500",
    discount: 23,
    image: "/dessertes.jpeg",
    images: ["/dessertes.jpeg"],
    category: "Meubles",
    sub_category: "Desserte",
    material: "Verre fumé trempé, Acier doré brossé",
    description: "Desserte de bar roulante haut de gamme. Verre fumé et structure en acier doré brossé pour un service d'une élégance absolue.",
    dimensions: "L80 x P45 x H75 cm",
    inStock: true
  },
  {
    id: "buffet-prestige-dune",
    name: "Buffet Prestige DUNE",
    price: "11000",
    oldPrice: "14500",
    discount: 24,
    image: "/buffet.jpeg",
    images: ["/buffet.jpeg"],
    category: "Meubles",
    sub_category: "Buffet",
    material: "Chêne cannelé, Plateau marbre de Carrare",
    description: "Buffet bas en chêne cannelé à la main et plateau supérieur en marbre de Carrare. Quatre portes avec charnières amorties.",
    dimensions: "L180 x P45 x H75 cm",
    inStock: true
  },
  {
    id: "miroir-galet",
    name: "Miroir Architectural GALET",
    price: "2800",
    oldPrice: "3700",
    discount: 24,
    image: "/miroires.jpeg",
    images: ["/miroires.jpeg"],
    category: "Déco",
    sub_category: "Miroir",
    material: "Verre poli de précision, Laiton patiné",
    description: "Miroir aux courbes organiques libres avec contour en laiton patiné. Crée un jeu de lumière et de profondeur sculptural.",
    dimensions: "L90 x H120 cm",
    inStock: true
  },
  {
    id: "meuble-tv-koto",
    name: "Meuble TV Suspendu KOTO",
    price: "7500",
    oldPrice: "9800",
    discount: 23,
    image: "/meubletv.jpeg",
    images: ["/meubletv.jpeg"],
    category: "Meubles",
    sub_category: "Meuble TV",
    material: "Noyer canaletto massif, Laque beige chaud",
    description: "Meuble de télévision mural aux lignes épurées en noyer canaletto et détails de portes laquées mat beige chaud.",
    dimensions: "L200 x P40 x H35 cm",
    inStock: true
  }
];
