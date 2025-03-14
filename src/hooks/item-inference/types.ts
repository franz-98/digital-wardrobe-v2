
import { ClothingItem as WardrobeClothingItem } from "@/components/wardrobe/types";

export interface ItemInference {
  id: string;
  name: string;
  category: string;
  color: string; // Making color required to match the component's ItemInference type
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

// Adding storage keys for localStorage
export const STORAGE_KEYS = {
  CLOTHING_ITEMS: "wardrobeApp_clothingItems",
  OUTFITS: "wardrobeApp_outfits",
  RECENT_UPLOADS: "wardrobeApp_recentUploads"
};

// Default recent uploads to use when none are in localStorage
export const DEFAULT_RECENT_UPLOADS: RecentUpload[] = [
  {
    id: "recent-1",
    name: "Camicia Blu",
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop",
    category: "Shirt",
    createdAt: new Date().toISOString()
  },
  {
    id: "recent-2",
    name: "Pantaloni Neri",
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop",
    category: "Pants",
    createdAt: new Date().toISOString()
  }
];

// Renaming the import to avoid conflict
export type ClothingItem = WardrobeClothingItem;
