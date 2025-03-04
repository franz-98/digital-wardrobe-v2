
import React from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import OutfitCard from "@/components/OutfitCard";

interface ClothingItem {
  id: string;
  name: string;
  category: string;
  color: string;
  imageUrl: string;
}

interface Outfit {
  id: string;
  name: string;
  items: ClothingItem[];
  imageUrl?: string;
}

interface OutfitTabProps {
  outfits: Outfit[];
  suggestedOutfits: Outfit[];
  searchTerm: string;
  isPremium: boolean;
  isCreatingOutfit: boolean;
  selectedItemsForOutfit: ClothingItem[];
  newOutfitName: string;
  setNewOutfitName: (name: string) => void;
  setIsCreatingOutfit: (value: boolean) => void;
  setActiveTab: (tab: string) => void;
  createNewOutfit: () => void;
  handleOutfitClick: (outfit: Outfit) => void;
  togglePremium: () => void;
  showSearchBar: boolean;
  toggleSearchBar: () => void;
}

const OutfitTab = ({
  outfits,
  suggestedOutfits,
  searchTerm,
  isPremium,
  isCreatingOutfit,
  selectedItemsForOutfit,
  newOutfitName,
  setNewOutfitName,
  setIsCreatingOutfit,
  setActiveTab,
  createNewOutfit,
  handleOutfitClick,
  togglePremium,
  showSearchBar,
  toggleSearchBar
}: OutfitTabProps) => {
  
  const filteredOutfits = outfits.filter((outfit) =>
    outfit.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center gap-2 ${showSearchBar ? 'w-full' : ''}`}>
          {!showSearchBar ? (
            <Button 
              variant="ghost"
              size="icon"
              onClick={toggleSearchBar}
              className="h-10 w-10"
            >
              <Search className="h-5 w-5" />
            </Button>
          ) : (
            <div className="w-full relative">
              <Input
                id="search"
                placeholder="Search outfits..."
                value={searchTerm}
                className="w-full pl-9 pr-8"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSearchBar}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 h-8 w-8"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Button>
            </div>
          )}
        </div>
        
        {!showSearchBar && (
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="h-10"
              onClick={() => {
                setIsCreatingOutfit(!isCreatingOutfit);
                setActiveTab("clothing");
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Outfit
            </Button>
          </div>
        )}
      </div>
      
      {isCreatingOutfit && selectedItemsForOutfit.length > 0 && (
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
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredOutfits.map((outfit) => (
          <OutfitCard 
            key={outfit.id} 
            outfit={outfit} 
            onClick={() => handleOutfitClick(outfit)}
          />
        ))}
      </div>
      
      {isPremium && (
        <>
          <div className="flex items-center justify-between mt-8 mb-4">
            <h3 className="font-medium">Suggested Outfits</h3>
            <Badge variant="outline" className="text-xs py-0 h-5">
              <span className="text-primary mr-1">Premium</span>
            </Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {suggestedOutfits.map((outfit) => (
              <OutfitCard 
                key={outfit.id} 
                outfit={outfit} 
                onClick={() => handleOutfitClick(outfit)}
              />
            ))}
          </div>
        </>
      )}
      
      {!isPremium && (
        <div className="mt-8 p-4 border rounded-lg bg-muted/20 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h3 className="font-medium mb-1">Unlock Suggested Outfits</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Get personalized outfit suggestions based on your style and wardrobe.
          </p>
          <Button size="sm" onClick={togglePremium}>
            Upgrade to Premium
          </Button>
        </div>
      )}
    </>
  );
};

export default OutfitTab;
