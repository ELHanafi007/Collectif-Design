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

import categoriesData from "@/data/categories.json";

export const CATEGORIES: Category[] = categoriesData;
