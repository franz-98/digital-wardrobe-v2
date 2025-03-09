
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function useNavigationEffects() {
  // Safely try to use router hooks - will throw if not in Router context
  let navigate;
  let location;
  
  try {
    navigate = useNavigate();
    location = useLocation();
  } catch (error) {
    console.warn("Navigation hooks unavailable: not in a Router context");
    return { navigate: null, location: null };
  }
  
  const { toast } = useToast();

  useEffect(() => {
    if (!location) return;
    
    const params = new URLSearchParams(location.search);
    if (params.get("newItem") === "true") {
      toast({
        title: "New item added!",
        description: "Your new clothing item has been successfully added.",
      });
      navigate("/wardrobe", { replace: true });
    }
  }, [location, toast, navigate]);

  return { navigate, location };
}
