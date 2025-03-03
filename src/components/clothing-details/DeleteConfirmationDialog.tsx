
import { AlertTriangle, Trash2 } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { ClothingItem, Outfit } from "@/components/wardrobe/types";

interface DeleteConfirmationDialogProps {
  item: ClothingItem;
  showDeleteConfirmation: boolean;
  setShowDeleteConfirmation: (show: boolean) => void;
  relatedOutfits?: Outfit[];
  onDelete: (id: string) => void;
  onOpenChange: (open: boolean) => void;
}

const DeleteConfirmationDialog = ({
  item,
  showDeleteConfirmation,
  setShowDeleteConfirmation,
  relatedOutfits = [],
  onDelete,
  onOpenChange
}: DeleteConfirmationDialogProps) => {
  const isPartOfOutfit = () => {
    return relatedOutfits && relatedOutfits.some(outfit => 
      outfit.items.some(outfitItem => outfitItem.id === item.id)
    );
  };

  const confirmDelete = () => {
    onDelete(item.id);
    onOpenChange(false);
    setShowDeleteConfirmation(false);
  };

  return (
    <AlertDialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Confirm Deletion
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this item? This action cannot be undone.
            {isPartOfOutfit() && (
              <p className="mt-2 text-destructive font-medium">
                Warning: This item is used in one or more outfits!
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
