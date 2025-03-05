
import React from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OutfitHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;  // Added this prop
  showSearchBar: boolean;
  toggleSearchBar: () => void;
  setIsCreatingOutfit: (value: boolean) => void;
  isCreatingOutfit: boolean;
  setActiveTab: (tab: string) => void;
}

const OutfitHeader = ({
  searchTerm,
  setSearchTerm,  // Added this prop
  showSearchBar,
  toggleSearchBar,
  setIsCreatingOutfit,
  isCreatingOutfit,
  setActiveTab
}: OutfitHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className={`flex items-center gap-2 ${showSearchBar ? 'w-full' : ''}`}>
        {showSearchBar && (
          <div className="w-full relative">
            <Input
              id="search"
              placeholder="Search outfits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}  // Use the setSearchTerm prop
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
  );
};

export default OutfitHeader;
