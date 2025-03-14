
import { ClothingItem } from "@/components/wardrobe/types";

export interface ItemInference {
  id: string;
  name: string;
  category: string;
  color?: string;
  imageUrl: string;
  confidence: number;
  outfitId?: string; // Added outfitId to track which items belong to the same outfit
}

export interface RecentUpload {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  outfitId?: string; // Added outfitId to track which items belong to the same outfit
}

export const DEFAULT_INFERRED_ITEMS: ItemInference[] = [
  {
    id: "inferred-1",
    name: "Black T-Shirt",
    category: "Tops",
    color: "Black",
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop",
    confidence: 0.92
  },
  {
    id: "inferred-2",
    name: "Blue Jeans",
    category: "Bottoms",
    color: "Blue",
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop",
    confidence: 0.89
  }
];

export type ClothingItem = ClothingItem;
