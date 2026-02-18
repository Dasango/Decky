package com.decky.decks.services;


import com.decky.decks.persistence.models.Flashcard;
import com.decky.decks.persistence.repositories.FlashcardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FlashcardService {

    private final FlashcardRepository flashcardRepository;

    public Flashcard createFlashcard(Flashcard flashcard) {
        flashcard.setNextReviewDate(LocalDateTime.now());

        return flashcardRepository.save(flashcard);
    }

    public List<Flashcard> findAll(){
        return flashcardRepository.findAll();
    }
}