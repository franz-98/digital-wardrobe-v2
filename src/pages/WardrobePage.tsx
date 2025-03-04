
import React from "react";
import { WardrobeProvider } from "@/context/WardrobeContext";
import WardrobeContainer from "@/components/wardrobe/WardrobeContainer";

const WardrobePage = () => {
  return (
    <WardrobeProvider>
      <WardrobeContainer />
    </WardrobeProvider>
  );
};

export default WardrobePage;
