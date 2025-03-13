
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
    if (item.category && item.color) {
      const italianCategory = translateCategoryToItalian(item.category);
      const italianColor = translateColorToItalianFashion(item.color);
      
      // Format: "[Category] [Color]" in Italian
      const generatedName = `${italianCategory} ${italianColor}`;
      
      // Only update if the name is empty or matches a previous auto-generated format
      const shouldUpdateName = !item.name || 
        (item.name.includes(translateCategoryToItalian(item.category)) || 
         clothingCategories.some(cat => item.name.includes(translateCategoryToItalian(cat))));
      
      if (shouldUpdateName) {
        onFieldChange('name', generatedName);
      }
    }
  }, [item.category, item.color, onFieldChange, clothingCategories, item.name]);

  return (
    <div className="space-y-2 bg-secondary/10 p-3 rounded-md">
      <h4 className="font-medium">Indumento</h4>
      <div className="grid grid-cols-2 gap-3">
        <div className="aspect-square overflow-hidden rounded-md">
          <img 
            src={item.imageUrl} 
            alt={item.name || "Item preview"} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-2">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input 
              id="name"
              value={item.name}
              onChange={(e) => onFieldChange('name', e.target.value)}
              placeholder="Inserisci nome"
              autoFocus={false}
            />
          </div>
          
          <div>
            <Label htmlFor="category">Categoria</Label>
            <Select 
              value={item.category}
              onValueChange={(value) => onFieldChange('category', value)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Seleziona categoria" />
              </SelectTrigger>
              <SelectContent>
                {clothingCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {translateCategoryToItalian(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="color">Colore</Label>
            <Input 
              id="color"
              value={item.color}
              onChange={(e) => onFieldChange('color', e.target.value)}
              placeholder="Inserisci colore"
              autoFocus={false}
            />
          </div>
        </div>
      </div>
      
      {item.confidence > 0 && (
        <div className="mt-2 flex justify-end">
          <Badge 
            variant={item.confidence > 0.9 ? "default" : "outline"}
            className={item.confidence > 0.9 ? "bg-green-600" : ""}
          >
            {(item.confidence * 100).toFixed(0)}% sicurezza
          </Badge>
        </div>
      )}
    </div>
  );
};

export default InferredItemDisplay;
