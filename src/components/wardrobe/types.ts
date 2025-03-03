
export interface ClothingItem {
  id: string;
  name: string;
  category: string;
  color: string;
  imageUrl: string;
  metadata?: {
    dateTaken?: string;
    brand?: string;
    material?: string;
    season?: string;
  };
}

export interface Outfit {
  id: string;
  name: string;
  items: ClothingItem[];
  imageUrl?: string;
}
