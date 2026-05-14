export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: 'salon-moderne-emerald',
    name: 'Salon Moderne Emerald',
    price: 12500,
    category: 'salons',
    subcategory: 'modernes',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000',
    description: 'Un chef-d’œuvre de design moderne avec un revêtement en velours premium et des accents dorés.',
    features: ['Velours Premium', 'Pieds plaqués or', 'Mousse haute densité'],
  },
  {
    id: 'canape-cuir-noir',
    name: 'Canapé Cuir Noir Luxe',
    price: 8900,
    category: 'canapes',
    subcategory: 'fixes',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1000',
    description: 'Canapé en cuir classique pour un salon raffiné.',
    features: ['Cuir véritable', 'Structure en chêne massif', 'Support ergonomique'],
  },
  {
    id: 'chambre-royale',
    name: 'Chambre à Coucher Royale',
    price: 22000,
    category: 'chambre',
    subcategory: 'suites',
    image: 'https://images.unsplash.com/photo-1505693419148-db306597aa38?auto=format&fit=crop&q=80&w=1000',
    description: 'Transformez votre chambre en un sanctuaire d’élégance.',
    features: ['Taille King Size', 'Éclairage intégré', 'Tête de lit en velours'],
  },
  {
    id: 'table-basse-marbre',
    name: 'Table Basse Marbre Blanc',
    price: 3500,
    category: 'tables',
    subcategory: 'basses',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000',
    description: 'Plateau en marbre de Carrare avec une base en métal élégante.',
    features: ['Marbre italien', 'Acier thermolaqué', 'Design minimaliste'],
  },
];
