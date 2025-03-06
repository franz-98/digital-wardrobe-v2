
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Save } from "lucide-react";

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

  const removeItem = (itemId: string) => {
    setSelectedItemsForOutfit(selectedItemsForOutfit.filter(item => item.id !== itemId));
  };

  return (
    <div className="mb-6 p-4 bg-muted/40 rounded-lg border border-border animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Create New Outfit</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => {
            setIsCreatingOutfit(false);
            setSelectedItemsForOutfit([]);
          }}
        >
          <X className="mr-1 h-4 w-4" />
          Cancel
        </Button>
      </div>
      
      <div className="flex flex-col space-y-4">
        <div className="flex gap-3">
          <Input
            placeholder="Name your outfit"
            value={newOutfitName}
            onChange={(e) => setNewOutfitName(e.target.value)}
            className="text-sm flex-grow"
          />
          <Button 
            onClick={createNewOutfit}
            disabled={!newOutfitName.trim() || selectedItemsForOutfit.length === 0}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Outfit
          </Button>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Selected items ({selectedItemsForOutfit.length})
          </p>
          
          {selectedItemsForOutfit.length > 0 ? (
            <div className="flex gap-2 overflow-x-auto pb-2 pt-1">
              {selectedItemsForOutfit.map((item) => (
                <div key={item.id} className="h-20 w-20 rounded overflow-hidden flex-shrink-0 relative group border border-border">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button 
                      className="bg-red-500 rounded-full p-1"
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-0.5">
                    <p className="text-white text-xs truncate">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-muted-foreground">Select items from your wardrobe below</p>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Tip: Click on clothing items below to add them to your outfit
      </p>
    </div>
  );
};

export default OutfitCreation;
