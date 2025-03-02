import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Loader2, 
  ChevronDown, 
  Lock, 
  BarChart, 
  PieChart as PieChartIcon,
  Package,
  Shirt,
  Settings,
  Calendar as CalendarIcon,
  Calendar,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Sector
} from "recharts";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import ClothingItemDetails from "@/components/ClothingItemDetails";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

// Move interfaces outside component to avoid recreation on each render
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

interface Stats {
  colors: { name: string; value: number; color: string }[];
  mostUsed: { name: string; uses: number; id: string }[];
}

interface UserStatus {
  isPremium: boolean;
  name: string;
}

const COLORS = ["#9b87f5", "#7E69AB", "#6E59A5", "#D6BCFA", "#0EA5E9", "#33C3F0"];

const WardrobePage = () => {
  const [timeFilter, setTimeFilter] = useState("month");
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("items");
  const [showAdvancedDateFilter, setShowAdvancedDateFilter] = useState(false);
  const [customDateRange, setCustomDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [activeColorIndex, setActiveColorIndex] = useState<number | undefined>(undefined);
  const [selectedStatItem, setSelectedStatItem] = useState<string | null>(null);

  // Fetch user status
  const { data: userStatus, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        isPremium: true, // Set to true to see premium features
        name: "John Doe",
      } as UserStatus;
    },
    staleTime: 60000, // 1 minute
  });

  const popoverRef = useRef<HTMLDivElement>(null);
  
  // Close time filter popover when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (showAdvancedDateFilter) {
        setShowAdvancedDateFilter(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAdvancedDateFilter]);

  // Fetch clothing items
  const { data: clothingItems, isLoading: isLoadingClothes } = useQuery({
    queryKey: ["clothes"],
    queryFn: async () => {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 300)); 
      return [
        {
          id: "1",
          name: "Blue T-Shirt",
          category: "Tops",
          color: "Blue",
          imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3",
          metadata: {
            dateTaken: "2023-05-15T10:30:00Z",
            brand: "Nike",
            material: "Cotton",
            season: "Summer",
          }
        },
        {
          id: "2",
          name: "Black Jeans",
          category: "Bottoms",
          color: "Black",
          imageUrl: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3",
          metadata: {
            dateTaken: "2023-06-20T14:15:00Z",
            brand: "Levi's",
            material: "Denim",
            season: "All Season",
          }
        },
        {
          id: "3",
          name: "White Sneakers",
          category: "Footwear",
          color: "White",
          imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3",
          metadata: {
            dateTaken: "2023-04-10T09:45:00Z",
            brand: "Adidas",
            material: "Leather",
            season: "All Season",
          }
        },
        {
          id: "4",
          name: "Red Sweater",
          category: "Tops",
          color: "Red",
          imageUrl: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-4.0.3",
          metadata: {
            dateTaken: "2023-02-05T11:20:00Z",
            brand: "H&M",
            material: "Wool",
            season: "Winter",
          }
        },
        {
          id: "5",
          name: "Gray Hoodie",
          category: "Tops",
          color: "Gray",
          imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3",
          metadata: {
            dateTaken: "2023-03-18T15:30:00Z",
            brand: "GAP",
            material: "Cotton Blend",
            season: "Fall",
          }
        },
        {
          id: "6",
          name: "Brown Boots",
          category: "Footwear",
          color: "Brown",
          imageUrl: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3",
          metadata: {
            dateTaken: "2023-01-25T13:40:00Z",
            brand: "Timberland",
            material: "Leather",
            season: "Winter",
          }
        },
      ] as ClothingItem[];
    },
    staleTime: 60000, // 1 minute
  });

  // Fetch my outfits with memoization to prevent unnecessary rerenders
  const { data: myOutfits, isLoading: isLoadingMyOutfits } = useQuery({
    queryKey: ["my-outfits"],
    queryFn: async () => {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 300));
      return [
        {
          id: "1",
          name: "Casual Friday",
          imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
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
          imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
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
        {
          id: "3",
          name: "Office Look",
          imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
          items: [
            {
              id: "4",
              name: "Red Sweater",
              category: "Tops",
              color: "Red",
              imageUrl: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-4.0.3",
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
      ] as Outfit[];
    },
    staleTime: 60000, // 1 minute
  });

  // Fetch suggested outfits with conditional fetching
  const { data: suggestedOutfits, isLoading: isLoadingSuggestedOutfits } = useQuery({
    queryKey: ["suggested-outfits"],
    queryFn: async () => {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 300));
      return [
        {
          id: "1",
          name: "Business Casual",
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
          name: "Summer Look",
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
              id: "3",
              name: "White Sneakers",
              category: "Footwear",
              color: "White",
              imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3",
            },
          ],
        },
      ] as Outfit[];
    },
    enabled: !!userStatus?.isPremium,
    staleTime: 60000, // 1 minute
  });

  // Fetch stats with time filter with memoization
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["stats", timeFilter, customDateRange.from, customDateRange.to],
    queryFn: async () => {
      // Simulating API call with time filter and custom date range
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        colors: [
          { name: "Blue", value: 30, color: "#0EA5E9" },
          { name: "Black", value: 25, color: "#1e1e1e" },
          { name: "White", value: 15, color: "#f5f5f5" },
          { name: "Red", value: 10, color: "#f43f5e" },
          { name: "Gray", value: 10, color: "#8E9196" },
          { name: "Brown", value: 10, color: "#A52A2A" },
        ],
        mostUsed: [
          { name: "Blue T-Shirt", uses: 12, id: "1" },
          { name: "Black Jeans", uses: 10, id: "2" },
          { name: "White Sneakers", uses: 8, id: "3" },
          { name: "Gray Hoodie", uses: 6, id: "5" },
          { name: "Red Sweater", uses: 4, id: "4" },
        ],
        outfitsByCategory: [
          { name: "Casual", count: 8 },
          { name: "Formal", count: 5 },
          { name: "Sport", count: 3 },
          { name: "Evening", count: 2 },
        ],
        seasonalUsage: [
          { name: "Winter", count: 15 },
          { name: "Spring", count: 12 },
          { name: "Summer", count: 20 },
          { name: "Fall", count: 10 },
        ],
        mostPopularOutfits: [
          { name: "Casual Friday", uses: 8, id: "1" },
          { name: "Weekend Hangout", uses: 6, id: "2" },
          { name: "Office Look", uses: 5, id: "3" },
        ]
      };
    },
    staleTime: 60000, // 1 minute
  });

  // Active PieChart Cell Renderer
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  
    return (
      <g>
        <text x={cx} y={cy} dy={-20} textAnchor="middle" fill="#333" className="text-sm font-medium">
          {payload.name}
        </text>
        <text x={cx} y={cy} textAnchor="middle" fill="#333" className="text-xs">
          {`${value} items`}
        </text>
        <text x={cx} y={cy} dy={20} textAnchor="middle" fill="#999" className="text-xs">
          {`(${(percent * 100).toFixed(0)}%)`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          stroke={payload.name.toLowerCase() === "white" ? "#000000" : fill}
          strokeWidth={payload.name.toLowerCase() === "white" ? 1 : 0}
        />
      </g>
    );
  };

  // Memoize the related outfits calculation to prevent rerenders
  const findRelatedOutfits = useCallback((itemId: string) => {
    const allOutfits = [...(myOutfits || []), ...(suggestedOutfits || [])];
    return allOutfits.filter(outfit => 
      outfit.items.some(item => item.id === itemId)
    );
  }, [myOutfits, suggestedOutfits]);

  const handleItemClick = (item: ClothingItem) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  const handleBarClick = (data: any) => {
    // Find the item by name from the most used stats
    if (!clothingItems) return;
    
    const itemId = data.id;
    const item = clothingItems.find(i => i.id === itemId);
    
    if (item) {
      setSelectedItem(item);
      setIsDetailsOpen(true);
      setSelectedStatItem(itemId);
    }
  };

  const handlePieClick = (_: any, index: number) => {
    setActiveColorIndex(index === activeColorIndex ? undefined : index);
  };

  // Format date range for display
  const formatDateRange = useMemo(() => {
    if (customDateRange.from && customDateRange.to) {
      return `${format(customDateRange.from, 'PP')} - ${format(customDateRange.to, 'PP')}`;
    }
    return timeFilter === "custom" ? "Seleziona intervallo" : timeFilter;
  }, [customDateRange, timeFilter]);

  if (isLoadingUser) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <header className="flex items-center justify-between mb-6">
        <div>
          <div className="inline-block mb-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-xs font-medium">
            My Collection
          </div>
          <h1 className="text-3xl font-bold">My Wardrobe</h1>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full bg-background border">
          <TabsTrigger value="items" className="flex-1">
            <Package className="mr-2 h-4 w-4" />
            Items
          </TabsTrigger>
          <TabsTrigger value="outfits" className="flex-1">
            <Shirt className="mr-2 h-4 w-4" />
            Outfits
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex-1">
            <BarChart className="mr-2 h-4 w-4" />
            Stats
          </TabsTrigger>
        </TabsList>

        {/* Items tab content */}
        <TabsContent value="items" className="space-y-6">
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
                <ClothingItemCard 
                  key={`item-${item.id}`}
                  item={item} 
                  onClick={() => handleItemClick(item)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Outfits tab content */}
        <TabsContent value="outfits" className="space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">My Outfits</h2>
              <Button variant="ghost" size="sm" className="text-primary">
                See All
              </Button>
            </div>

            {isLoadingMyOutfits ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {myOutfits?.map((outfit) => (
                  <OutfitCard key={`my-outfit-${outfit.id}`} outfit={outfit} />
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                Suggested Outfits
                {!userStatus?.isPremium && (
                  <Lock className="h-4 w-4 ml-2 text-muted-foreground" />
                )}
              </h2>
              <Button variant="ghost" size="sm" className="text-primary">
                See All
              </Button>
            </div>

            {!userStatus?.isPremium ? (
              <div className="bg-secondary/30 rounded-lg p-6 text-center">
                <Lock className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-1">Premium Feature</h3>
                <p className="text-muted-foreground mb-4">
                  Upgrade to premium to get personalized outfit suggestions based on your wardrobe.
                </p>
                <Button size="sm">Upgrade to Premium</Button>
              </div>
            ) : isLoadingSuggestedOutfits ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestedOutfits?.map((outfit) => (
                  <OutfitCard key={`suggested-outfit-${outfit.id}`} outfit={outfit} />
                ))}
              </div>
            )}
          </section>
        </TabsContent>

        {/* Stats tab content - updated with more analytics */}
        <TabsContent value="stats" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Wardrobe Insights</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-1">Periodo:</span>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1 h-8 px-3"
                  >
                    <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                    <span className="capitalize">{formatDateRange}</span>
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end" ref={popoverRef}>
                  <div className="p-3 border-b">
                    <div className="space-y-2">
                      <RadioOption 
                        value="week" 
                        currentValue={timeFilter}
                        onChange={(value) => {
                          setTimeFilter(value);
                          setShowAdvancedDateFilter(false);
                        }}
                        label="Questa settimana" 
                      />
                      <RadioOption 
                        value="month" 
                        currentValue={timeFilter}
                        onChange={(value) => {
                          setTimeFilter(value);
                          setShowAdvancedDateFilter(false);
                        }}
                        label="Questo mese" 
                      />
                      <RadioOption 
                        value="year" 
                        currentValue={timeFilter}
                        onChange={(value) => {
                          setTimeFilter(value);
                          setShowAdvancedDateFilter(false);
                        }}
                        label="Quest'anno" 
                      />
                      <div className="pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start"
                          onClick={() => setShowAdvancedDateFilter(!showAdvancedDateFilter)}
                        >
                          Avanzate
                          <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${showAdvancedDateFilter ? 'rotate-180' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {showAdvancedDateFilter && (
                    <div className="p-3 border-t">
                      <div className="space-y-3">
                        <p className="text-sm font-medium">Intervallo personalizzato</p>
                        <div className="flex gap-2">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Da</p>
                            <CalendarComponent
                              mode="single"
                              selected={customDateRange.from}
                              onSelect={(date) => setCustomDateRange(prev => ({ ...prev, from: date }))}
                              disabled={(date) => 
                                date > new Date() || 
                                (customDateRange.to ? date > customDateRange.to : false)
                              }
                              initialFocus
                            />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">A</p>
                            <CalendarComponent
                              mode="single"
                              selected={customDateRange.to}
                              onSelect={(date) => setCustomDateRange(prev => ({ ...prev, to: date }))}
                              disabled={(date) => 
                                date > new Date() || 
                                (customDateRange.from ? date < customDateRange.from : false)
                              }
                              initialFocus
                            />
                          </div>
                        </div>
                        <Button 
                          className="w-full"
                          disabled={!customDateRange.from || !customDateRange.to}
                          onClick={() => {
                            setTimeFilter("custom");
                            toast({
                              title: "Intervallo personalizzato applicato",
                              description: `Dal ${customDateRange.from ? format(customDateRange.from, 'PP') : ''} al ${customDateRange.to ? format(customDateRange.to, 'PP') : ''}`,
                            });
                          }}
                        >
                          Applica intervallo
                        </Button>
                      </div>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {isLoadingStats ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Color distribution chart - with fixed black outline for white */}
              <Card className="p-6 shadow-md border">
                <div className="flex items-center mb-4">
                  <PieChartIcon className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="text-lg font-medium">Colori nel tuo guardaroba</h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats?.colors}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        activeIndex={activeColorIndex}
                        activeShape={renderActiveShape}
                        onClick={handlePieClick}
                      >
                        {stats?.colors.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
                            stroke={entry.name.toLowerCase() === "white" ? "#000000" : entry.color}
                            strokeWidth={entry.name.toLowerCase() === "white" ? 1 : 0}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} items`, 'Quantity']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {stats?.colors.map((color, index) => (
                    <Badge 
                      key={`badge-${index}`}
                      variant="outline" 
                      style={{ 
                        backgroundColor: color.color, 
                        color: color.name.toLowerCase() === "white" ? "#333" : "white",
                        border: color.name.toLowerCase() === "white" ? "1px solid #000000" : "none"
                      }}
                      className={`shadow-sm cursor-pointer ${activeColorIndex === index ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => handlePieClick(null, index)}
                    >
                      {color.name}: {color.value} items
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Most used items chart - interactive */}
              <Card className="p-6 shadow-md border">
                <div className="flex items-center mb-4">
                  <BarChart className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="text-lg font-medium">Indumenti più utilizzati</h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
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
                      <Tooltip formatter={(value) => [`${value} volte utilizzato`, 'Utilizzo']} />
                      <Bar 
                        dataKey="uses" 
                        fill="#9b87f5" 
                        barSize={20} 
                        radius={[0, 4,
