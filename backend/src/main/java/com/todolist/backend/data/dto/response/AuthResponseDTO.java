package com.todolist.backend.data.dto.response;

public record AuthResponseDTO(
        String uid,
        String email,
        String message
) {}
