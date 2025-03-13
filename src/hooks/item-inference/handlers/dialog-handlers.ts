
import { ItemInference } from "../types";

/**
 * Handlers related to dialog open/close state
 */
export const createDialogHandlers = () => {
  // Handle single dialog open/close
  const handleSingleDialogOpenChange = (
    open: boolean,
    setInferenceDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedItem: React.Dispatch<React.SetStateAction<ItemInference | null>>
  ) => {
    if (!open) {
      setInferenceDialogOpen(false);
      setTimeout(() => setSelectedItem(null), 300);
    } else {
      setInferenceDialogOpen(true);
    }
  };

  // Handle multiple dialog open/close
  const handleMultipleDialogOpenChange = (
    open: boolean,
    setMultipleInferenceDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setInferredItems: React.Dispatch<React.SetStateAction<ItemInference[]>>
  ) => {
    if (!open) {
      setMultipleInferenceDialogOpen(false);
      setTimeout(() => setInferredItems([]), 300);
    } else {
      setMultipleInferenceDialogOpen(true);
    }
  };

  return {
    handleSingleDialogOpenChange,
    handleMultipleDialogOpenChange
  };
};
