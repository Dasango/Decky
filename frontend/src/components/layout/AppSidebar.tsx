import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  LogOut, 
  Brain,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
];

export function AppSidebar() {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-200">
      <SidebarHeader className="h-16 flex items-center px-4 border-b border-slate-100">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-xl tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
            <Brain className="h-5 w-5" />
          </div>
          <span className="group-data-[collapsible=icon]:hidden text-slate-900">Decky</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarMenu className="px-2 py-4">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.url}
                tooltip={item.title}
                className="hover:bg-slate-50 data-[active=true]:bg-slate-100 data-[active=true]:text-slate-900 text-slate-500 h-10"
              >
                <Link to={item.url}>
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-100 p-4 bg-white">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="h-12 hover:bg-slate-50 transition-colors">
              <Avatar className="h-8 w-8 border border-slate-200">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-slate-100 text-slate-600 uppercase">
                  {user?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm group-data-[collapsible=icon]:hidden">
                <span className="font-medium text-slate-900">{user || 'User'}</span>
                <span className="text-xs text-slate-400">Personal Account</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-56 border-slate-200">
            <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
