
import React from "react";
import { ChevronLeft, X } from "lucide-react";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditableTitle } from "@/components/ui/editable-title";
import { useWardrobe } from "@/context/WardrobeContext";

interface OutfitHeaderProps {
  outfitName: string;
  outfitId: string;
  itemCount: number;
  dismissProgress?: number;
  onBackClick: () => void;
}

const OutfitHeader = ({ 
  outfitName, 
  outfitId, 
  itemCount, 
  dismissProgress = 0, 
  onBackClick 
}: OutfitHeaderProps) => {
  const { updateOutfitName } = useWardrobe();

  const handleNameUpdate = (newName: string) => {
    return updateOutfitName(outfitId, newName);
  };

  return (
    <div className="px-4 pt-4 pb-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2 h-8 w-8" 
            onClick={onBackClick}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <EditableTitle 
            title={outfitName} 
            titleClassName="text-lg font-semibold"
            onSave={handleNameUpdate}
          />
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={onBackClick}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <DialogDescription>
        <Badge variant="outline" className="bg-primary/10 text-primary">
          {itemCount} items
        </Badge>
        {dismissProgress > 0 && dismissProgress < 60 && (
          <span className="ml-2 text-xs opacity-60">
            Pull down to close ({Math.round(dismissProgress)}%)
          </span>
        )}
      </DialogDescription>
    </div>
  );
};

export default OutfitHeader;
