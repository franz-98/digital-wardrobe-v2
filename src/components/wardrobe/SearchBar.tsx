
import React from 'react';
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  showSearchBar: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  toggleSearchBar: () => void;
  activeTab: string;
}

const SearchBar = ({ 
  showSearchBar, 
  searchTerm, 
  setSearchTerm, 
  toggleSearchBar,
  activeTab
}: SearchBarProps) => {
  return (
    <div className="flex items-center">
      <Button variant="ghost" size="icon" onClick={toggleSearchBar}>
        <Search className="h-5 w-5" />
      </Button>
      {showSearchBar && (
        <div className="relative flex-1 ml-2 animate-fade-in">
          <Input
            type="search"
            id="search"
            placeholder={`Search ${activeTab}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-8"
          />
          {searchTerm && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-full w-8 p-0"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
