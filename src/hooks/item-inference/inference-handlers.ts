
import { ItemInference, RecentUpload, ClothingItem } from "./types";
import { 
  createFileUploadHandlers,
  createItemClickHandlers,
  createInferenceConfirmationHandlers,
  createInferenceEditHandlers,
  createDialogHandlers 
} from "./handlers";

/**
 * Create handlers for item inference operations
 */
export const createInferenceHandlers = (
  setSelectedItem: React.Dispatch<React.SetStateAction<ItemInference | null>>,
  setInferenceDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setMultipleInferenceDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setInferredItems: React.Dispatch<React.SetStateAction<ItemInference[]>>,
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>,
  setRecentUploadItems: React.Dispatch<React.SetStateAction<RecentUpload[]>>,
  setClothingItems: React.Dispatch<React.SetStateAction<ClothingItem[]>>,
  setLastAddedItem: React.Dispatch<React.SetStateAction<string | null>>
) => {
  // Create all handlers
  const fileUploadHandlers = createFileUploadHandlers(
    setInferredItems,
    setIsUploading,
    setMultipleInferenceDialogOpen
  );
  
  const itemClickHandlers = createItemClickHandlers(
    setSelectedItem,
    setInferenceDialogOpen
  );
  
  const inferenceConfirmationHandlers = createInferenceConfirmationHandlers(
    setClothingItems,
    setRecentUploadItems,
    setLastAddedItem
  );
  
  const inferenceEditHandlers = createInferenceEditHandlers();
  
  const dialogHandlers = createDialogHandlers();

  // Combine all handlers
  return {
    ...fileUploadHandlers,
    ...itemClickHandlers,
    ...inferenceConfirmationHandlers,
    ...inferenceEditHandlers,
    ...dialogHandlers
  };
};
