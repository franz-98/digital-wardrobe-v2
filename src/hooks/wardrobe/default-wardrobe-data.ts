
import { ClothingItem, Outfit } from "@/components/wardrobe/types";

export const DEFAULT_CLOTHING_ITEMS: ClothingItem[] = [
  {
    id: "1",
    name: "Blue T-shirt",
    category: "Tops",
    color: "Blue",
    imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop",
    metadata: {
      dateTaken: "2023-03-15",
      brand: "Nike",
      material: "Cotton",
      season: "Spring",
    },
  },
  {
    id: "2",
    name: "Black Jeans",
    category: "Bottoms",
    color: "Black",
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
    metadata: {
      dateTaken: "2023-03-20",
      brand: "Levi's",
      material: "Denim",
      season: "Fall",
    },
  },
  {
    id: "3",
    name: "Red Dress",
    category: "Dresses",
    color: "Red",
    imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop",
    metadata: {
      dateTaken: "2023-03-25",
      brand: "Zara",
      material: "Silk",
      season: "Summer",
    },
  },
  {
    id: "4",
    name: "White Sneakers",
    category: "Shoes",
    color: "White",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    metadata: {
      dateTaken: "2023-03-30",
      brand: "Adidas",
      material: "Leather",
      season: "All",
    },
  },
  {
    id: "5",
    name: "Green Scarf",
    category: "Accessories",
    color: "Green",
    imageUrl: "https://images.unsplash.com/photo-1520903470926-dca555cd44f4?w=400&h=400&fit=crop",
    metadata: {
      dateTaken: "2023-04-05",
      brand: "Gucci",
      material: "Wool",
      season: "Winter",
    },
  },
  {
    id: "6",
    name: "Brown Jacket",
    category: "Outerwear",
    color: "Brown",
    imageUrl: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop",
    metadata: {
      dateTaken: "2023-04-10",
      brand: "The North Face",
      material: "Leather",
      season: "Fall",
    },
  },
  {
    id: "7",
    name: "Yellow Hat",
    category: "Accessories",
    color: "Yellow",
    imageUrl: "https://images.unsplash.com/photo-1533055640609-24b498dfd74c?w=400&h=400&fit=crop",
    metadata: {
      dateTaken: "2023-04-15",
      brand: "Urban Outfitters",
      material: "Cotton",
      season: "Summer",
    },
  },
];

export const createDefaultOutfits = (clothingItems: ClothingItem[]): Outfit[] => {
  return [
    {
      id: "o1",
      name: "Casual Look",
      items: [
        clothingItems.find(item => item.id === "1") || clothingItems[0],
        clothingItems.find(item => item.id === "2") || clothingItems[1]
      ],
      imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=400&fit=crop",
      createdAt: "2023-11-15T10:30:00Z",
      season: "All Seasons"
    },
    {
      id: "o2",
      name: "Summer Dress",
      items: [
        clothingItems.find(item => item.id === "3") || clothingItems[2],
        clothingItems.find(item => item.id === "4") || clothingItems[3]
      ],
      imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=400&fit=crop",
      createdAt: "2023-12-20T14:15:00Z",
      season: "Summer"
    },
    {
      id: "o3",
      name: "Winter Style",
      items: [
        clothingItems.find(item => item.id === "5") || clothingItems[4],
        clothingItems.find(item => item.id === "6") || clothingItems[5]
      ],
      imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
      createdAt: "2024-01-05T09:45:00Z",
      season: "Winter"
    }
  ];
};

export const createDefaultSuggestedOutfits = (clothingItems: ClothingItem[]): Outfit[] => {
  return [
    {
      id: "so1",
      name: "Spring Look",
      items: [
        clothingItems.find(item => item.id === "1") || clothingItems[0],
        clothingItems.find(item => item.id === "4") || clothingItems[3],
        clothingItems.find(item => item.id === "5") || clothingItems[4]
      ],
      imageUrl: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=400&h=400&fit=crop",
      createdAt: "2024-02-10T11:20:00Z",
      season: "Spring"
    },
    {
      id: "so2",
      name: "Party Outfit",
      items: [
        clothingItems.find(item => item.id === "3") || clothingItems[2],
        clothingItems.find(item => item.id === "4") || clothingItems[3]
      ],
      imageUrl: "https://images.unsplash.com/photo-1568252542512-9fe8fe6a8d75?w=400&h=400&fit=crop",
      createdAt: "2024-03-15T18:30:00Z",
      season: "All Seasons"
    },
    {
      id: "so3",
      name: "Autumn Style",
      items: [
        clothingItems.find(item => item.id === "6") || clothingItems[5],
        clothingItems.find(item => item.id === "2") || clothingItems[1],
        clothingItems.find(item => item.id === "7") || clothingItems[6]
      ],
      imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
      createdAt: "2024-04-02T15:10:00Z",
      season: "Fall"
    }
  ];
};
