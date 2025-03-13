
import React, { useState } from "react";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";
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
import { ItemInference } from "./types";

interface MultipleInferenceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inferredItems: ItemInference[];
  onConfirm: (items: ItemInference[]) => void;
  onFieldChange: (itemIndex: number, field: keyof ItemInference, value: string) => void;
  clothingCategories: string[];
}

const MultipleInferenceDialog = ({
  open,
  onOpenChange,
  inferredItems,
  onConfirm,
  onFieldChange,
  clothingCategories
}: MultipleInferenceDialogProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToAdd, setItemsToAdd] = useState<ItemInference[]>(inferredItems);
  
  // Reset state when dialog opens with new items
  React.useEffect(() => {
    if (open && inferredItems.length > 0) {
      setItemsToAdd(inferredItems);
      setCurrentIndex(0);
    }
  }, [open, inferredItems]);

  if (!inferredItems.length) return null;
  
  const currentItem = itemsToAdd[currentIndex];
  const totalItems = itemsToAdd.length;

  const handleNavigate = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? Math.max(0, currentIndex - 1)
      : Math.min(totalItems - 1, currentIndex + 1);
    
    setCurrentIndex(newIndex);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleSave = () => {
    onConfirm(itemsToAdd);
    onOpenChange(false);
  };

  const handleCurrentItemChange = (field: keyof ItemInference, value: string) => {
    onFieldChange(currentIndex, field, value);
    
    // Also update local state
    const updatedItems = [...itemsToAdd];
    updatedItems[currentIndex] = {
      ...updatedItems[currentIndex],
      [field]: value
    };
    setItemsToAdd(updatedItems);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-md max-h-[90vh] overflow-y-auto"
        enableDismissOnScroll={true}
        dismissThreshold={60}
        showDismissIndicator={true}
      >
        <DialogHeader>
          <DialogTitle>Conferma Riconoscimento</DialogTitle>
          <DialogDescription>
            {totalItems > 1 
              ? `Sono stati riconosciuti ${totalItems} articoli. Conferma o modifica le informazioni per ciascuno.` 
              : 'Conferma o modifica le informazioni per questo indumento.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {totalItems > 1 && (
            <div className="flex items-center justify-between text-sm">
              <span>Articolo {currentIndex + 1} di {totalItems}</span>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleNavigate('prev')}
                  disabled={currentIndex === 0}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleNavigate('next')}
                  disabled={currentIndex === totalItems - 1}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2 bg-secondary/10 p-3 rounded-md">
            <h4 className="font-medium">Indumento</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square overflow-hidden rounded-md">
                <img 
                  src={currentItem.imageUrl} 
                  alt={currentItem.name || "Item preview"} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-2">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input 
                    id="name"
                    value={currentItem.name}
                    onChange={(e) => handleCurrentItemChange('name', e.target.value)}
                    placeholder="Inserisci nome"
                    autoFocus={false}
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select 
                    value={currentItem.category}
                    onValueChange={(value) => handleCurrentItemChange('category', value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Seleziona categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {clothingCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="color">Colore</Label>
                  <Input 
                    id="color"
                    value={currentItem.color}
                    onChange={(e) => handleCurrentItemChange('color', e.target.value)}
                    placeholder="Inserisci colore"
                    autoFocus={false}
                  />
                </div>
              </div>
            </div>
            
            {currentItem.confidence > 0 && (
              <div className="mt-2 flex justify-end">
                <Badge 
                  variant={currentItem.confidence > 0.9 ? "default" : "outline"}
                  className={currentItem.confidence > 0.9 ? "bg-green-600" : ""}
                >
                  {(currentItem.confidence * 100).toFixed(0)}% sicurezza
                </Badge>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} type="button">
            Annulla
          </Button>
          <Button onClick={handleSave} className="gap-1">
            <Check className="h-4 w-4" /> Conferma
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MultipleInferenceDialog;
