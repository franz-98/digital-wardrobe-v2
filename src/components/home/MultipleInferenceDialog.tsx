
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
  
  // Reset state when dialog opens with new items
  useEffect(() => {
    if (open && inferredItems.length > 0) {
      setItemsToAdd(inferredItems);
      setCurrentIndex(0);
    }
  }, [open, inferredItems]);

  if (!inferredItems.length) return null;
  
  const currentItem = itemsToAdd[currentIndex];
  const totalItems = itemsToAdd.length;

  const handleNavigate = (direction: 'prev' | 'next') => {
    console.log(`Navigation triggered: ${direction}`);
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'next' && currentIndex < totalItems - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleSave = () => {
    onConfirm(itemsToAdd);
    onOpenChange(false);
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
        className="max-w-md max-h-[90vh] overflow-hidden"
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

        <ScrollArea className="max-h-[60vh] touch-manipulation">
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
          </div>
        </ScrollArea>

        <DialogActions 
          onCancel={handleCancel} 
          onSave={handleSave} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default MultipleInferenceDialog;
