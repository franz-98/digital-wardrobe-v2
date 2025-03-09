
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AboutCardProps {
  onOpenPrivacyPolicy: () => void;
  onOpenTermsOfService: () => void;
}

const AboutCard = ({ onOpenPrivacyPolicy, onOpenTermsOfService }: AboutCardProps) => {
  return (
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
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onOpenPrivacyPolicy}
          >
            Privacy Policy
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onOpenTermsOfService}
          >
            Terms of Service
          </Button>
          <Button variant="ghost" className="w-full text-destructive hover:text-destructive">
            Sign Out
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AboutCard;
