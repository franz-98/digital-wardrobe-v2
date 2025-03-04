
import { useQuery } from "@tanstack/react-query";
import { RecentUpload } from "@/components/home/types";

export const useRecentUploads = () => {
  return useQuery({
    queryKey: ["recentUploads"],
    queryFn: async () => {
      const response = await fetch("/api/recent");
      if (!response.ok) throw new Error("Failed to fetch recent uploads");
      return response.json() as Promise<RecentUpload[]>;
    },
    placeholderData: [
      {
        id: "1",
        name: "Blue T-Shirt",
        imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3",
        category: "Tops",
        createdAt: "2023-11-01T00:00:00Z",
      },
      {
        id: "2",
        name: "Black Jeans",
        imageUrl: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3",
        category: "Bottoms",
        createdAt: "2023-11-02T00:00:00Z",
      },
      {
        id: "3",
        name: "White Sneakers",
        imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3",
        category: "Footwear",
        createdAt: "2023-11-03T00:00:00Z",
      },
    ],
  });
};
