
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { EditableTitle } from "@/components/ui/editable-title";
import { useWardrobe } from "@/context/WardrobeContext";
import { colorNameToHex } from "@/components/wardrobe/utils/colorUtils";
import { ClothingItem } from "@/components/wardrobe/types";
import { translateCategoryToItalian } from "@/components/wardrobe/utils/categoryTranslations";

interface ItemBasicDetailsProps {
  item: ClothingItem;
}

const ItemBasicDetails = ({ item }: ItemBasicDetailsProps) => {
  const { updateItemMetadata } = useWardrobe();
  const [localBrand, setLocalBrand] = useState(item.metadata?.brand || "Add brand");
  
  // Update local state when item prop changes
  useEffect(() => {
    setLocalBrand(item.metadata?.brand || "Add brand");
  }, [item]);
  
  const handleBrandUpdate = (newBrand: string) => {
    console.log("Updating brand to:", newBrand);
    const success = updateItemMetadata(item.id, "brand", newBrand);
    if (success) {
      // Update local state immediately for UI responsiveness
      setLocalBrand(newBrand);
    }
    return success;
  };

  const colorHex = colorNameToHex(item.color);
  const translatedCategory = translateCategoryToItalian(item.category);
  
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h3 className="text-sm font-medium mb-1">Details</h3>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Category:</span>
            <Badge variant="outline" className="text-xs">
              {translatedCategory}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Color:</span>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-1 cursor-pointer">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ 
                      backgroundColor: item.color.toLowerCase() === "white" ? "#EEEEEE" : item.color,
                      border: item.color.toLowerCase() === "white" ? "1px solid #DDDDDD" : "none"
                    }}
                  />
                  <span className="text-xs">{item.color}</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <div className="space-y-1">
                  <p className="text-xs font-medium">{item.color}</p>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full border border-border/50"
                      style={{ backgroundColor: colorHex }}
                    />
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">{colorHex}</code>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Brand:</span>
            <EditableTitle
              title={localBrand}
              titleClassName="text-xs"
              className="justify-end"
              onSave={handleBrandUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemBasicDetails;
