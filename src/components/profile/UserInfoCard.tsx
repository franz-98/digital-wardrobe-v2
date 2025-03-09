
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserPlus, Camera, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ImageCropDialog } from "./ImageCropDialog";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  isPremium: boolean;
  premiumUntil: string | null;
  referralCode?: string;
}

interface UserInfoCardProps {
  user: UserProfile;
}

const UserInfoCard = ({ user: initialUser }: UserInfoCardProps) => {
  const [user, setUser] = useState(initialUser);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);

  const copyReferralCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode)
        .then(() => {
          toast({
            title: "Codice di referral copiato!",
            description: "Condividilo con i tuoi amici per ottenere vantaggi.",
          });
        })
        .catch(() => {
          toast({
            title: "Impossibile copiare il codice",
            description: "Prova a copiarlo manualmente.",
            variant: "destructive",
          });
        });
    }
  };

  const shareInvite = () => {
    // Open the invite dialog
    setInviteDialogOpen(true);
  };

  const handleSendInvite = () => {
    if (!email.trim()) {
      toast({
        title: "Email richiesta",
        description: "Inserisci un indirizzo email valido.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      toast({
        title: "Email non valida",
        description: "Inserisci un indirizzo email valido.",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending invite
    toast({
      title: "Invito inviato!",
      description: `Il tuo amico ${email} riceverà presto un invito.`,
    });
    
    // Clear and close dialog
    setEmail("");
    setInviteDialogOpen(false);
  };

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
    setUser(prevUser => ({
      ...prevUser,
      avatarUrl: croppedImageUrl
    }));

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
    <Card className="overflow-hidden border">
      <div className="flex flex-col items-center p-6">
        <div 
          className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-background shadow-md mb-4"
          onMouseEnter={() => setIsHoveringAvatar(true)}
          onMouseLeave={() => setIsHoveringAvatar(false)}
          onClick={handleAvatarClick}
        >
          <img
            src={user?.avatarUrl}
            alt={user?.name}
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
        
        <h2 className="text-2xl font-bold">{user?.name}</h2>
        <p className="text-muted-foreground">{user?.email}</p>
        
        <div className="mt-6 w-full">
          <div className="py-2 px-4 bg-primary/5 rounded-full text-center mb-4">
            {user?.isPremium ? (
              <p className="text-sm">
                <span className="font-medium text-primary">Premium</span> subscription until{" "}
                {new Date(user.premiumUntil || "").toLocaleDateString()}
              </p>
            ) : (
              <p className="text-sm">
                <span className="font-medium">Free</span> account
              </p>
            )}
          </div>
          
          {!user?.isPremium && (
            <Button className="w-full h-12 rounded-xl shadow-sm interactive-scale mb-4">
              Upgrade to Premium
            </Button>
          )}

          <Card className="w-full p-4 border border-primary/20 bg-primary/5 rounded-xl mb-2">
            <div className="text-center mb-3">
              <h3 className="font-medium text-sm">Il tuo codice referral</h3>
              <p className="text-2xl font-bold text-primary my-1">{user?.referralCode}</p>
              <p className="text-xs text-muted-foreground">
                Invita amici e ricevi un mese premium + 3€ Amazon per ogni amico
              </p>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={copyReferralCode} 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 border-primary/30 text-primary hover:bg-primary/10"
              >
                Copia Codice
              </Button>
              
              <Button 
                onClick={shareInvite}
                className="w-full flex items-center justify-center gap-2"
              >
                <UserPlus className="h-4 w-4" /> Invita Amici
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Invite Friends Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invita un amico</DialogTitle>
            <DialogDescription>
              Invia un invito ai tuoi amici con il tuo codice referral per ottenere vantaggi.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Il tuo codice referral personale</p>
              <div className="flex items-center space-x-2">
                <Input value={user?.referralCode} readOnly className="bg-muted" />
                <Button onClick={copyReferralCode} variant="outline" size="sm">
                  Copia
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Email del tuo amico</p>
              <Input 
                type="email" 
                placeholder="amico@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleSendInvite}>
              Invia Invito
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
    </Card>
  );
};

export default UserInfoCard;
