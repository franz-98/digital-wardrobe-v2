
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClothingItem } from "@/components/wardrobe/types";

interface OutfitCreationPanelProps {
  isCreatingOutfit: boolean;
  selectedItemsForOutfit: ClothingItem[];
  newOutfitName: string;
  setNewOutfitName: (name: string) => void;
  createNewOutfit: () => void;
}

const OutfitCreationPanel = ({
  isCreatingOutfit,
  selectedItemsForOutfit,
  newOutfitName,
  setNewOutfitName,
  createNewOutfit
}: OutfitCreationPanelProps) => {
  if (!isCreatingOutfit || selectedItemsForOutfit.length === 0) return null;

  return (
    <div className="mb-4 p-3 bg-muted/40 rounded-lg">
      <div className="flex gap-2 mb-2">
        <Input
          placeholder="Outfit name"
          value={newOutfitName}
          onChange={(e) => setNewOutfitName(e.target.value)}
          className="text-sm"
        />
        <Button 
          onClick={createNewOutfit}
          disabled={!newOutfitName.trim() || selectedItemsForOutfit.length === 0}
        >
          Save
        </Button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {selectedItemsForOutfit.map((item) => (
          <div key={item.id} className="h-16 w-16 rounded overflow-hidden flex-shrink-0 relative">
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
            <button 
              className="absolute top-0.5 right-0.5 bg-black/60 rounded-full p-0.5"
              onClick={() => setNewOutfitName("")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutfitCreationPanel;
