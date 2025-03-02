
import { useQuery } from "@tanstack/react-query";
import { Loader2, Moon, Sun, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/ThemeProvider";
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

const ProfilePage = () => {
  const { theme, setTheme } = useTheme();
  
  // Fetch user data
  const { data: user, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      // Simulating API call
      const response = await fetch("/api/user");
      if (!response.ok) throw new Error("Failed to fetch user profile");
      return response.json() as Promise<UserProfile>;
    },
    placeholderData: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3",
      isPremium: false,
      premiumUntil: null,
      referralCode: "FRIEND2024",
    },
  });

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="text-center mb-6">
        <div className="inline-block mb-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-xs font-medium">
          My Account
        </div>
        <h1 className="text-3xl font-bold">Profile</h1>
      </header>

      <div className="space-y-6">
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

              {/* Referral Button */}
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

        <Card className="border">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4" />
                  <Switch 
                    checked={theme === "dark"}
                    onCheckedChange={toggleTheme}
                  />
                  <Moon className="h-4 w-4" />
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive style tips and recommendations</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Outfit Suggestions</p>
                  <p className="text-sm text-muted-foreground">Get daily outfit recommendations</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </Card>

        <Card className="border">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">About</h3>
            <div className="space-y-2">
              <p className="text-sm">
                Virtual Wardrobe App v1.0.0
              </p>
              <p className="text-sm text-muted-foreground">
                Designed and developed with love
              </p>
            </div>
            
            <div className="mt-6 space-y-2">
              <Button variant="outline" className="w-full">
                Privacy Policy
              </Button>
              <Button variant="outline" className="w-full">
                Terms of Service
              </Button>
              <Button variant="ghost" className="w-full text-destructive hover:text-destructive">
                Sign Out
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
