
import React from "react";
import { WardrobeProvider } from "@/context/WardrobeContext";
import WardrobeContainer from "@/components/wardrobe/WardrobeContainer";

const WardrobePage = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col">
      <WardrobeProvider>
        <WardrobeContainer />
      </WardrobeProvider>
    </div>
  );
};

export default WardrobePage;
