
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

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

const UserInfoCard = ({ user }: UserInfoCardProps) => {
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

  return (
    <Card className="overflow-hidden border">
      <div className="flex flex-col items-center p-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-background shadow-md mb-4">
          <img
            src={user?.avatarUrl}
            alt={user?.name}
            className="w-full h-full object-cover"
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
                className="w-full flex items-center justify-center gap-2"
              >
                <UserPlus className="h-4 w-4" /> Invita Amici
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default UserInfoCard;
