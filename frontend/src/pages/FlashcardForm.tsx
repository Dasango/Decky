import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Save, Plus, X, Tag as TagIcon, Loader2 } from 'lucide-react';
import { api } from '../lib/api';

const FlashcardForm: React.FC = () => {
  const { deckId, id } = useParams<{ deckId: string; id?: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const [extraInfo, setExtraInfo] = useState<Record<string, string>>({});
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit && deckId) {
      const fetchCard = async () => {
        try {
          const cards = await api.flashcards.getDeckContent(deckId);
          const card = cards.find(c => c.id === id);
          if (card) {
            setFrontText(card.frontText);
            setBackText(card.backText);
            setExtraInfo(card.extraInfo || {});
            setTags(card.tags || []);
          }
        } catch (err) {
          console.error('Failed to fetch card', err);
        }
      };
      fetchCard();
    }
  }, [id, deckId, isEdit]);

  const handleAddExtra = () => {
    if (newKey && newValue) {
      setExtraInfo({ ...extraInfo, [newKey]: newValue });
      setNewKey('');
      setNewValue('');
    }
  };

  const removeExtra = (key: string) => {
    const next = { ...extraInfo };
    delete next[key];
    setExtraInfo(next);
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deckId) return;

    setLoading(true);
    const body = {
      deckId,
      frontText,
      backText,
      tags,
      extraInfo
    };

    try {
      if (isEdit) {
        await api.flashcards.update(id!, body);
      } else {
        await api.flashcards.create(body);
      }
      
      // Flush session cache
      try {
        await api.sessions.delete(deckId);
      } catch (flushErr) {
        console.warn('Failed to flush session cache', flushErr);
      }

      navigate(`/decks/${deckId}`);
    } catch (err) {
      alert('Failed to save flashcard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-4">
        <button 
          onClick={() => navigate(`/decks/${deckId}`)}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium text-sm"
        >
          <ChevronLeft size={16} /> Back to Deck
        </button>
        <h2 className="text-3xl font-bold tracking-tight">{isEdit ? 'Edit Flashcard' : 'Create New Flashcard'}</h2>
        <p className="text-slate-500">Add content to your {deckId?.replace(/-/g, ' ')} deck.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">Front Text (Question)</label>
            <textarea
              required
              value={frontText}
              onChange={(e) => setFrontText(e.target.value)}
              className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[100px] text-lg font-medium"
              placeholder="e.g. What is the capital of France?"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">Back Text (Answer)</label>
            <textarea
              required
              value={backText}
              onChange={(e) => setBackText(e.target.value)}
              className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[100px] text-lg font-medium"
              placeholder="e.g. Paris"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">Extra Info</label>
            <div className="space-y-2 mb-3">
              {Object.entries(extraInfo).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl">
                  <span className="font-bold text-xs uppercase text-indigo-500 min-w-[60px]">{key}:</span>
                  <span className="text-sm flex-grow">{value}</span>
                  <button type="button" onClick={() => removeExtra(key)} className="text-slate-400 hover:text-red-500">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="w-1/3 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                placeholder="Key (e.g. Example)"
              />
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="flex-grow p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                placeholder="Value"
              />
              <button 
                type="button" 
                onClick={handleAddExtra}
                className="px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map(tag => (
                <span key={tag} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold text-sm">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <TagIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Add a tag..."
                />
              </div>
              <button 
                type="button" 
                onClick={handleAddTag}
                className="px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(`/decks/${deckId}`)}
            className="px-8 py-4 text-slate-500 font-bold hover:text-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {isEdit ? 'Save Changes' : 'Create Flashcard'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlashcardForm;
