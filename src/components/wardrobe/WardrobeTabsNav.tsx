
import React from "react";
import { Grip, Shirt, BarChart } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WardrobeTabsNavProps {
  activeTab: string;
}

const WardrobeTabsNav = ({ activeTab }: WardrobeTabsNavProps) => {
  return (
    <TabsList className="w-full">
      <TabsTrigger value="clothing" className="flex-1">
        <Grip className="mr-2 h-4 w-4" />
        Clothing
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
  );
};

export default WardrobeTabsNav;
