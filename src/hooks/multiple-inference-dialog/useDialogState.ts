
import { useState, useEffect } from "react";
import { ItemInference } from "@/components/home/types";
import { UseMultipleInferenceDialogProps } from "./types";

export function useDialogState({
  open,
  inferredItems
}: Pick<UseMultipleInferenceDialogProps, 'open' | 'inferredItems'>) {
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
    setConfirmedItems
  };
}
