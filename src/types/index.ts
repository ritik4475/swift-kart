export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  sort_order: number;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  mrp: number | null;
  unit: string;
  image_url: string | null;
  stock: number;
  rating: number;
  is_popular: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
