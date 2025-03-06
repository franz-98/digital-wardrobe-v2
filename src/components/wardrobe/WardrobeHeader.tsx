
import React from "react";
import { Plus, Search, Shirt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WardrobeHeaderProps {
  activeTab?: string;
  showSearchBar?: boolean;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  toggleSearchBar?: () => void;
  setIsCreatingOutfit?: (value: boolean) => void;
  isCreatingOutfit?: boolean;
}

const WardrobeHeader = ({ 
  activeTab,
  showSearchBar = false,
  searchTerm = "",
  setSearchTerm = () => {},
  toggleSearchBar = () => {},
  setIsCreatingOutfit = () => {},
  isCreatingOutfit = false
}: WardrobeHeaderProps) => {
  const navigate = useNavigate();
  
  // If we have searchBar props, show the search interface
  if (showSearchBar && setSearchTerm) {
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="w-full relative">
          <Input
            id="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
      </div>
    );
  }
  
  // Default header with title and create outfit button
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">My Wardrobe</h1>
      {activeTab === "clothing" && (
        <Button 
          onClick={() => setIsCreatingOutfit(!isCreatingOutfit)}
          className={isCreatingOutfit ? "bg-amber-500 hover:bg-amber-600" : ""}
        >
          {isCreatingOutfit ? (
            <>
              <Shirt className="mr-2 h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <Shirt className="mr-2 h-4 w-4" />
              Create Outfit
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default WardrobeHeader;
