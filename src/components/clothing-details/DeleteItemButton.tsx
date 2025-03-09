
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DeleteItemButtonProps {
  onDeleteClick: () => void;
}

const DeleteItemButton = ({ onDeleteClick }: DeleteItemButtonProps) => {
  return (
    <div className="p-4 border-t">
      <Button 
        variant="destructive" 
        className="w-full"
        onClick={onDeleteClick}
      >
        <X className="h-4 w-4 mr-2" />
        Delete Item
      </Button>
    </div>
  );
};

export default DeleteItemButton;
