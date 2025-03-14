
import { ItemInference } from "@/components/home/types";

export interface UseMultipleInferenceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inferredItems: ItemInference[];
  onConfirm: (items: ItemInference[]) => void;
}

export interface UseMultipleInferenceDialogReturn {
  currentIndex: number;
  currentItem: ItemInference;
  totalItems: number;
  confirmedItems: Set<number>;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  itemsToAdd: ItemInference[];
  handleNavigate: (directionOrPage: 'prev' | 'next' | number) => void;
  handleCancel: () => void;
  handleSave: () => void;
  handleConfirmSingleItem: () => void;
  handleFieldChange: (field: keyof ItemInference, value: string) => void;
}
