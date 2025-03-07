
import { ClothingItem, Outfit } from "@/components/wardrobe/types";
import ItemDetailsDialog from "@/components/clothing-details/ItemDetailsDialog";

interface ClothingItemDetailsProps {
  item: ClothingItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  relatedOutfits?: Outfit[];
  onDelete?: (id: string) => void;
  onOutfitDelete?: (id: string) => void;
  onOutfitClick?: (outfit: Outfit) => void;
  dismissProgress?: number;
}

const ClothingItemDetails = (props: ClothingItemDetailsProps) => {
  return <ItemDetailsDialog {...props} />;
};

export default ClothingItemDetails;
