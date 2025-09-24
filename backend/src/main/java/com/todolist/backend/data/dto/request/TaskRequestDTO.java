package com.todolist.backend.data.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public record TaskRequestDTO(
        @NotBlank(message = "Título é obrigatório.")
        String title,

        @NotBlank(message = "Descrição é obrigatória.")
        String description,

        @NotNull(message = "Data e hora são obrigatórias.")
        Instant dateTime,

        @NotNull(message = "Obrigatório informar se a tarefa está concluída.")
        Boolean completed,

        @NotBlank(message = "ID do usuário vinculado é obrigatório.")
        String userId
) {}