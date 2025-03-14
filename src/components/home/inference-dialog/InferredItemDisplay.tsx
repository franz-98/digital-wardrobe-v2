
import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ItemInference } from "../types";
import { translateCategoryToItalian } from "@/components/wardrobe/utils/categoryTranslations";
import { translateColorToItalianFashion } from "@/components/wardrobe/utils/italianColorTranslations";

interface InferredItemDisplayProps {
  item: ItemInference;
  onFieldChange: (field: keyof ItemInference, value: string) => void;
  clothingCategories: string[];
}

const InferredItemDisplay = ({ 
  item, 
  onFieldChange, 
  clothingCategories 
}: InferredItemDisplayProps) => {
  // Generate item name whenever category or color changes
  useEffect(() => {
    if (item && item.category && item.color) {
      const italianCategory = translateCategoryToItalian(item.category);
      const italianColor = translateColorToItalianFashion(item.color);
      
      // Format: "[Category] [Color]" in Italian
      const generatedName = `${italianCategory} ${italianColor}`;
      
      // Always update the name when category or color changes
      onFieldChange('name', generatedName);
    }
  }, [item?.category, item?.color, onFieldChange]);

  // Early return if item is undefined or null
  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4 bg-secondary/10 p-4 rounded-md">
      <h4 className="font-medium">Indumento</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="aspect-square overflow-hidden rounded-md border bg-white">
          <img 
            src={item.imageUrl} 
            alt={item.name || "Item preview"} 
            className="w-full h-full object-contain"
            loading="eager"
          />
        </div>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input 
              id="name"
              value={item.name || ""}
              onChange={(e) => onFieldChange('name', e.target.value)}
              placeholder="Inserisci nome"
              autoFocus={false}
              className="touch-manipulation h-12 mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="category">Categoria</Label>
            <Select 
              value={item.category || ""}
              onValueChange={(value) => onFieldChange('category', value)}
            >
              <SelectTrigger id="category" className="touch-manipulation h-12 mt-1">
                <SelectValue placeholder="Seleziona categoria" />
              </SelectTrigger>
              <SelectContent className="touch-manipulation max-h-[200px]" position="popper" sideOffset={5}>
                <ScrollArea className="h-[200px]">
                  {clothingCategories.map((category) => (
                    <SelectItem 
                      key={category} 
                      value={category}
                      className="py-3 px-4 touch-manipulation text-base cursor-pointer"
                    >
                      {translateCategoryToItalian(category)}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="color">Colore</Label>
            <Input 
              id="color"
              value={item.color || ""}
              onChange={(e) => onFieldChange('color', e.target.value)}
              placeholder="Inserisci colore"
              autoFocus={false}
              className="touch-manipulation h-12 mt-1"
            />
          </div>
          
          {item.confidence > 0 && (
            <div className="mt-3">
              <Badge 
                variant={item.confidence > 0.9 ? "default" : "outline"}
                className={item.confidence > 0.9 ? "bg-green-600" : ""}
              >
                {(item.confidence * 100).toFixed(0)}% sicurezza
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InferredItemDisplay;
