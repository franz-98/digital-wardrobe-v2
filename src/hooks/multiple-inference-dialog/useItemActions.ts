
import { ItemInference } from "@/components/home/types";
import { toast } from "@/components/ui/use-toast";

export function useItemActions(
  currentIndex: number,
  totalItems: number,
  confirmedItems: Set<number>,
  setConfirmedItems: React.Dispatch<React.SetStateAction<Set<number>>>,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  itemsToAdd: ItemInference[],
  setItemsToAdd: React.Dispatch<React.SetStateAction<ItemInference[]>>,
  onOpenChange: (open: boolean) => void,
  onConfirm: (items: ItemInference[]) => void
) {
  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleSave = () => {
    // If no items are explicitly confirmed, confirm all
    if (confirmedItems.size === 0 && totalItems > 0) {
      // Confirm all items
      onConfirm(itemsToAdd);
      toast({
        title: "Articoli confermati",
        description: `Tutti gli ${totalItems} articoli sono stati confermati.`,
        duration: 2000,
      });
    } else {
      // Filter items to only include confirmed ones
      const itemsToConfirm = itemsToAdd.filter((_, index) => 
        confirmedItems.has(index)
      );
      
      // If no items were confirmed, confirm the current one
      if (itemsToConfirm.length === 0) {
        const currentItem = itemsToAdd[currentIndex];
        onConfirm([currentItem]);
        toast({
          title: "Articolo confermato",
          description: `Articolo ${currentIndex + 1} confermato.`,
          duration: 2000,
        });
      } else {
        onConfirm(itemsToConfirm);
        toast({
          title: "Articoli confermati",
          description: `${itemsToConfirm.length} articoli confermati.`,
          duration: 2000,
        });
      }
    }
    
    onOpenChange(false);
  };

  const handleConfirmSingleItem = () => {
    // Mark the current item as confirmed
    setConfirmedItems(prev => {
      const updated = new Set(prev);
      updated.add(currentIndex);
      return updated;
    });
    
    // Show a toast to confirm to the user
    toast({
      title: "Articolo confermato",
      description: `Articolo ${currentIndex + 1} confermato.`,
      duration: 1000,
    });
    
    // Automatically navigate to the next item if not on the last item
    if (currentIndex < totalItems - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // If it's the last item, show a toast suggesting to save
      toast({
        title: "Ultimo articolo confermato",
        description: "Clicca 'Conferma Tutti' per salvare tutto.",
        duration: 3000,
      });
    }
  };

  const handleFieldChange = (field: keyof ItemInference, value: string) => {
    setItemsToAdd(prevItems => {
      const updated = [...prevItems];
      if (updated[currentIndex]) {
        updated[currentIndex] = {
          ...updated[currentIndex],
          [field]: value
        };
      }
      return updated;
    });
  };

  return {
    handleCancel,
    handleSave,
    handleConfirmSingleItem,
    handleFieldChange
  };
}
