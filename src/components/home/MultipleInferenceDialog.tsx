
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { ItemInference } from "./types";
import { 
  InferredItemDisplay, 
  NavigationControls, 
  DialogActions 
} from "./inference-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MultipleInferenceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inferredItems: ItemInference[];
  onConfirm: (items: ItemInference[]) => void;
  onFieldChange: (itemIndex: number, field: keyof ItemInference, value: string) => void;
  clothingCategories: string[];
}

const MultipleInferenceDialog = ({
  open,
  onOpenChange,
  inferredItems,
  onConfirm,
  onFieldChange,
  clothingCategories
}: MultipleInferenceDialogProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToAdd, setItemsToAdd] = useState<ItemInference[]>(inferredItems);
  const [confirmedItems, setConfirmedItems] = useState<Set<number>>(new Set());
  
  // Reset state when dialog opens with new items
  useEffect(() => {
    if (open && inferredItems.length > 0) {
      setItemsToAdd(inferredItems);
      setCurrentIndex(0);
      setConfirmedItems(new Set());
    }
  }, [open, inferredItems]);

  if (!inferredItems.length) return null;
  
  const currentItem = itemsToAdd[currentIndex];
  const totalItems = itemsToAdd.length;

  const handleNavigate = (direction: 'prev' | 'next') => {
    console.log(`Navigation triggered: ${direction}, current: ${currentIndex}, total: ${totalItems}`);
    
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    } else if (direction === 'next' && currentIndex < totalItems - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleSave = () => {
    // If no items are explicitly confirmed, confirm all
    if (confirmedItems.size === 0 && totalItems > 0) {
      // Confirm all items
      onConfirm(itemsToAdd);
    } else {
      // Filter items to only include confirmed ones
      const itemsToConfirm = itemsToAdd.filter((_, index) => 
        confirmedItems.has(index)
      );
      
      // If no items were confirmed, confirm the current one
      if (itemsToConfirm.length === 0) {
        onConfirm([currentItem]);
      } else {
        onConfirm(itemsToConfirm);
      }
    }
    
    onOpenChange(false);
  };

  const handleConfirmSingleItem = () => {
    console.log(`Confirming item at index ${currentIndex}`);
    
    // Mark the current item as confirmed
    const updatedConfirmed = new Set(confirmedItems);
    updatedConfirmed.add(currentIndex);
    setConfirmedItems(updatedConfirmed);
    
    // Show a toast to confirm to the user
    toast({
      title: "Articolo confermato",
      description: `Articolo ${currentIndex + 1} confermato. Passa al prossimo.`,
      duration: 1500,
      className: "compact-toast top-toast",
    });
    
    // Automatically navigate to the next item if not on the last item
    if (currentIndex < totalItems - 1) {
      console.log(`Auto-navigating to next item: ${currentIndex + 1}`);
      // Use the functional update to ensure we're using the latest state
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleCurrentItemChange = (field: keyof ItemInference, value: string) => {
    onFieldChange(currentIndex, field, value);
    
    // Also update local state
    const updatedItems = [...itemsToAdd];
    updatedItems[currentIndex] = {
      ...updatedItems[currentIndex],
      [field]: value
    };
    setItemsToAdd(updatedItems);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-md max-h-[90vh] overflow-hidden flex flex-col"
        enableDismissOnScroll={true}
        dismissThreshold={60}
        showDismissIndicator={true}
      >
        <DialogHeader>
          <DialogTitle>Conferma Riconoscimento</DialogTitle>
          <DialogDescription>
            {totalItems > 1 
              ? `Sono stati riconosciuti ${totalItems} articoli. Conferma o modifica le informazioni per ciascuno.` 
              : 'Conferma o modifica le informazioni per questo indumento.'}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 max-h-[60vh] touch-manipulation">
          <div className="space-y-4 py-2">
            <NavigationControls 
              currentIndex={currentIndex}
              totalItems={totalItems}
              onNavigate={handleNavigate}
            />

            <div className="opacity-100 transition-opacity duration-150">
              <InferredItemDisplay 
                item={currentItem}
                onFieldChange={handleCurrentItemChange}
                clothingCategories={clothingCategories}
              />
            </div>
            
            {/* Show visual indication that an item has been confirmed */}
            {confirmedItems.has(currentIndex) && (
              <div className="text-green-600 text-center text-sm mt-2">
                ✓ Questo articolo è stato confermato
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogActions 
          onCancel={handleCancel} 
          onSave={handleSave}
          currentIndex={currentIndex}
          totalItems={totalItems}
          onNavigate={handleNavigate}
          onConfirmSingle={handleConfirmSingleItem}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MultipleInferenceDialog;
