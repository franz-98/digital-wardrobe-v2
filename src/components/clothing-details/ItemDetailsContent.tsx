
import { X } from "lucide-react";
import { 
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { ClothingItem, Outfit } from "@/components/wardrobe/types";
import ItemDetails from "./ItemDetails";
import RelatedOutfits from "./RelatedOutfits";
import { EditableTitle } from "@/components/ui/editable-title";
import { useWardrobe } from "@/context/WardrobeContext";

interface ItemDetailsContentProps {
  item: ClothingItem;
  relatedOutfits: Outfit[];
  dismissProgress: number;
  onDeleteClick: () => void;
  onDelete?: (id: string) => void;
  onOutfitClick: (outfit: Outfit) => void;
  onImageClick: (imageUrl: string) => void;
}

const ItemDetailsContent = ({ 
  item,
  relatedOutfits,
  dismissProgress,
  onDeleteClick,
  onDelete,
  onOutfitClick,
  onImageClick
}: ItemDetailsContentProps) => {
  const { updateItemName } = useWardrobe();

  const handleNameUpdate = (newName: string) => {
    return updateItemName(item.id, newName);
  };

  return (
    <>
      <DialogHeader className="px-4 pt-4 pb-0 flex-shrink-0">
        <div className="flex items-center justify-between">
          <EditableTitle 
            title={item.name} 
            titleClassName="text-lg font-semibold"
            onSave={handleNameUpdate}
          />
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </div>
        <DialogDescription>
          View details and related outfits
          {dismissProgress > 0 && dismissProgress < 60 && (
            <span className="ml-2 text-xs opacity-60">
              Pull down to close ({Math.round(dismissProgress)}%)
            </span>
          )}
        </DialogDescription>
      </DialogHeader>
      
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <ItemDetails 
          item={item}
          onDeleteClick={onDeleteClick}
          onDelete={onDelete}
        />
        
        <div className="px-4 pb-4">
          <RelatedOutfits 
            relatedOutfits={relatedOutfits} 
            onOutfitClick={onOutfitClick}
          />
        </div>
      </div>

      {onDelete && (
        <div className="p-4 border-t flex-shrink-0">
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={onDeleteClick}
          >
            <X className="h-4 w-4 mr-2" />
            Delete Item
          </Button>
        </div>
      )}
    </>
  );
};

export default ItemDetailsContent;
