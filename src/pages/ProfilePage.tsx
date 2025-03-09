
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import UserInfoCard from "@/components/profile/UserInfoCard";
import PreferencesCard from "@/components/profile/PreferencesCard";
import AboutCard from "@/components/profile/AboutCard";
import PrivacyPolicyDialog from "@/components/profile/PrivacyPolicyDialog";
import TermsOfServiceDialog from "@/components/profile/TermsOfServiceDialog";

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
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false);
  const [termsDialogOpen, setTermsDialogOpen] = useState(false);
  
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

  return (
    <div className="space-y-10 animate-fade-in">
      <ProfileHeader isLoading={isLoading} />
      
      {!isLoading && (
        <div className="space-y-6">
          <UserInfoCard user={user!} />
          <PreferencesCard />
          <AboutCard 
            onOpenPrivacyPolicy={() => setPrivacyDialogOpen(true)}
            onOpenTermsOfService={() => setTermsDialogOpen(true)}
          />
        </div>
      )}

      <PrivacyPolicyDialog 
        open={privacyDialogOpen} 
        onOpenChange={setPrivacyDialogOpen} 
      />
      <TermsOfServiceDialog 
        open={termsDialogOpen} 
        onOpenChange={setTermsDialogOpen} 
      />
    </div>
  );
};

export default ProfilePage;
