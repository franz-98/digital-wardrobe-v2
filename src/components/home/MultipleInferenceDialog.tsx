
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
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Touch handling for swiping between items
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  
  // Minimum distance required for swipe to register
  const minSwipeDistance = 50;

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
  
  // Reset state when dialog opens with new items
  useEffect(() => {
    if (open && inferredItems.length > 0) {
      setItemsToAdd(inferredItems);
      setCurrentIndex(0);
      setSwipeDirection(null);
    }
  }, [open, inferredItems]);

  if (!inferredItems.length) return null;
  
  const currentItem = itemsToAdd[currentIndex];
  const totalItems = itemsToAdd.length;

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setSwipeDirection(direction === 'prev' ? 'right' : 'left');
    
    // Short delay to allow animation to complete
    setTimeout(() => {
      const newIndex = direction === 'prev' 
        ? Math.max(0, currentIndex - 1)
        : Math.min(totalItems - 1, currentIndex + 1);
      
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 200);
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
        className="max-w-md max-h-[90vh] overflow-y-auto"
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

          <div 
            className={`transition-all duration-200 ease-in-out ${
              isTransitioning 
                ? swipeDirection === 'left' 
                  ? 'opacity-0 translate-x-4' 
                  : 'opacity-0 -translate-x-4'
                : 'opacity-100 translate-x-0'
            }`}
          >
            <InferredItemDisplay 
              item={currentItem}
              onFieldChange={handleCurrentItemChange}
              clothingCategories={clothingCategories}
            />
          </div>
        </div>

        <DialogActions 
          onCancel={handleCancel} 
          onSave={handleSave} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default MultipleInferenceDialog;
