
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  showSearchBar: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  toggleSearchBar: () => void;
  activeTab: string;
}

const SearchBar = ({
  showSearchBar,
  searchTerm,
  setSearchTerm,
  toggleSearchBar,
  activeTab,
}: SearchBarProps) => {
  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="flex items-center w-full h-10">
      {showSearchBar ? (
        <div className="flex w-full items-center relative">
          <Input
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-8 h-10"
            placeholder={`Search ${activeTab === "clothing" ? "items" : activeTab === "outfits" ? "outfits" : "stats"}...`}
            autoFocus
          />
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-8 h-8 w-8"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSearchBar}
            className="absolute right-0 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSearchBar}
          className="h-10 w-10 ml-auto"
        >
          <Search className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
