
import { Loader2 } from "lucide-react";

interface ProfileHeaderProps {
  isLoading: boolean;
}

const ProfileHeader = ({ isLoading }: ProfileHeaderProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <header className="text-center mb-6">
      <div className="inline-block mb-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-xs font-medium">
        My Account
      </div>
      <h1 className="text-3xl font-bold">Profile</h1>
    </header>
  );
};

export default ProfileHeader;
