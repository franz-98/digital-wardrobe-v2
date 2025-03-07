
import { useToast } from "@/hooks/use-toast";
import { WardrobeActionsProps } from "./types";

export function usePremiumActions({
  isPremium,
  setIsPremium
}: Pick<WardrobeActionsProps, "isPremium" | "setIsPremium">) {
  const { toast } = useToast();

  const togglePremium = () => {
    setIsPremium(!isPremium);
    toast({
      title: isPremium ? "Premium disabled" : "Premium enabled",
      description: isPremium 
        ? "You no longer have access to premium features" 
        : "You now have access to all premium features",
    });
  };

  return {
    togglePremium
  };
}
