
import { X } from "lucide-react";
import { 
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EditableTitle } from "@/components/ui/editable-title";
import { useWardrobe } from "@/context/WardrobeContext";
import { ClothingItem } from "@/components/wardrobe/types";

interface ItemDetailsHeaderProps {
  item: ClothingItem;
  dismissProgress: number;
}

const ItemDetailsHeader = ({ item, dismissProgress }: ItemDetailsHeaderProps) => {
  const { updateItemName } = useWardrobe();

  const handleNameUpdate = (newName: string) => {
    return updateItemName(item.id, newName);
  };

  return (
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
  );
};

export default ItemDetailsHeader;
