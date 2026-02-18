package com.decky.decks.web;

import com.decky.decks.persistence.models.Flashcard;
import com.decky.decks.services.FlashcardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flashcards")
@RequiredArgsConstructor
public class FlashcardController {

    private final FlashcardService flashcardService;

    @PostMapping
    public ResponseEntity<Flashcard> create(@RequestBody Flashcard flashcard) {
        Flashcard savedFlashcard = flashcardService.createFlashcard(flashcard);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFlashcard);
    }

    @GetMapping
    public ResponseEntity<List<Flashcard>> findAll(){
        return ResponseEntity.ok(flashcardService.findAll());
    }
}