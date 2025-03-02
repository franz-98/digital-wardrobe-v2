
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, ShoppingBag, MessageSquare, User } from "lucide-react";

const Layout = () => {
  const location = useLocation();
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  
  // Page transition effect
  useEffect(() => {
    setIsPageTransitioning(true);
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 container px-4 pb-20 pt-6 max-w-5xl mx-auto">
        <div
          className={`transition-all duration-300 ease-in-out transform ${
            isPageTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <Outlet />
        </div>
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border h-16 z-10 glassmorphism">
        <div className="flex items-center justify-around h-full max-w-md mx-auto px-6">
          <NavItem to="/" icon={<Home size={24} />} label="Home" />
          <NavItem to="/wardrobe" icon={<ShoppingBag size={24} />} label="Wardrobe" />
          <NavItem to="/chat" icon={<MessageSquare size={24} />} label="Chat" />
          <NavItem to="/profile" icon={<User size={24} />} label="Profile" />
        </div>
      </nav>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center px-2 py-1 rounded-full transition-all duration-200 ${
          isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`
      }
    >
      <div className="relative">
        <div className="transition-transform duration-200 ease-out transform">
          {icon}
        </div>
      </div>
      <span className="text-xs mt-1 font-medium">{label}</span>
    </NavLink>
  );
};

export default Layout;
