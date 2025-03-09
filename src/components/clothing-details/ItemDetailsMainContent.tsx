
import { ClothingItem, Outfit } from "@/components/wardrobe/types";
import ItemDetails from "./ItemDetails";
import RelatedOutfits from "./RelatedOutfits";

interface ItemDetailsMainContentProps {
  item: ClothingItem;
  relatedOutfits: Outfit[];
  onDeleteClick: () => void;
  onDelete?: (id: string) => void;
  onOutfitClick: (outfit: Outfit) => void;
}

const ItemDetailsMainContent = ({ 
  item,
  relatedOutfits,
  onDeleteClick,
  onDelete,
  onOutfitClick
}: ItemDetailsMainContentProps) => {
  return (
    <div className="flex-1 overflow-y-auto overscroll-contain">
      <ItemDetails 
        item={item}
        onDeleteClick={onDeleteClick}
        onDelete={onDelete}
        relatedOutfits={relatedOutfits}
      />
      
      <div className="px-4 pb-4">
        <RelatedOutfits 
          relatedOutfits={relatedOutfits} 
          onOutfitClick={onOutfitClick}
        />
      </div>
    </div>
  );
};

export default ItemDetailsMainContent;
