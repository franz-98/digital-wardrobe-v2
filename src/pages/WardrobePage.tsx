
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

interface ClothingItem {
  id: string;
  name: string;
  category: string;
  color: string;
  imageUrl: string;
}

interface Outfit {
  id: string;
  name: string;
  items: ClothingItem[];
}

interface Stats {
  colors: { name: string; value: number; color: string }[];
  mostUsed: { name: string; uses: number }[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#FF6663"];

const WardrobePage = () => {
  const [timeFilter, setTimeFilter] = useState("month");

  // Fetch clothing items
  const { data: clothingItems, isLoading: isLoadingClothes } = useQuery({
    queryKey: ["clothes"],
    queryFn: async () => {
      // Simulating API call
      const response = await fetch("/api/clothes");
      if (!response.ok) throw new Error("Failed to fetch clothes");
      return response.json() as Promise<ClothingItem[]>;
    },
    placeholderData: [
      {
        id: "1",
        name: "Blue T-Shirt",
        category: "Tops",
        color: "Blue",
        imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3",
      },
      {
        id: "2",
        name: "Black Jeans",
        category: "Bottoms",
        color: "Black",
        imageUrl: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3",
      },
      {
        id: "3",
        name: "White Sneakers",
        category: "Footwear",
        color: "White",
        imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3",
      },
      {
        id: "4",
        name: "Red Sweater",
        category: "Tops",
        color: "Red",
        imageUrl: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-4.0.3",
      },
      {
        id: "5",
        name: "Gray Hoodie",
        category: "Tops",
        color: "Gray",
        imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3",
      },
      {
        id: "6",
        name: "Brown Boots",
        category: "Footwear",
        color: "Brown",
        imageUrl: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3",
      },
    ],
  });

  // Fetch suggested outfits
  const { data: outfits, isLoading: isLoadingOutfits } = useQuery({
    queryKey: ["outfits"],
    queryFn: async () => {
      // Simulating API call
      const response = await fetch("/api/outfits");
      if (!response.ok) throw new Error("Failed to fetch outfits");
      return response.json() as Promise<Outfit[]>;
    },
    placeholderData: [
      {
        id: "1",
        name: "Casual Friday",
        items: [
          {
            id: "1",
            name: "Blue T-Shirt",
            category: "Tops",
            color: "Blue",
            imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3",
          },
          {
            id: "2",
            name: "Black Jeans",
            category: "Bottoms",
            color: "Black",
            imageUrl: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3",
          },
          {
            id: "6",
            name: "Brown Boots",
            category: "Footwear",
            color: "Brown",
            imageUrl: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3",
          },
        ],
      },
      {
        id: "2",
        name: "Weekend Hangout",
        items: [
          {
            id: "5",
            name: "Gray Hoodie",
            category: "Tops",
            color: "Gray",
            imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3",
          },
          {
            id: "2",
            name: "Black Jeans",
            category: "Bottoms",
            color: "Black",
            imageUrl: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3",
          },
          {
            id: "3",
            name: "White Sneakers",
            category: "Footwear",
            color: "White",
            imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3",
          },
        ],
      },
    ],
  });

  // Fetch stats with time filter
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["stats", timeFilter],
    queryFn: async () => {
      // Simulating API call
      const response = await fetch(`/api/stats?time=${timeFilter}`);
      if (!response.ok) throw new Error("Failed to fetch stats");
      return response.json() as Promise<Stats>;
    },
    placeholderData: {
      colors: [
        { name: "Blue", value: 30, color: "#0088FE" },
        { name: "Black", value: 25, color: "#000000" },
        { name: "White", value: 15, color: "#FFFFFF" },
        { name: "Red", value: 10, color: "#FF8042" },
        { name: "Gray", value: 10, color: "#8884D8" },
        { name: "Brown", value: 10, color: "#A52A2A" },
      ],
      mostUsed: [
        { name: "Blue T-Shirt", uses: 12 },
        { name: "Black Jeans", uses: 10 },
        { name: "White Sneakers", uses: 8 },
        { name: "Gray Hoodie", uses: 6 },
        { name: "Red Sweater", uses: 4 },
      ],
    },
  });

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="flex items-center justify-between mb-6">
        <div>
          <div className="inline-block mb-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-xs font-medium">
            All Items
          </div>
          <h1 className="text-3xl font-bold">My Wardrobe</h1>
        </div>
      </header>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Clothing Items</h2>
        </div>

        {isLoadingClothes ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {clothingItems?.map((item) => (
              <ClothingItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Suggested Outfits</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            See All
          </Button>
        </div>

        {isLoadingOutfits ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex space-x-6">
              {outfits?.map((outfit) => (
                <OutfitCard key={outfit.id} outfit={outfit} />
              ))}
            </div>
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Wardrobe Stats</h2>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground mr-2">Time Period:</span>
            <Select
              value={timeFilter}
              onValueChange={(value) => setTimeFilter(value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoadingStats ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Color Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats?.colors}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stats?.colors.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Most Used Items</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats?.mostUsed}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis type="number" />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={100}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Bar dataKey="uses" fill="#007AFF" barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        )}
      </section>
    </div>
  );
};

const ClothingItemCard = ({ item }: { item: ClothingItem }) => {
  return (
    <Card className="overflow-hidden interactive-scale card-shadow border">
      <div className="aspect-square overflow-hidden bg-secondary/30">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <p className="font-medium text-sm truncate">{item.name}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-muted-foreground">{item.category}</span>
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: item.color.toLowerCase() === "white" ? "#EEEEEE" : item.color }}
          />
        </div>
      </div>
    </Card>
  );
};

const OutfitCard = ({ outfit }: { outfit: Outfit }) => {
  return (
    <Card className="min-w-[280px] overflow-hidden card-shadow border interactive-scale">
      <div className="p-4">
        <h3 className="font-medium mb-2">{outfit.name}</h3>
        <div className="flex space-x-2 mb-3">
          {outfit.items.map((item) => (
            <div 
              key={item.id} 
              className="w-8 h-8 rounded-full overflow-hidden border border-border"
            >
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {outfit.items.map((item) => (
            <div key={item.id} className="aspect-square overflow-hidden rounded-lg bg-secondary/30">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default WardrobePage;
