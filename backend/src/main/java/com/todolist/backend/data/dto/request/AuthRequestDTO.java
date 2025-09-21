package com.todolist.backend.data.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AuthRequestDTO(
        @NotBlank(message = "E-mail é obrigatório.")
        @Email(message = "E-mail inválido.")
        @Size(max = 255, message = "E-mail deve ter no máximo 255 caracteres.")
        String email,

        @Size(min = 6, max = 70, message = "Senha deve conter entre 6 e 70 caracteres.")
        @NotBlank(message = "Senha é obrigatória.")
        String password
) {}
