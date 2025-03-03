
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ClothingItem {
  id: string;
  name: string;
  category: string;
  color: string;
  imageUrl: string;
}

interface OutfitCreationProps {
  isCreatingOutfit: boolean;
  selectedItemsForOutfit: ClothingItem[];
  newOutfitName: string;
  setNewOutfitName: (name: string) => void;
  setSelectedItemsForOutfit: (items: ClothingItem[]) => void;
  setIsCreatingOutfit: (value: boolean) => void;
  createNewOutfit: () => void;
}

const OutfitCreation = ({
  isCreatingOutfit,
  selectedItemsForOutfit,
  newOutfitName,
  setNewOutfitName,
  setSelectedItemsForOutfit,
  setIsCreatingOutfit,
  createNewOutfit
}: OutfitCreationProps) => {
  if (!isCreatingOutfit) return null;

  return (
    <div className="mb-4 p-3 bg-muted/40 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Create new outfit</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => {
            setIsCreatingOutfit(false);
            setSelectedItemsForOutfit([]);
          }}
        >
          Cancel
        </Button>
      </div>
      <div>
        <Input
          placeholder="Outfit name"
          value={newOutfitName}
          onChange={(e) => setNewOutfitName(e.target.value)}
          className="text-sm mb-2"
        />
        <Button 
          onClick={createNewOutfit}
          disabled={!newOutfitName.trim() || selectedItemsForOutfit.length === 0}
        >
          Save Outfit
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-2 mb-2">
        Select items for your outfit ({selectedItemsForOutfit.length} selected)
      </p>
    </div>
  );
};

export default OutfitCreation;
