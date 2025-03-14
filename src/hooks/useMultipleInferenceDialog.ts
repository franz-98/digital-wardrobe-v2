import { useState, useEffect, useRef } from "react";
import { ItemInference } from "@/components/home/types";
import { toast } from "@/components/ui/use-toast";

export function useMultipleInferenceDialog({
  open,
  onOpenChange,
  inferredItems,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inferredItems: ItemInference[];
  onConfirm: (items: ItemInference[]) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToAdd, setItemsToAdd] = useState<ItemInference[]>([]);
  const [confirmedItems, setConfirmedItems] = useState<Set<number>>(new Set());
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isNavigating = useRef(false);
  
  // Reset state when dialog opens with new items
  useEffect(() => {
    if (open && inferredItems.length > 0) {
      setItemsToAdd([...inferredItems]);
      setCurrentIndex(0);
      setConfirmedItems(new Set());
      isNavigating.current = false;
      
      // Reset scroll position
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = 0;
      }
    }
  }, [open, inferredItems]);

  const currentItem = itemsToAdd[currentIndex] || inferredItems[0];
  const totalItems = itemsToAdd.length || inferredItems.length;
  
  const handleNavigate = (direction: 'prev' | 'next') => {
    // Prevent multiple rapid navigations
    if (isNavigating.current) {
      console.log("Navigation blocked: already navigating");
      return;
    }
    
    isNavigating.current = true;
    console.log(`Navigation started: ${direction}, current index: ${currentIndex}`);
    
    // Calculate the new index based on direction
    let newIndex = currentIndex;
    if (direction === 'prev' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === 'next' && currentIndex < totalItems - 1) {
      newIndex = currentIndex + 1;
    } else {
      // If no change needed, reset the navigating flag and return
      console.log("Navigation canceled: no valid direction to navigate");
      isNavigating.current = false;
      return;
    }
    
    console.log(`Navigating from ${currentIndex} to ${newIndex}`);
    
    // Update the current index
    setCurrentIndex(newIndex);
    
    // Reset scroll position and allow navigation again after a short delay
    setTimeout(() => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = 0;
      }
      console.log("Navigation completed, ready for next navigation");
      isNavigating.current = false;
    }, 300);
  };

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
    // Prevent multiple rapid confirmations
    if (isNavigating.current) return;
    isNavigating.current = true;
    
    // Mark the current item as confirmed
    setConfirmedItems(prev => {
      const updated = new Set(prev);
      updated.add(currentIndex);
      console.log(`Confirming item at index ${currentIndex}`);
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
      // Wait a moment before navigating to next item
      setTimeout(() => {
        setCurrentIndex(prevIndex => {
          const newIndex = prevIndex + 1;
          console.log(`Auto-navigating to next item from ${prevIndex} to ${newIndex}`);
          
          // Reset scroll position
          requestAnimationFrame(() => {
            if (scrollAreaRef.current) {
              scrollAreaRef.current.scrollTop = 0;
            }
            
            // Allow navigation again after scrolling completes
            setTimeout(() => {
              isNavigating.current = false;
            }, 300);
          });
          
          return newIndex;
        });
      }, 300); // Slightly longer delay for a better user experience
    } else {
      // If it's the last item, show a toast suggesting to save
      setTimeout(() => {
        toast({
          title: "Ultimo articolo confermato",
          description: "Clicca 'Conferma Tutti' per salvare tutto.",
          duration: 3000,
        });
        isNavigating.current = false;
      }, 500);
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
    currentIndex,
    currentItem,
    totalItems,
    confirmedItems,
    scrollAreaRef,
    itemsToAdd,
    handleNavigate,
    handleCancel,
    handleSave,
    handleConfirmSingleItem,
    handleFieldChange
  };
}
