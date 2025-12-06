export interface Product {
  id: string;
  title: string;
  category: string;
  rating: number;
  price: number;
  originalPrice?: number; // For deals
  image: string;
  additionalImages?: string[];
  specs: string;
  inStock: boolean;
  isDeal: boolean; // Price Drop
  shoppingMethod: 'online' | 'instore';
  storeLocations?: string[];
  onlineUrl?: string;
  description?: string;
}

export type ViewState = 'wishlist' | 'details' | 'deals';

export type FilterType = 'all' | 'price_drop' | 'in_stock' | 'online' | 'instore';
