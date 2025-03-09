
import { Button } from "@/components/ui/button";

interface PremiumStatusBadgeProps {
  isPremium: boolean;
  premiumUntil: string | null;
}

const PremiumStatusBadge = ({ isPremium, premiumUntil }: PremiumStatusBadgeProps) => {
  return (
    <div className="w-full">
      <div className="py-2 px-4 bg-primary/5 rounded-full text-center mb-4">
        {isPremium ? (
          <p className="text-sm">
            <span className="font-medium text-primary">Premium</span> subscription until{" "}
            {new Date(premiumUntil || "").toLocaleDateString()}
          </p>
        ) : (
          <p className="text-sm">
            <span className="font-medium">Free</span> account
          </p>
        )}
      </div>
      
      {!isPremium && (
        <Button className="w-full h-12 rounded-xl shadow-sm interactive-scale mb-4">
          Upgrade to Premium
        </Button>
      )}
    </div>
  );
};

export default PremiumStatusBadge;
