package com.todolist.backend.controllers.docs;

import com.todolist.backend.data.dto.request.AuthRequestDTO;
import com.todolist.backend.data.dto.response.AuthResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "Autenticação", description = "Endpoints para registro e login de usuários")
public interface AuthControllerDocs {

    @Operation(
            summary = "Registro de usuário",
            description = "Cria um novo usuário no Firebase Authentication",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Usuário criado com sucesso",
                            content = @Content(schema = @Schema(implementation = AuthResponseDTO.class))
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Requisição inválida",
                            content = @Content
                    ),
                    @ApiResponse(
                            responseCode = "409",
                            description = "Email já cadastrado",
                            content = @Content
                    )
            }
    )
    ResponseEntity<AuthResponseDTO> register(AuthRequestDTO requestDTO);

    @Operation(
            summary = "Login de usuário",
            description = "Valida o token JWT enviado pelo front-end e retorna informações do usuário",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Login válido",
                            content = @Content(schema = @Schema(implementation = AuthResponseDTO.class))
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Token ausente",
                            content = @Content
                    ),
                    @ApiResponse(
                            responseCode = "401",
                            description = "Token inválido",
                            content = @Content
                    )
            }
    )
    ResponseEntity<AuthResponseDTO> login(String authHeader);
}