
import { useState } from "react";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Outfit } from "@/components/wardrobe/types";

interface WearHistoryProps {
  relatedOutfits: Outfit[];
}

const WearHistory = ({ relatedOutfits }: WearHistoryProps) => {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  
  // Extract and sort all wear dates from related outfits
  const wearDates: { date: Date; outfitName: string }[] = [];
  relatedOutfits?.forEach(outfit => {
    if (outfit.metadata?.wornDates) {
      outfit.metadata.wornDates.forEach(dateStr => {
        wearDates.push({
          date: new Date(dateStr),
          outfitName: outfit.name
        });
      });
    }
  });
  
  // Sort by most recent first
  wearDates.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Determine which dates to show based on expanded state
  const visibleWearDates = isHistoryExpanded 
    ? wearDates 
    : wearDates.slice(0, 3);

  const toggleHistoryExpanded = () => {
    setIsHistoryExpanded(!isHistoryExpanded);
  };
  
  if (wearDates.length === 0) return null;

  return (
    <Card className="p-3 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> Wear History
        </h3>
        {wearDates.length > 3 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 px-2" 
            onClick={toggleHistoryExpanded}
          >
            {isHistoryExpanded ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </Button>
        )}
      </div>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {visibleWearDates.map((wearInfo, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/70" />
              <span>{wearInfo.date.toLocaleDateString('default', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}</span>
            </div>
            <Badge variant="outline" className="text-xs truncate max-w-[120px]">
              {wearInfo.outfitName}
            </Badge>
          </div>
        ))}
        {!isHistoryExpanded && wearDates.length > 3 && (
          <div 
            className="text-xs text-muted-foreground text-center mt-1 cursor-pointer hover:underline"
            onClick={toggleHistoryExpanded}
          >
            Show {wearDates.length - 3} more {wearDates.length - 3 === 1 ? 'date' : 'dates'}
          </div>
        )}
      </div>
    </Card>
  );
};

export default WearHistory;
