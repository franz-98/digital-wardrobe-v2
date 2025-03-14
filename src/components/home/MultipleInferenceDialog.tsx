
import React from "react";
import { ItemInference } from "./types";
import MultipleInferenceDialogContainer from "./inference-dialog/MultipleInferenceDialogContainer";

interface MultipleInferenceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inferredItems: ItemInference[];
  onConfirm: (items: ItemInference[]) => void;
  onFieldChange: (itemIndex: number, field: keyof ItemInference, value: string) => void;
  clothingCategories: string[];
}

const MultipleInferenceDialog = (props: MultipleInferenceDialogProps) => {
  return <MultipleInferenceDialogContainer {...props} />;
};

export default MultipleInferenceDialog;
