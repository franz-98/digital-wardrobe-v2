
import React from "react";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { translateCategoryToItalian } from "@/components/wardrobe/utils/categoryTranslations";

interface ItemInference {
  id: string;
  name: string;
  category: string;
  color: string;
  imageUrl: string;
  confidence: number;
}

interface InferenceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItem: ItemInference | null;
  onConfirm: () => void;
  onFieldChange: (field: keyof ItemInference, value: string) => void;
  clothingCategories: string[];
}

const InferenceDialog = ({
  open,
  onOpenChange,
  selectedItem,
  onConfirm,
  onFieldChange,
  clothingCategories
}: InferenceDialogProps) => {
  if (!selectedItem) return null;

  // Enhanced cancel handler to properly close the dialog
  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenChange(false);
  };

  // Enhanced confirm handler
  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-md max-h-[90vh] overflow-y-auto"
        enableDismissOnScroll={false}
        dismissThreshold={999999}
        showDismissIndicator={false}
      >
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg font-medium">Conferma Riconoscimento</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Confer ma o modifica le informazioni per questo indumento.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900">Indumento</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square overflow-hidden rounded-lg shadow-sm">
                <img 
                  src={selectedItem.imageUrl} 
                  alt={selectedItem.name || "Item preview"} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="name" className="text-gray-700">Nome</Label>
                  <Input 
                    id="name"
                    value={selectedItem.name}
                    onChange={(e) => onFieldChange('name', e.target.value)}
                    placeholder="Inserisci nome"
                    className="mt-1"
                    autoFocus={false}
                  />
                </div>
                
                <div>
                  <Label htmlFor="category" className="text-gray-700">Categoria</Label>
                  <Select 
                    value={selectedItem.category}
                    onValueChange={(value) => onFieldChange('category', value)}
                  >
                    <SelectTrigger id="category" className="mt-1">
                      <SelectValue placeholder="Seleziona categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {clothingCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {translateCategoryToItalian(category)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="color" className="text-gray-700">Colore</Label>
                  <Input 
                    id="color"
                    value={selectedItem.color}
                    onChange={(e) => onFieldChange('color', e.target.value)}
                    placeholder="Inserisci colore"
                    className="mt-1"
                    autoFocus={false}
                  />
                </div>
              </div>
            </div>
            
            {selectedItem.confidence > 0 && (
              <div className="mt-2 flex justify-end">
                <Badge 
                  variant={selectedItem.confidence > 0.9 ? "default" : "outline"}
                  className={selectedItem.confidence > 0.9 ? "bg-green-600" : ""}
                >
                  {(selectedItem.confidence * 100).toFixed(0)}% sicurezza
                </Badge>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 mt-3 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={handleCancel} 
            type="button"
            className="flex-1 text-gray-500 border-gray-300"
          >
            <X className="h-4 w-4 mr-1" /> Annulla
          </Button>
          <Button 
            onClick={handleConfirm} 
            className="flex-1 bg-blue-500 hover:bg-blue-600"
          >
            <Check className="h-4 w-4 mr-1" /> Conferma
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InferenceDialog;
