import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Library, PlayCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return <>{children}</>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 h-screen">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
            D
          </div>
          <h1 className="text-xl font-bold tracking-tight">Decky</h1>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem to="/decks" icon={<Library size={20} />} label="Decks" />
          <NavItem to="/study" icon={<PlayCircle size={20} />} label="Study" />
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <NavLink 
    to={to}
    className={({ isActive }) => `
      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
      ${isActive 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'}
    `}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </NavLink>
);

export default Layout;
