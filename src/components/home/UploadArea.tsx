
import React, { useRef } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadAreaProps {
  isUploading: boolean;
  onFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadArea = ({ isUploading, onFileSelected }: UploadAreaProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelected}
        accept="image/*"
        className="hidden"
        disabled={isUploading}
      />
      
      <Button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        size="lg"
        className="w-full h-16 rounded-xl shadow-sm interactive-scale"
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Plus className="mr-2 h-5 w-5" />
            Add New Item
          </>
        )}
      </Button>
    </div>
  );
};

export default UploadArea;
