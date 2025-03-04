
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

  // Handle the cancel action, but don't close the parent dialog
  const handleCancel = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <AlertDialog 
      open={showDeleteConfirmation} 
      onOpenChange={(open) => {
        // This prevents the AlertDialog from closing when clicking outside
        // Only allow our explicit button handlers to change the state
        if (!open) {
          setShowDeleteConfirmation(false);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Conferma Eliminazione
          </AlertDialogTitle>
          <AlertDialogDescription>
            Sei sicuro di voler eliminare questo elemento? Questa azione non può essere annullata.
            {isPartOfOutfit() && (
              <p className="mt-2 text-destructive font-medium">
                Attenzione: Questo elemento è utilizzato in uno o più outfit!
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Annulla</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Elimina
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
