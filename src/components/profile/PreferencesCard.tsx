
import { Moon, Sun, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/ThemeProvider";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useWardrobe } from "@/hooks/useWardrobeState";

const PreferencesCard = () => {
  const { theme, setTheme } = useTheme();
  const { isPremium, togglePremium } = useWardrobe();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
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
            <div className="flex items-center gap-2">
              <p className="font-medium">Outfit Suggestions</p>
              {!isPremium && (
                <Badge variant="outline" className="text-xs py-0 h-5">
                  <span className="text-primary mr-1">Premium</span>
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!isPremium && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Upgrade to premium to access this feature</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <Switch 
                disabled={!isPremium} 
                checked={isPremium} 
                onCheckedChange={isPremium ? undefined : togglePremium}
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Get daily outfit recommendations</p>
        </div>
      </div>
    </Card>
  );
};

export default PreferencesCard;
