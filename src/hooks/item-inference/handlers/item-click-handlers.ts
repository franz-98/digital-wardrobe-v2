
import { ItemInference, RecentUpload } from "../types";

/**
 * Handlers related to clicking on items
 */
export const createItemClickHandlers = (
  setSelectedItem: React.Dispatch<React.SetStateAction<ItemInference | null>>,
  setInferenceDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // Handle click on a recent upload item
  const handleRecentItemClick = (item: RecentUpload) => {
    const inferredItem: ItemInference = {
      id: item.id,
      name: item.name,
      category: item.category,
      color: "", // Always provide a color field, even if empty
      imageUrl: item.imageUrl,
      confidence: 1.0,
      outfitId: item.outfitId
    };
    
    setSelectedItem(inferredItem);
    setInferenceDialogOpen(true);

    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, 50);
  };

  return {
    handleRecentItemClick
  };
};
