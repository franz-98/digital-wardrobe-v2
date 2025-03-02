
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Send, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

interface UserStatus {
  isPremium: boolean;
  name: string;
}

const ChatPage = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch user status
  const { data: userStatus, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      // Simulating API call
      const response = await fetch("/api/user");
      if (!response.ok) throw new Error("Failed to fetch user status");
      return response.json() as Promise<UserStatus>;
    },
    placeholderData: {
      isPremium: false, // Set to true to see the chat interface
      name: "John Doe",
    },
  });

  // Fetch chat messages
  const { data: chatMessages, isLoading: isLoadingMessages } = useQuery({
    queryKey: ["chat"],
    queryFn: async () => {
      // Simulating API call
      const response = await fetch("/api/chat");
      if (!response.ok) throw new Error("Failed to fetch chat messages");
      return response.json() as Promise<Message[]>;
    },
    placeholderData: [
      {
        id: "1",
        sender: "ai",
        text: "Hello! How can I help you with your wardrobe today?",
        timestamp: "2023-11-05T09:00:00Z",
      },
    ],
    enabled: userStatus?.isPremium || false,
  });

  // Set initial messages when data is loaded
  useEffect(() => {
    if (chatMessages && userStatus?.isPremium) {
      setMessages(chatMessages);
    }
  }, [chatMessages, userStatus?.isPremium]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || !userStatus?.isPremium) return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsSending(true);
    
    try {
      // Simulating API call
      // In real implementation, send to /api/chat
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "I've analyzed your wardrobe and can suggest some great outfit combinations with your recent uploads. Would you like to see them?",
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  // Loading state
  if (isLoadingUser) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Free tier view
  if (!userStatus?.isPremium) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4 animate-fade-in">
        <div className="flex flex-col items-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Lock className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Premium Feature</h1>
          <p className="text-muted-foreground mb-6">
            Chat with our AI stylist to get personalized outfit recommendations, style tips, and more.
          </p>
          <Button size="lg" className="w-full h-12 rounded-xl shadow-sm interactive-scale">
            Upgrade to Premium
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[85vh] animate-fade-in">
      <header className="text-center mb-6">
        <div className="inline-block mb-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-xs font-medium">
          AI Stylist
        </div>
        <h1 className="text-3xl font-bold">Style Assistant</h1>
      </header>

      <Card className="flex-1 flex flex-col overflow-hidden border glassmorphism">
        <div className="flex-1 overflow-y-auto p-4">
          {isLoadingMessages ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <div className="border-t bg-background/80">
          <form onSubmit={handleSendMessage} className="p-4 flex items-center space-x-2">
            <Input
              placeholder="Ask about outfit suggestions, style tips, etc."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1"
              disabled={isSending}
            />
            <Button type="submit" size="icon" disabled={isSending || !inputMessage.trim()}>
              {isSending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ChatPage;
