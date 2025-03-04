
import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecentItemCard from "./RecentItemCard";

interface RecentUpload {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

interface RecentUploadsSectionProps {
  recentUploads: RecentUpload[] | undefined;
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
        <h2 className="text-xl font-semibold">Recent Uploads</h2>
        <Button variant="ghost" size="sm" className="text-primary">
          See All
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex space-x-4">
            {recentUploads?.map((item) => (
              <RecentItemCard 
                key={`recent-${item.id}`} 
                item={item} 
                onClick={() => onItemClick(item)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentUploadsSection;
