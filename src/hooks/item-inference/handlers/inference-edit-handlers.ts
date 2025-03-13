
import { ItemInference } from "../types";

/**
 * Handlers related to editing inference data
 */
export const createInferenceEditHandlers = () => {
  // Handle edit of inferred item fields
  const handleInferenceEdit = (
    selectedItem: ItemInference | null,
    field: keyof ItemInference,
    value: string
  ) => {
    if (!selectedItem) return null;
    
    return { ...selectedItem, [field]: value };
  };

  // Handle edit of inferred item in multiple items
  const handleMultipleInferenceEdit = (
    inferredItems: ItemInference[],
    itemIndex: number,
    field: keyof ItemInference,
    value: string
  ) => {
    const updatedItems = [...inferredItems];
    if (updatedItems[itemIndex]) {
      updatedItems[itemIndex] = { 
        ...updatedItems[itemIndex], 
        [field]: value 
      };
    }
    return updatedItems;
  };

  return {
    handleInferenceEdit,
    handleMultipleInferenceEdit
  };
};
