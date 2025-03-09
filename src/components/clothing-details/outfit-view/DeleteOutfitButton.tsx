
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteOutfitButtonProps {
  onDeleteClick: () => void;
}

const DeleteOutfitButton = ({ onDeleteClick }: DeleteOutfitButtonProps) => {
  return (
    <Button 
      variant="destructive" 
      className="w-full"
      onClick={onDeleteClick}
    >
      <X className="h-4 w-4 mr-2" />
      Delete Outfit
    </Button>
  );
};

export default DeleteOutfitButton;
