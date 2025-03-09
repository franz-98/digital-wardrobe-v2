
import { useState, useRef } from "react";
import { Camera } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useImageCrop } from "@/hooks/item-selection";
import { ImageCropDialog } from "./ImageCropDialog";

interface UserAvatarProps {
  avatarUrl: string;
  name: string;
  onAvatarChange: (newAvatarUrl: string) => void;
}

const UserAvatar = ({ avatarUrl, name, onAvatarChange }: UserAvatarProps) => {
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Tipo di file non valido",
        description: "Carica un'immagine (JPG, PNG, etc.).",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File troppo grande",
        description: "L'immagine deve essere inferiore a 5MB.",
        variant: "destructive",
      });
      return;
    }

    // Create object URL for the image
    const imageUrl = URL.createObjectURL(file);
    
    // Set the selected image and open crop dialog
    setSelectedImage(imageUrl);
    setCropDialogOpen(true);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    // Update user with new avatar URL
    onAvatarChange(croppedImageUrl);

    // Show success message
    toast({
      title: "Immagine profilo aggiornata",
      description: "La tua foto profilo è stata aggiornata con successo.",
    });

    // Close dialog and reset selected image
    setCropDialogOpen(false);
    setSelectedImage(null);
  };

  const handleCropCancel = () => {
    // Clean up the object URL to avoid memory leaks
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    
    setCropDialogOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div 
        className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-background shadow-md mb-4"
        onMouseEnter={() => setIsHoveringAvatar(true)}
        onMouseLeave={() => setIsHoveringAvatar(false)}
        onClick={handleAvatarClick}
      >
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay for profile picture edit */}
        <div 
          className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-200 cursor-pointer ${
            isHoveringAvatar ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Camera className="w-6 h-6 text-white" />
        </div>
        
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {/* Image Crop Dialog */}
      {selectedImage && (
        <ImageCropDialog
          imageUrl={selectedImage}
          open={cropDialogOpen}
          onOpenChange={setCropDialogOpen}
          onComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </>
  );
};

export default UserAvatar;
