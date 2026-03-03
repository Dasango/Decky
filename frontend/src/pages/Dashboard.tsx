import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BookOpen, Clock, Activity, Loader2, ChevronRight } from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const [decks, setDecks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [deckStats, setDeckStats] = useState<Record<string, number>>({});
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const deckList = await api.flashcards.getDecks();
        setDecks(deckList);
        
        const stats: Record<string, number> = {};
        await Promise.all(deckList.map(async (deckId) => {
          const sizeInfo = await api.flashcards.getDeckSize(deckId);
          stats[deckId] = sizeInfo.size;
        }));
        setDeckStats(stats);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  const totalCards = Object.values(deckStats).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, {userId?.split('_')[1]}!</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here's an overview of your progress.</p>
        </div>
        <button 
          onClick={() => navigate('/decks/new')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus size={20} />
          Create Deck
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<BookOpen className="text-blue-600" />} 
          label="Total Decks" 
          value={decks.length} 
          color="blue"
        />
        <StatCard 
          icon={<Activity className="text-indigo-600" />} 
          label="Total Cards" 
          value={totalCards} 
          color="indigo"
        />
        <StatCard 
          icon={<Clock className="text-emerald-600" />} 
          label="Ready Refresh" 
          value="12" 
          color="emerald"
        />
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Your Decks</h3>
          <button className="text-indigo-600 font-semibold hover:underline text-sm">View All</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map((deck) => (
            <div 
              key={deck}
              onClick={() => navigate(`/decks/${deck}`)}
              className="group cursor-pointer bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 group-hover:bg-indigo-500/10 rounded-full -mr-8 -mt-8 transition-colors" />
              
              <div className="relative space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                    <BookOpen size={24} />
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md">
                    {deckStats[deck] || 0} cards
                  </span>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg group-hover:text-indigo-600 transition-colors capitalize">{deck.replace(/-/g, ' ')}</h4>
                  <p className="text-slate-500 text-sm mt-1">Last studied 2 days ago</p>
                </div>

                <div className="flex items-center gap-1 text-indigo-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Study Now <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))}

          {decks.length === 0 && (
            <div className="col-span-full py-12 text-center bg-slate-50 dark:bg-slate-900/20 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-slate-500">No decks found. Create your first deck to get started!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-transform hover:scale-[1.02]">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl bg-${color}-50 dark:bg-${color}-900/20 flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
