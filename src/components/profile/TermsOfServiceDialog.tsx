
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

interface TermsOfServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TermsOfServiceDialog = ({ open, onOpenChange }: TermsOfServiceDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader className="relative">
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogClose className="absolute right-0 top-0">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <ScrollArea className="flex-1 px-1">
          <div className="space-y-4 py-4 text-sm">
            <h2 className="text-lg font-semibold">Virtual Wardrobe Terms of Service</h2>
            <p className="text-muted-foreground">Last Updated: March 2025</p>

            <div className="space-y-4">
              <section>
                <h3 className="text-base font-medium">1. Acceptance of Terms</h3>
                <p>
                  By accessing or using the Virtual Wardrobe service, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                </p>
              </section>

              <section>
                <h3 className="text-base font-medium">2. Description of Service</h3>
                <p>
                  Virtual Wardrobe provides a platform for users to digitally catalog, organize, and manage their clothing items and outfits. Our service allows you to upload photos, create combinations, track wear history, and receive suggestions.
                </p>
              </section>

              <section>
                <h3 className="text-base font-medium">3. User Accounts</h3>
                <p>
                  To use certain features of our service, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Provide accurate and complete information when creating your account</li>
                  <li>Update your information to keep it accurate and current</li>
                  <li>Protect your account password and restrict access to your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
              </section>

              <section>
                <h3 className="text-base font-medium">4. User Content</h3>
                <p>
                  Our service allows you to upload, store, and share content, including photos of clothing items. You retain all rights to your content, but you grant us a license to use, reproduce, and display your content in connection with providing and improving our service.
                </p>
                <p className="mt-2">
                  You are solely responsible for the content you upload and share. You agree not to upload content that:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Infringes on the intellectual property rights of others</li>
                  <li>Contains illegal, harmful, or objectionable material</li>
                  <li>Impersonates another person or entity</li>
                  <li>Contains viruses or other harmful code</li>
                </ul>
              </section>

              <section>
                <h3 className="text-base font-medium">5. Premium Services</h3>
                <p>
                  Virtual Wardrobe offers both free and premium subscription services. Premium features are only available to users with an active premium subscription. Payment terms, renewal policies, and cancellation procedures are outlined at the time of subscription.
                </p>
              </section>

              <section>
                <h3 className="text-base font-medium">6. Termination</h3>
                <p>
                  We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach the Terms of Service.
                </p>
              </section>

              <section>
                <h3 className="text-base font-medium">7. Limitation of Liability</h3>
                <p>
                  In no event shall Virtual Wardrobe, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                </p>
              </section>

              <section>
                <h3 className="text-base font-medium">8. Changes to Terms</h3>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of changes by posting the updated terms on this page. Your continued use of the service after any such changes constitutes your acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h3 className="text-base font-medium">9. Contact Us</h3>
                <p>
                  If you have any questions about these Terms, please contact us at:
                  <br />
                  Email: terms@virtualwardrobe.example.com
                </p>
              </section>
            </div>
          </div>
        </ScrollArea>
        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfServiceDialog;
