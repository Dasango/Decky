export interface User {
  id: string;
  username: string;
}

export interface Flashcard {
  id: string;
  userId: string;
  deckId: string;
  frontText: string;
  backText: string;
  tags: string[];
  extraInfo: Record<string, any>;
  nextReviewDate: number | null;
  easeFactor: number;
  interval: number;
  repetitions: number;
}

export interface Session {
  userId: string;
  flashcardsToReview: Flashcard[];
  cardsReviewedToday: number;
}

export interface DeckSize {
  deckId: string;
  size: number;
}

export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;
