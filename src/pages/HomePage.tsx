
import { useState, useRef } from "react";
import { Plus, Loader2, Image } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

interface RecentUpload {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

const HomePage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch recent uploads
  const { data: recentUploads, isLoading } = useQuery({
    queryKey: ["recentUploads"],
    queryFn: async () => {
      // Simulating API call
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Create FormData
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Simulating API call
      // In real implementation, send to /api/upload
      await new Promise(resolve => setTimeout(resolve, 1500)); // simulate upload delay
      
      toast({
        title: "Upload successful",
        description: "Your item has been added to your wardrobe.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRecentItemClick = (item: RecentUpload) => {
    toast({
      title: "Item selected",
      description: `You selected: ${item.name}`,
    });
  };

  return (
    <div className="flex flex-col items-center space-y-10 animate-fade-in">
      <header className="w-full text-center mb-6">
        <div className="inline-block mb-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-xs font-medium">
          My Wardrobe
        </div>
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Add new items or browse your recent uploads</p>
      </header>

      <div className="w-full">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          disabled={isUploading}
        />
        
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          size="lg"
          className="w-full h-16 rounded-xl shadow-sm interactive-scale"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-5 w-5" />
              Add New Item
            </>
          )}
        </Button>

        {/* Spiegazione del riconoscimento vestiti */}
        <Card className="p-4 mt-4 border bg-secondary/10">
          <h3 className="font-medium text-sm mb-2">Come funziona il riconoscimento vestiti</h3>
          <p className="text-sm text-muted-foreground mb-2">
            La nostra app è in grado di riconoscere automaticamente i singoli indumenti presenti in un'immagine.
          </p>
          <div className="text-sm space-y-2">
            <div className="flex items-start">
              <div className="min-w-[24px] h-6 flex justify-center">
                <div className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">1</div>
              </div>
              <p className="ml-2">Puoi caricare un singolo indumento per aggiungerlo al tuo guardaroba</p>
            </div>
            <div className="flex items-start">
              <div className="min-w-[24px] h-6 flex justify-center">
                <div className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">2</div>
              </div>
              <p className="ml-2"><strong>Consigliato:</strong> Carica un outfit completo e l'app riconoscerà automaticamente ogni pezzo</p>
            </div>
            <div className="flex items-start">
              <div className="min-w-[24px] h-6 flex justify-center">
                <div className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">3</div>
              </div>
              <p className="ml-2">Accetta o modifica i risultati del riconoscimento prima di salvarli</p>
            </div>
          </div>
        </Card>

        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Uploads</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              See All
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex space-x-4">
                {recentUploads?.map((item) => (
                  <RecentItemCard 
                    key={`recent-${item.id}`} 
                    item={item} 
                    onClick={() => handleRecentItemClick(item)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RecentItemCard = ({ 
  item, 
  onClick 
}: { 
  item: RecentUpload; 
  onClick: () => void;
}) => {
  return (
    <Card 
      className="min-w-[160px] max-w-[160px] overflow-hidden card-shadow border interactive-scale cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden bg-secondary/30">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <p className="font-medium text-sm truncate">{item.name}</p>
        <p className="text-xs text-muted-foreground">{item.category}</p>
      </div>
    </Card>
  );
};

export default HomePage;
