
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
  
  // Reset state when dialog opens with new items
  useEffect(() => {
    if (open && inferredItems.length > 0) {
      setItemsToAdd([...inferredItems]);
      setCurrentIndex(0);
      setConfirmedItems(new Set());
      
      // Reset scroll position
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = 0;
      }
    }
  }, [open, inferredItems]);

  const currentItem = itemsToAdd[currentIndex];
  const totalItems = itemsToAdd.length;
  
  const handleNavigate = (direction: 'prev' | 'next') => {
    console.log(`Navigation triggered: ${direction}, current: ${currentIndex}, total: ${totalItems}`);
    
    // Use functional updates to ensure we're using the latest state
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        console.log(`Navigating from ${prevIndex} to ${newIndex}`);
        return newIndex;
      });
    } else if (direction === 'next' && currentIndex < totalItems - 1) {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        console.log(`Navigating from ${prevIndex} to ${newIndex}`);
        return newIndex;
      });
    }
    
    // Reset scroll position on every navigation
    setTimeout(() => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = 0;
      }
    }, 10);
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
    setConfirmedItems(prev => {
      const updated = new Set(prev);
      updated.add(currentIndex);
      return updated;
    });
    
    // Show a toast to confirm to the user
    toast({
      title: "Articolo confermato",
      description: `Articolo ${currentIndex + 1} confermato. Passa al prossimo.`,
      duration: 1500,
      className: "compact-toast top-toast",
    });
    
    // Automatically navigate to the next item if not on the last item
    if (currentIndex < totalItems - 1) {
      // Wait for state to update before navigating
      setTimeout(() => {
        console.log(`Auto-navigating to next item from ${currentIndex} to ${currentIndex + 1}`);
        setCurrentIndex(prevIndex => {
          const newIndex = prevIndex + 1;
          
          // Reset scroll position
          if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = 0;
          }
          
          return newIndex;
        });
      }, 50);
    }
  };

  const handleFieldChange = (field: keyof ItemInference, value: string) => {
    setItemsToAdd(prevItems => {
      const updated = [...prevItems];
      updated[currentIndex] = {
        ...updated[currentIndex],
        [field]: value
      };
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
