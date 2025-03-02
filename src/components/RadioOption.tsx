
import React from "react";
import { Button } from "@/components/ui/button";

interface RadioOptionProps {
  value: string;
  currentValue: string;
  onChange: (value: string) => void;
  label: string;
}

const RadioOption = ({ value, currentValue, onChange, label }: RadioOptionProps) => {
  const isSelected = currentValue === value;
  
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={`w-full justify-start ${isSelected ? 'bg-primary/10 text-primary' : ''}`}
      onClick={() => onChange(value)}
    >
      <div className="flex items-center">
        <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${isSelected ? 'border-primary' : 'border-muted-foreground'}`}>
          {isSelected && <div className="w-2 h-2 rounded-full bg-primary" />}
        </div>
        <span>{label}</span>
      </div>
    </Button>
  );
};

export default RadioOption;
