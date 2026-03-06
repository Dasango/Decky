import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Brain } from "lucide-react";

export function TopNavBar() {
  const { token, logout } = useAuthStore();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
          <Brain className="h-6 w-6 text-slate-900" />
          <span className="text-xl font-bold tracking-tight text-slate-900">Decky</span>
        </Link>

        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <Button variant="ghost" asChild className="text-slate-600">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => logout()}
                className="border-slate-200 text-slate-900 hover:bg-slate-50"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="text-slate-600">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="bg-slate-900 text-white hover:bg-slate-800">
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
