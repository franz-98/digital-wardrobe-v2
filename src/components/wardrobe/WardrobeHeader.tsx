
import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const WardrobeHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">My Wardrobe</h1>
      <Button onClick={() => navigate("/add-item")}>
        <Plus className="mr-2 h-4 w-4" />
        Add Item
      </Button>
    </div>
  );
};

export default WardrobeHeader;
