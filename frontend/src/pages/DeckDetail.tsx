import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Trash2, Edit3, Loader2, ChevronLeft, BookMarked, Tag as TagIcon } from 'lucide-react';
import { api } from '../lib/api';
import type { Flashcard } from '../lib/types';

const DeckDetail: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      if (!deckId) return;
      try {
        const data = await api.flashcards.getDeckContent(deckId);
        setCards(data);
      } catch (err) {
        console.error('Failed to fetch cards', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [deckId]);

  const filteredCards = cards.filter(card => 
    card.frontText.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.backText.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = async (id: string) => {
    if (!deckId) return;
    if (confirm('Are you sure you want to delete this card?')) {
      try {
        await api.flashcards.delete(deckId, id);
        setCards(prev => prev.filter(c => c.id !== id));
      } catch (err) {
        alert('Failed to delete card');
      }
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-4">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium text-sm"
        >
          <ChevronLeft size={16} /> Back to Dashboard
        </button>
        
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight capitalize">{deckId?.replace(/-/g, ' ')}</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">{cards.length} flashcards in this deck</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate(`/study?deckId=${deckId}`)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <BookMarked size={20} />
              Study Now
            </button>
            <button 
              onClick={() => navigate(`/decks/${deckId}/add`)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-slate-900 dark:text-white px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-grow group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search cards, concepts, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <button className="px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800">
            <Filter size={20} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {filteredCards.map((card) => (
          <div 
            key={card.id}
            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all flex items-center justify-between"
          >
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Front</span>
                <p className="font-semibold text-lg leading-snug">{card.frontText}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Back</span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{card.backText}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 ml-8">
              <div className="flex gap-1">
                {card.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full font-bold">
                    <TagIcon size={10} /> {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 border-l border-slate-100 dark:border-slate-800 pl-4">
                <button 
                  onClick={() => navigate(`/decks/${deckId}/edit/${card.id}`)}
                  className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  <Edit3 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(card.id)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredCards.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-500">No cards found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckDetail;
