
import React from "react";

const HomeHeader = () => {
  return (
    <header className="w-full text-center mb-6">
      <div className="inline-block mb-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-xs font-medium">
        My Wardrobe
      </div>
      <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
      <p className="text-muted-foreground">Add new items or browse your recent uploads</p>
    </header>
  );
};

export default HomeHeader;
