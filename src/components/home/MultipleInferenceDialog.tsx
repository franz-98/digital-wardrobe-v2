
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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Minimum distance required for swipe to register
  const minSwipeDistance = 50;

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
    if (direction === 'prev') {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    } else {
      setCurrentIndex(prev => Math.min(totalItems - 1, prev + 1));
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentIndex < totalItems - 1) {
      handleNavigate('next');
    }
    
    if (isRightSwipe && currentIndex > 0) {
      handleNavigate('prev');
    }
    
    // Reset touch coordinates
    setTouchStart(null);
    setTouchEnd(null);
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
          <div 
            className="space-y-4 py-2"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
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
