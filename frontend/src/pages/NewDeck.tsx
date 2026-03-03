import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Book, Info } from 'lucide-react';

const NewDeck: React.FC = () => {
  const [deckName, setDeckName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deckName) {
      // In this microservices setup, a deck is created by adding a card to it
      const slug = deckName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      navigate(`/decks/${slug}/add`);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-4">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium text-sm"
        >
          <ChevronLeft size={16} /> Back to Dashboard
        </button>
        <h2 className="text-3xl font-bold tracking-tight">Create New Deck</h2>
        <p className="text-slate-500">Give your new deck a name to get started.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">Deck Name</label>
            <div className="relative group">
              <Book className="absolute left-4 top-1/2 -translate-y-1-2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input
                required
                autoFocus
                type="text"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-lg font-bold"
                placeholder="e.g. Spanish Vocabulary"
              />
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-start gap-4">
            <Info size={20} className="shrink-0 mt-1" />
            <p className="text-sm">After creating the deck, you'll be redirected to add your first flashcard!</p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Create Deck & Add Card
        </button>
      </form>
    </div>
  );
};

export default NewDeck;
