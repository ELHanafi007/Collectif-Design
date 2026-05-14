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

export const PRODUCTS: Product[] = [];
