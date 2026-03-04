import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
        <div 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
            D
          </div>
          <h1 className="text-xl font-bold tracking-tight">Decky</h1>
        </div>

        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-1">
            <HeaderItem to="/dashboard" label="Dashboard" />
            <HeaderItem to="/decks" label="All Decks" />
          </nav>
          
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-sm font-semibold"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};

const HeaderItem = ({ to, label }: { to: string; label: string }) => (
  <NavLink 
    to={to}
    className={({ isActive }) => `
      px-4 py-2 rounded-lg text-sm font-bold transition-all
      ${isActive 
        ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' 
        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'}
    `}
  >
    {label}
  </NavLink>
);

export default Layout;
