
import React from "react";
import { Grip, Shirt, BarChart } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface WardrobeTabsNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCreatingOutfit?: boolean;
  setIsCreatingOutfit?: (value: boolean) => void;
}

const WardrobeTabsNav = ({ 
  activeTab, 
  setActiveTab,
  isCreatingOutfit = false,
  setIsCreatingOutfit = () => {}
}: WardrobeTabsNavProps) => {
  return (
    <div className="space-y-3">
      <TabsList className="w-full">
        <TabsTrigger 
          value="clothing" 
          className="flex-1"
          onClick={() => setActiveTab("clothing")}
        >
          <Grip className="mr-2 h-4 w-4" />
          Clothing
        </TabsTrigger>
        <TabsTrigger 
          value="outfits" 
          className="flex-1"
          onClick={() => setActiveTab("outfits")}
        >
          <Shirt className="mr-2 h-4 w-4" />
          Outfits
        </TabsTrigger>
        <TabsTrigger 
          value="stats" 
          className="flex-1"
          onClick={() => setActiveTab("stats")}
        >
          <BarChart className="mr-2 h-4 w-4" />
          Stats
        </TabsTrigger>
      </TabsList>

      {activeTab === "clothing" && (
        <div className="flex justify-end">
          <Button 
            onClick={() => setIsCreatingOutfit(!isCreatingOutfit)}
            className={isCreatingOutfit ? "bg-amber-500 hover:bg-amber-600 h-10 px-3 text-xs font-medium rounded-full bg-background border border-border/50 shadow-sm flex items-center" : "h-10 px-3 text-xs font-medium rounded-full bg-background border border-border/50 shadow-sm flex items-center"}
            variant="outline"
            size="sm"
          >
            <Shirt className="h-3.5 w-3.5 mr-1.5 opacity-70" />
            {isCreatingOutfit ? "Cancel" : "Create Outfit"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WardrobeTabsNav;
