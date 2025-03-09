import { useState, useRef } from "react";
import { Camera } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useImageCrop } from "@/hooks/item-selection";
import { ImageCropDialog } from "./image-crop";

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

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Tipo di file non valido",
        description: "Carica un'immagine (JPG, PNG, etc.).",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File troppo grande",
        description: "L'immagine deve essere inferiore a 5MB.",
        variant: "destructive",
      });
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    
    setSelectedImage(imageUrl);
    setCropDialogOpen(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    onAvatarChange(croppedImageUrl);

    toast({
      title: "Immagine profilo aggiornata",
      description: "La tua foto profilo è stata aggiornata con successo.",
    });

    setCropDialogOpen(false);
    setSelectedImage(null);
  };

  const handleCropCancel = () => {
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
        
        <div 
          className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-200 cursor-pointer ${
            isHoveringAvatar ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Camera className="w-6 h-6 text-white" />
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

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
