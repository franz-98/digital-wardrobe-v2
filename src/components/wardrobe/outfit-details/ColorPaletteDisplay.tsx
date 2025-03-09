
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { colorNameToHex } from "../utils/colorUtils";

interface ColorPaletteDisplayProps {
  colors: string[];
}

const ColorPaletteDisplay = ({ colors }: ColorPaletteDisplayProps) => {
  if (colors.length === 0) {
    return null;
  }

  return (
    <div>
      <h5 className="text-sm font-medium mb-2 flex items-center">
        Color palette
      </h5>
      <div className="flex gap-2">
        {colors.map((color, index) => {
          const hexColor = colorNameToHex(color);
          
          return (
            <Popover key={index}>
              <PopoverTrigger asChild>
                <div 
                  className="w-8 h-8 rounded-full border border-border/50 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all"
                  style={{ 
                    backgroundColor: color.toLowerCase(),
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                  }}
                />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{color}</p>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full border border-border/50"
                      style={{ backgroundColor: hexColor }}
                    />
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">{hexColor}</code>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          );
        })}
      </div>
    </div>
  );
};

export default ColorPaletteDisplay;
