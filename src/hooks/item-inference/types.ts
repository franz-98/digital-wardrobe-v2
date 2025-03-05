
import { RecentUpload, ItemInference } from "@/components/home/types";
import { ClothingItem } from "@/components/wardrobe/types";

// Re-export types that are used in this feature
export type { RecentUpload, ItemInference, ClothingItem };

// Constants for local storage keys
export const STORAGE_KEYS = {
  RECENT_UPLOADS: 'recentUploadItems',
};

// Default data for initial state
export const DEFAULT_INFERRED_ITEMS: ItemInference[] = [
  {
    id: "inferred-1",
    name: "Blue T-Shirt",
    category: "Tops",
    color: "Blue",
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3",
    confidence: 0.92
  },
  {
    id: "inferred-2",
    name: "Black Jeans",
    category: "Bottoms",
    color: "Black",
    imageUrl: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3",
    confidence: 0.88
  }
];

// Default data for initial uploads state
export const DEFAULT_RECENT_UPLOADS: RecentUpload[] = [
  {
    id: "1",
    name: "Blue T-Shirt",
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3",
    category: "Tops",
    createdAt: "2023-11-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Black Jeans",
    imageUrl: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3",
    category: "Bottoms",
    createdAt: "2023-11-02T00:00:00Z",
  },
  {
    id: "3",
    name: "White Sneakers",
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3",
    category: "Footwear",
    createdAt: "2023-11-03T00:00:00Z",
  },
];
