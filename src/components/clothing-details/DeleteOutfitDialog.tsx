
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
import { Outfit } from "@/components/wardrobe/types";

interface DeleteOutfitDialogProps {
  outfit: Outfit;
  showDeleteConfirmation: boolean;
  setShowDeleteConfirmation: (show: boolean) => void;
  onDelete: (id: string) => void;
}

const DeleteOutfitDialog = ({
  outfit,
  showDeleteConfirmation,
  setShowDeleteConfirmation,
  onDelete
}: DeleteOutfitDialogProps) => {
  const confirmDelete = () => {
    onDelete(outfit.id);
    setShowDeleteConfirmation(false);
  };
  
  // Handle the cancel action, preventing dialog closing
  const handleCancel = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <AlertDialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Conferma Eliminazione
          </AlertDialogTitle>
          <AlertDialogDescription>
            Sei sicuro di voler eliminare questo outfit? Questa azione non può essere annullata.
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

export default DeleteOutfitDialog;
