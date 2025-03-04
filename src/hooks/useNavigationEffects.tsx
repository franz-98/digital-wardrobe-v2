
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function useNavigationEffects() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
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
