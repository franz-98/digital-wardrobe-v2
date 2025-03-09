
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyPolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrivacyPolicyDialog = ({ open, onOpenChange }: PrivacyPolicyDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader className="relative">
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogClose className="absolute right-0 top-0">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <ScrollArea className="flex-1 mt-4 max-h-[60vh]">
          <div className="space-y-4 pr-4">
            <h2 className="text-lg font-semibold">Virtual Wardrobe Privacy Policy</h2>
            <p className="text-muted-foreground">Last Updated: March 2025</p>

            <div className="space-y-4">
              <section>
                <h3 className="text-base font-medium">1. Introduction</h3>
                <p>
                  Welcome to Virtual Wardrobe. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>
              </section>

              <section>
                <h3 className="text-base font-medium">2. Data We Collect</h3>
                <p>
                  We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Identity Data includes first name, last name, username</li>
                  <li>Contact Data includes email address</li>
                  <li>Technical Data includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform</li>
                  <li>Usage Data includes information about how you use our website and services</li>
                  <li>Wardrobe Data includes images and descriptions of clothing items you upload</li>
                </ul>
              </section>

              <section>
                <h3 className="text-base font-medium">3. How We Use Your Data</h3>
                <p>
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>To register you as a new customer</li>
                  <li>To provide and improve our service</li>
                  <li>To manage our relationship with you</li>
                  <li>To administer and protect our business and website</li>
                  <li>To make suggestions and recommendations about services that may be of interest to you</li>
                </ul>
              </section>

              <section>
                <h3 className="text-base font-medium">4. Data Security</h3>
                <p>
                  We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                </p>
              </section>

              <section>
                <h3 className="text-base font-medium">5. Data Retention</h3>
                <p>
                  We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                </p>
              </section>

              <section>
                <h3 className="text-base font-medium">6. Your Legal Rights</h3>
                <p>
                  Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Request access to your personal data</li>
                  <li>Request correction of your personal data</li>
                  <li>Request erasure of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing your personal data</li>
                  <li>Request transfer of your personal data</li>
                  <li>Right to withdraw consent</li>
                </ul>
              </section>

              <section>
                <h3 className="text-base font-medium">7. Contact Us</h3>
                <p>
                  If you have any questions about this privacy policy or our privacy practices, please contact us at:
                  <br />
                  Email: privacy@virtualwardrobe.example.com
                </p>
              </section>
            </div>
          </div>
        </ScrollArea>
        
        <div className="flex justify-end pt-4 mt-2 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicyDialog;
