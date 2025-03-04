
import React from "react";
import { Badge } from "@/components/ui/badge";
import OutfitCard from "@/components/OutfitCard";
import { Button } from "@/components/ui/button";
import { Outfit } from "@/components/wardrobe/types";

interface OutfitSuggestionsProps {
  isPremium: boolean;
  suggestedOutfits: Outfit[];
  handleOutfitClick: (outfit: Outfit) => void;
  togglePremium: () => void;
}

const OutfitSuggestions = ({
  isPremium,
  suggestedOutfits,
  handleOutfitClick,
  togglePremium
}: OutfitSuggestionsProps) => {
  if (isPremium) {
    return (
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
    );
  }

  return (
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
  );
};

export default OutfitSuggestions;
