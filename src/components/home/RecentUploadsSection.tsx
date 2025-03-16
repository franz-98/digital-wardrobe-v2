
import React from "react";
import { Loader2, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecentItemCard from "./RecentItemCard";
import { RecentUpload } from "@/components/home/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Upload Recenti</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p>Indumenti che richiedono conferma</p>
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
