import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Plus, Grip, ListChecks } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

import ClothingItemCard from "@/components/ClothingItemCard";
import ClothingItemDetails from "@/components/ClothingItemDetails";
import OutfitCard from "@/components/OutfitCard";

interface ClothingItem {
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

interface Outfit {
  id: string;
  name: string;
  items: ClothingItem[];
  imageUrl?: string;
}

const WardrobePage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([
    {
      id: "1",
      name: "Blue T-shirt",
      category: "Tops",
      color: "Blue",
      imageUrl: "/images/clothing-items/blue-t-shirt.png",
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
      imageUrl: "/images/clothing-items/black-jeans.png",
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
      imageUrl: "/images/clothing-items/red-dress.png",
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
      imageUrl: "/images/clothing-items/white-sneakers.png",
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
      imageUrl: "/images/clothing-items/green-scarf.png",
      metadata: {
        dateTaken: "2023-04-05",
        brand: "Gucci",
        material: "Wool",
        season: "Winter",
      },
    },
  ]);
  const [outfits, setOutfits] = useState<Outfit[]>([
    {
      id: "o1",
      name: "Casual Look",
      items: [clothingItems[0], clothingItems[1]],
      imageUrl: "/images/outfits/casual-look.png",
    },
    {
      id: "o2",
      name: "Summer Dress",
      items: [clothingItems[2], clothingItems[3]],
      imageUrl: "/images/outfits/summer-dress.png",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("clothing");
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    if (router.query.newItem === "true") {
      toast({
        title: "New item added!",
        description: "Your new clothing item has been successfully added.",
      });
      router.replace("/wardrobe", undefined, { shallow: true });
    }
  }, [router, toast]);

  const handleItemClick = (item: ClothingItem) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  const filteredClothingItems = clothingItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOutfits = outfits.filter((outfit) =>
    outfit.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const findRelatedOutfits = (itemId: string) => {
    return outfits.filter((outfit) =>
      outfit.items.some((item) => item.id === itemId)
    );
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Wardrobe</h1>
        <Button onClick={() => router.push("/add-item")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <Tabs defaultValue="clothing" className="w-full" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="clothing">
            <Grip className="mr-2 h-4 w-4" />
            Clothing
          </TabsTrigger>
          <TabsTrigger value="outfits">
            <ListChecks className="mr-2 h-4 w-4" />
            Outfits
          </TabsTrigger>
        </TabsList>
        <div className="mt-4 flex items-center space-x-2">
          <Label htmlFor="search">Search:</Label>
          <Input
            type="search"
            id="search"
            placeholder={`Search ${activeTab}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <TabsContent value="clothing" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredClothingItems.map((item) => (
              <ClothingItemCard
                key={item.id}
                item={item}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="outfits" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredOutfits.map((outfit) => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedItem && (
        <ClothingItemDetails
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          item={selectedItem}
          relatedOutfits={findRelatedOutfits(selectedItem.id)}
        />
      )}
    </div>
  );
};

export default WardrobePage;
