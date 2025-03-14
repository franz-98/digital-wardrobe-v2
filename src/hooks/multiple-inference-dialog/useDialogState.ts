
import { useState, useEffect, useRef } from "react";
import { ItemInference } from "@/components/home/types";
import { UseMultipleInferenceDialogProps } from "./types";

export function useDialogState({
  open,
  inferredItems
}: Pick<UseMultipleInferenceDialogProps, 'open' | 'inferredItems'>) {
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
  
  return {
    currentIndex,
    setCurrentIndex,
    currentItem,
    totalItems,
    itemsToAdd,
    setItemsToAdd,
    confirmedItems,
    setConfirmedItems,
    scrollAreaRef,
    isNavigating
  };
}
