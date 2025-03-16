
import React from "react";
import { Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecentItemCard from "./RecentItemCard";
import { RecentUpload } from "@/components/home/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

interface RecentUploadsSectionProps {
  recentUploads: RecentUpload[];
  isLoading: boolean;
  onItemClick: (item: RecentUpload) => void;
}

const RecentUploadsSection = ({ 
  recentUploads, 
  isLoading, 
  onItemClick 
}: RecentUploadsSectionProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Upload Recenti</h2>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  type="button"
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted/80 active:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-label="Ulteriori informazioni"
                >
                  <Info className="h-6 w-6 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side={isMobile ? "bottom" : "right"} 
                className="max-w-xs bg-popover p-4 shadow-lg"
                sideOffset={5}
              >
                <p>Gli indumenti di cui l'app è certa sono inseriti nel tuo armadio, gli indumenti in Upload Recenti hanno bisogno del tuo aiuto!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {recentUploads.length > 0 && (
          <Button variant="ghost" size="sm" className="text-primary">
            See All
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : recentUploads.length > 0 ? (
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex space-x-4">
            {recentUploads.map((item) => (
              <RecentItemCard 
                key={`recent-${item.id}`} 
                item={item} 
                onClick={() => onItemClick(item)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center py-10 text-muted-foreground">
          No recent uploads
        </div>
      )}
    </div>
  );
};

export default RecentUploadsSection;
