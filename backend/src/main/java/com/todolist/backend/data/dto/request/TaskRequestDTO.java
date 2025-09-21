package com.todolist.backend.data.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public record TaskRequestDTO(
        @Size(min = 5, message = "Título deve conter no mínimo 5 caracteres.")
        @Size(max = 100, message = "Título deve conter no máximo 100 caracteres.")
        @NotBlank(message = "Título é obrigatório.")
        String title,

        @Size(min = 10, message = "Descrição deve conter no mínimo 10 caracteres.")
        @Size(max = 200, message = "Descrição deve conter no máximo 200 caracteres.")
        @NotBlank(message = "Descrição é obrigatória.")
        String description,

        @NotNull(message = "Data e hora são obrigatórias.")
        Instant dateTime,

        @NotNull(message = "Obrigatório informar se a tarefa está concluída.")
        Boolean completed,

        @NotBlank(message = "ID do usuário vinculado é obrigatório.")
        String userId
) {}