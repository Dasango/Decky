package com.decky.decks.web.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class FlashcardDto {

    public record ReviewBatchRequest(
            @NotBlank(message = "El ID del mazo (deck) es obligatorio y no puede estar vacío")
            String deck,

            @NotNull(message = "El tamaño (size) es obligatorio")
            @Min(value = 1, message = "El tamaño del lote debe ser de al menos 1 tarjeta")
            Integer size
    ) {}
}
