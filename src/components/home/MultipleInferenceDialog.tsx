
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent,
} from "@/components/ui/dialog";
import { ItemInference } from "./types";
import { 
  NavigationControls, 
  DialogActions,
  DialogHeaderSection,
  ItemDisplaySection,
  PaginationControls
} from "./inference-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  onFieldChange,
  clothingCategories,
  onConfirm
}: MultipleInferenceDialogProps) => {
  const isMobile = useIsMobile();
  
  // Initialize state here (OUTSIDE any conditions) to ensure consistent hook calls
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToAdd, setItemsToAdd] = useState<ItemInference[]>([]);
  const [confirmedItems, setConfirmedItems] = useState<Set<number>>(new Set());
  
  // Reset state when dialog opens with new items
  useEffect(() => {
    if (open && inferredItems.length > 0) {
      setItemsToAdd([...inferredItems]);
      setCurrentIndex(0);
      setConfirmedItems(new Set());
    }
  }, [open, inferredItems]);

  // Navigation functions
  const handleNavigate = (directionOrPage: 'prev' | 'next' | number) => {
    // Prevent rapid clicks with simple time check
    const now = Date.now();
    const lastNavigationTime = (window as any).lastNavigationTime || 0;
    if (now - lastNavigationTime < 300) return;
    (window as any).lastNavigationTime = now;
    
    let nextIndex: number;
    if (typeof directionOrPage === 'number') {
      nextIndex = Math.max(0, Math.min(itemsToAdd.length - 1, directionOrPage));
    } else {
      if (directionOrPage === 'prev') {
        nextIndex = Math.max(0, currentIndex - 1);
      } else {
        nextIndex = Math.min(itemsToAdd.length - 1, currentIndex + 1);
      }
    }
    
    if (nextIndex !== currentIndex) {
      setCurrentIndex(nextIndex);
      // Scroll to top when navigating between items
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Reset focus to avoid keyboard issues
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  };

  // Item actions
  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleSave = () => {
    // If no items are explicitly confirmed, confirm all
    if (confirmedItems.size === 0 && itemsToAdd.length > 0) {
      // Confirm all items
      onConfirm(itemsToAdd);
    } else {
      // Filter items to only include confirmed ones
      const itemsToConfirm = itemsToAdd.filter((_, index) => 
        confirmedItems.has(index)
      );
      
      // If no items were confirmed, confirm the current one
      if (itemsToConfirm.length === 0) {
        const currentItem = itemsToAdd[currentIndex];
        onConfirm([currentItem]);
      } else {
        onConfirm(itemsToConfirm);
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
    
    // Automatically navigate to the next item if not on the last item
    if (currentIndex < itemsToAdd.length - 1) {
      setCurrentIndex(currentIndex + 1);
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

  const handleCurrentItemChange = (field: keyof ItemInference, value: string) => {
    onFieldChange(currentIndex, field, value);
    handleFieldChange(field, value);
  };

  // Calculate derived state
  const currentItem = itemsToAdd[currentIndex] || null;
  const totalItems = itemsToAdd.length;
  const isCurrentItemConfirmed = confirmedItems.has(currentIndex);

  // Always render the Dialog - but only render content conditionally
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open && currentItem && (
        <DialogContent 
          className={cn(
            "max-w-md sm:max-w-lg md:max-w-xl flex flex-col p-0 max-h-[90vh] overflow-hidden",
            "bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800",
            isMobile ? "rounded-t-xl rounded-b-none m-0 w-full" : "rounded-xl"
          )}
          dismissThreshold={99999}
          enableDismissOnScroll={false}
          showDismissIndicator={false}
        >
          <DialogHeaderSection 
            totalItems={totalItems} 
            className="px-4 pt-4 sm:px-6 sm:pt-6"
          />

          <NavigationControls 
            currentIndex={currentIndex}
            totalItems={totalItems}
            onNavigate={handleNavigate}
            className="px-4 sm:px-6"
          />

          <ScrollArea className="flex-1 p-0 overflow-auto">
            <div className="px-4 py-2 sm:px-6">
              <ItemDisplaySection 
                currentItem={currentItem}
                onFieldChange={handleCurrentItemChange}
                clothingCategories={clothingCategories}
                isConfirmed={isCurrentItemConfirmed}
              />
            </div>
          </ScrollArea>

          <PaginationControls
            currentIndex={currentIndex}
            totalItems={totalItems}
            onPageChange={handleNavigate}
            confirmedItems={confirmedItems}
            className="px-4 sm:px-6"
          />

          <DialogActions 
            onCancel={handleCancel} 
            onSave={handleSave}
            currentIndex={currentIndex}
            totalItems={totalItems}
            onConfirmSingle={handleConfirmSingleItem}
            className="p-4 sm:p-6"
            confirmLabel="Conferma"
            cancelLabel="Annulla"
          />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default MultipleInferenceDialog;
