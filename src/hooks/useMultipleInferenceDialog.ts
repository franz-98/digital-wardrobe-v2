
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

  const currentItem = itemsToAdd[currentIndex] || inferredItems[0];
  const totalItems = itemsToAdd.length || inferredItems.length;
  
  const handleNavigate = (direction: 'prev' | 'next') => {
    // Use functional updates to ensure we're using the latest state
    setCurrentIndex(prevIndex => {
      let newIndex = prevIndex;
      
      if (direction === 'prev' && prevIndex > 0) {
        newIndex = prevIndex - 1;
      } else if (direction === 'next' && prevIndex < totalItems - 1) {
        newIndex = prevIndex + 1;
      } else {
        // Return the same index if no change needed
        return prevIndex;
      }
      
      console.log(`Navigating from ${prevIndex} to ${newIndex}`);
      
      // Reset scroll position after navigation
      requestAnimationFrame(() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTop = 0;
        }
      });
      
      return newIndex;
    });
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
        description: `Tutti gli articoli sono stati confermati.`,
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
          description: `Articolo corrente confermato.`,
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
      console.log(`Confirming item at index ${currentIndex}`);
      return updated;
    });
    
    // Show a toast to confirm to the user
    toast({
      title: "Articolo confermato",
      description: `Articolo ${currentIndex + 1} confermato.`,
      duration: 1500,
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
      }, 1000);
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
