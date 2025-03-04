
import React from "react";
import { Check } from "lucide-react";
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

  const handleCancel = () => {
    // Simply close the dialog without additional side effects
    onOpenChange(false);
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
            Conferma o modifica le informazioni per questo indumento.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2 bg-secondary/10 p-3 rounded-md">
            <h4 className="font-medium">Indumento</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square overflow-hidden rounded-md">
                <img 
                  src={selectedItem.imageUrl} 
                  alt={selectedItem.name || "Item preview"} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-2">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input 
                    id="name"
                    value={selectedItem.name}
                    onChange={(e) => onFieldChange('name', e.target.value)}
                    placeholder="Inserisci nome"
                    autoFocus={false}
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select 
                    value={selectedItem.category}
                    onValueChange={(value) => onFieldChange('category', value)}
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
                    value={selectedItem.color}
                    onChange={(e) => onFieldChange('color', e.target.value)}
                    placeholder="Inserisci colore"
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

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} type="button">
            Annulla
          </Button>
          <Button onClick={onConfirm} className="gap-1">
            <Check className="h-4 w-4" /> Conferma
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InferenceDialog;
