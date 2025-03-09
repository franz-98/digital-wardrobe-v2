
import { useState } from "react";
import { Card } from "@/components/ui/card";
import UserAvatar from "./UserAvatar";
import PremiumStatusBadge from "./PremiumStatusBadge";
import ReferralCodeCard from "./ReferralCodeCard";

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

const UserInfoCard = ({ user: initialUser }: UserInfoCardProps) => {
  const [user, setUser] = useState(initialUser);

  const handleAvatarChange = (newAvatarUrl: string) => {
    setUser(prevUser => ({
      ...prevUser,
      avatarUrl: newAvatarUrl
    }));
  };

  return (
    <Card className="overflow-hidden border">
      <div className="flex flex-col items-center p-6">
        <UserAvatar 
          avatarUrl={user.avatarUrl}
          name={user.name}
          onAvatarChange={handleAvatarChange}
        />
        
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-muted-foreground">{user.email}</p>
        
        <div className="mt-6 w-full">
          <PremiumStatusBadge 
            isPremium={user.isPremium} 
            premiumUntil={user.premiumUntil}
          />
          
          <ReferralCodeCard referralCode={user.referralCode} />
        </div>
      </div>
    </Card>
  );
};

export default UserInfoCard;
