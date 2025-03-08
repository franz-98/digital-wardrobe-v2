import React, { useState } from "react";
import ClothingItemCard from "@/components/ClothingItemCard";
import { Shirt, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface ClothingTabProps {
  clothingItems: ClothingItem[];
  searchTerm: string;
  isCreatingOutfit: boolean;
  selectedItemsForOutfit: ClothingItem[];
  toggleItemSelection: (item: ClothingItem) => void;
  handleItemClick: (item: ClothingItem) => void;
  handleDeleteItem: (id: string) => void;
}

type CategorySection = {
  category: string;
  items: ClothingItem[];
  isOpen: boolean;
};

const ClothingTab = ({
  clothingItems,
  searchTerm,
  isCreatingOutfit,
  selectedItemsForOutfit,
  toggleItemSelection,
  handleItemClick,
  handleDeleteItem
}: ClothingTabProps) => {
  
  const filteredClothingItems = clothingItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group items by category
  const groupedItems = React.useMemo(() => {
    const categories: Record<string, ClothingItem[]> = {};
    
    filteredClothingItems.forEach(item => {
      const category = item.category || 'Uncategorized';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(item);
    });
    
    // Convert to array and sort by category name
    return Object.entries(categories)
      .map(([category, items]) => ({
        category,
        items,
        isOpen: true, // Initially all categories are expanded
      }))
      .sort((a, b) => a.category.localeCompare(b.category));
  }, [filteredClothingItems]);

  // State to track which categories are expanded
  const [categorySections, setCategorySections] = useState<CategorySection[]>(groupedItems);

  // Update category sections when groupedItems change
  React.useEffect(() => {
    setCategorySections(prev => {
      // Keep existing open/closed state for categories that still exist
      const newSections = groupedItems.map(newGroup => {
        const existingSection = prev.find(section => section.category === newGroup.category);
        return {
          ...newGroup,
          isOpen: existingSection ? existingSection.isOpen : true
        };
      });
      return newSections;
    });
  }, [groupedItems]);

  // Toggle category expansion
  const toggleCategory = (categoryName: string) => {
    setCategorySections(prev => 
      prev.map(section => 
        section.category === categoryName 
          ? { ...section, isOpen: !section.isOpen } 
          : section
      )
    );
  };

  return (
    <div className="space-y-6 pb-20">
      {categorySections.map(({ category, items, isOpen }) => (
        <div key={category} className="space-y-3">
          <div 
            className="flex items-center justify-between bg-background p-2 rounded-md shadow-sm cursor-pointer"
            onClick={() => toggleCategory(category)}
          >
            <div className="flex items-center gap-2">
              <Shirt className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">{category}</h3>
              <Badge variant="outline" className="ml-2">{items.length}</Badge>
            </div>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          
          {isOpen && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {items.map((item) => (
                <div key={item.id} className="relative">
                  {isCreatingOutfit && (
                    <button 
                      className={`absolute top-2 left-2 z-10 rounded-full p-1 shadow-md ${
                        selectedItemsForOutfit.some(i => i.id === item.id) 
                          ? "bg-primary text-white" 
                          : "bg-white/90"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleItemSelection(item);
                      }}
                    >
                      {selectedItemsForOutfit.some(i => i.id === item.id) ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Shirt className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  )}
                  <ClothingItemCard
                    item={item}
                    onClick={() => isCreatingOutfit ? toggleItemSelection(item) : handleItemClick(item)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {categorySections.length === 0 && (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">No clothing items found matching your search.</p>
        </Card>
      )}
    </div>
  );
};

export default ClothingTab;
