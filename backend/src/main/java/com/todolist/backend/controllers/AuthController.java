package com.todolist.backend.controllers;

import com.todolist.backend.controllers.docs.AuthControllerDocs;
import com.todolist.backend.data.dto.request.AuthRequestDTO;
import com.todolist.backend.data.dto.response.AuthResponseDTO;
import com.todolist.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController implements AuthControllerDocs {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody @Valid AuthRequestDTO requestDTO) {
        AuthResponseDTO response = authService.register(requestDTO);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestHeader("Authorization") String authHeader) {
        // Espera header no formato "Bearer <idToken>"
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(400).body(new AuthResponseDTO(null, null, "Token ausente", null));
        }

        String idToken = authHeader.replace("Bearer ", "");
        AuthResponseDTO response = authService.login(idToken);
        return ResponseEntity.ok(response);
    }
}
