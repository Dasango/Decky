import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, ChevronLeft, Sparkles, AlertCircle, Info } from 'lucide-react';
import { api } from '../lib/api';
import type { Session, ReviewQuality } from '../lib/types';

const StudySession: React.FC = () => {
  const [searchParams] = useSearchParams();
  const deckId = searchParams.get('deckId');
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFinished, setShowFinished] = useState(false);
  const navigate = useNavigate();

  const fetchSession = useCallback(async () => {
    if (!deckId) {
      setError('No deck selected for study');
      setLoading(false);
      return;
    }

    try {
      const data = await api.sessions.get(deckId);
      setSession(data);
      if (data.flashcardsToReview.length === 0) {
        setShowFinished(true);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to start study session');
    } finally {
      setLoading(false);
    }
  }, [deckId]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const handleReview = async (quality: ReviewQuality) => {
    if (!session || !deckId) return;
    
    const currentCard = session.flashcardsToReview[currentIndex];
    
    try {
      await api.sessions.submitReview(currentCard.id, quality);
      
      if (currentIndex + 1 < session.flashcardsToReview.length) {
        setIsFlipped(false);
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
        }, 300);
      } else {
        setShowFinished(true);
      }
    } catch (err) {
      alert('Failed to submit review');
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl border border-red-100 dark:border-red-900/50 flex items-center gap-3">
          <AlertCircle size={24} />
          <p className="font-semibold">{error}</p>
        </div>
        <button onClick={() => navigate('/dashboard')} className="text-indigo-600 font-bold hover:underline">
          Return to Dashboard
        </button>
      </div>
    );
  }

  if (showFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-8 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-indigo-600 text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/40">
          <Sparkles size={48} />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold">Session Complete!</h2>
          <p className="text-slate-500 mt-2">You've reviewed all cards due in this deck.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
          >
            Dashboard
          </button>
          <button 
            onClick={() => {
              setShowFinished(false);
              setCurrentIndex(0);
              fetchSession();
            }}
            className="px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold rounded-xl transition-all hover:bg-slate-50 active:scale-95"
          >
            Review Again
          </button>
        </div>
      </div>
    );
  }

  const currentCard = session!.flashcardsToReview[currentIndex];
  const progress = ((currentIndex) / session!.flashcardsToReview.length) * 100;

  return (
    <div className="max-w-3xl mx-auto h-full flex flex-col space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <button 
          onClick={() => navigate(`/decks/${deckId}`)}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium"
        >
          <ChevronLeft size={20} /> Exit Session
        </button>
        <div className="flex flex-col items-end">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Progress</span>
          <span className="text-lg font-black text-indigo-600">{currentIndex + 1} / {session?.flashcardsToReview.length}</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full bg-indigo-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Flashcard Component */}
      <div className="flex-grow flex items-center justify-center perspective-1000">
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className={`relative w-full aspect-[16/10] max-h-[400px] cursor-pointer transition-all duration-700 preserve-3d shadow-2xl rounded-[2.5rem] 
            ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800">
            <span className="absolute top-8 left-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Question</span>
            <p className="text-4xl font-bold text-center leading-tight">{currentCard.frontText}</p>
            <p className="absolute bottom-8 text-xs font-bold text-indigo-500/50 animate-pulse">Click to flip</p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 flex flex-col items-center justify-center border-2 border-indigo-500/30 rotate-y-180">
            <span className="absolute top-8 left-8 text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">Answer</span>
            <p className="text-4xl font-bold text-center leading-tight">{currentCard.backText}</p>
            {currentCard.extraInfo?.example && (
              <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-start gap-4 max-w-md">
                <Info size={20} className="text-indigo-400 shrink-0 mt-1" />
                <p className="text-sm text-slate-500 italic">"{currentCard.extraInfo.example}"</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={`transition-all duration-500 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <div className="space-y-4">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">How well did you recall this?</p>
          <div className="flex gap-2 sm:gap-4 justify-center">
            <QualityButton value={0} label="Again" color="red" onClick={() => handleReview(0)} />
            <QualityButton value={3} label="Hard" color="orange" onClick={() => handleReview(3)} />
            <QualityButton value={4} label="Good" color="indigo" onClick={() => handleReview(4)} />
            <QualityButton value={5} label="Perfect" color="emerald" onClick={() => handleReview(5)} />
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

const QualityButton = ({ value, label, color, onClick }: { value: number; label: string; color: string; onClick: () => void }) => {
  const colors: Record<string, string> = {
    red: 'bg-red-50 text-red-600 border-red-100 hover:bg-red-600 hover:text-white',
    orange: 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-600 hover:text-white',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-600 hover:text-white',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white'
  };

  return (
    <button 
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`flex flex-col items-center gap-1 px-4 py-3 rounded-2xl border transition-all active:scale-90 flex-1 sm:flex-none sm:min-w-[100px] ${colors[color]}`}
    >
      <span className="text-lg font-black">{value}</span>
      <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
    </button>
  );
};

export default StudySession;
