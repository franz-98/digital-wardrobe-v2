
import { Info, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

interface ItemSpecificationsProps {
  metadata?: {
    dateTaken?: string;
    material?: string;
    season?: string;
    [key: string]: any;
  };
}

const ItemSpecifications = ({ metadata }: ItemSpecificationsProps) => {
  if (!metadata || Object.keys(metadata).length === 0) return null;
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    try {
      return format(new Date(dateString), "PPP");
    } catch {
      return "Invalid date";
    }
  };

  return (
    <Card className="p-3 mb-4">
      <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
        <Info className="h-3.5 w-3.5" /> Specifications
      </h3>
      <div className="grid grid-cols-2 gap-y-3 text-sm">
        {metadata.dateTaken && (
          <>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>Date:</span>
            </div>
            <div className="text-xs">{formatDate(metadata.dateTaken)}</div>
          </>
        )}
        
        {metadata.material && (
          <>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Material:</span>
            </div>
            <div className="text-xs">{metadata.material}</div>
          </>
        )}
        
        {metadata.season && (
          <>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Season:</span>
            </div>
            <div className="text-xs">{metadata.season}</div>
          </>
        )}
      </div>
    </Card>
  );
};

export default ItemSpecifications;
