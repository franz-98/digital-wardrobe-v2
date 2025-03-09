
import { ClothingItem, Outfit } from "@/components/wardrobe/types";
import ItemDetailsHeader from "./ItemDetailsHeader";
import ItemDetailsMainContent from "./ItemDetailsMainContent";
import DeleteItemButton from "./DeleteItemButton";

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
  return (
    <>
      <ItemDetailsHeader 
        item={item}
        dismissProgress={dismissProgress}
      />
      
      <ItemDetailsMainContent
        item={item}
        relatedOutfits={relatedOutfits}
        onDeleteClick={onDeleteClick}
        onDelete={onDelete}
        onOutfitClick={onOutfitClick}
      />
      
      {onDelete && (
        <DeleteItemButton onDeleteClick={onDeleteClick} />
      )}
    </>
  );
};

export default ItemDetailsContent;
