
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ReferralCodeCardProps {
  referralCode?: string;
}

const ReferralCodeCard = ({ referralCode }: ReferralCodeCardProps) => {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [email, setEmail] = useState("");

  const copyReferralCode = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode)
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

  return (
    <>
      <Card className="w-full p-4 border border-primary/20 bg-primary/5 rounded-xl mb-2">
        <div className="text-center mb-3">
          <h3 className="font-medium text-sm">Il tuo codice referral</h3>
          <p className="text-2xl font-bold text-primary my-1">{referralCode}</p>
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
                <Input value={referralCode} readOnly className="bg-muted" />
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
    </>
  );
};

export default ReferralCodeCard;
