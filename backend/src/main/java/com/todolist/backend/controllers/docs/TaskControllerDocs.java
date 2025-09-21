package com.todolist.backend.controllers.docs;

import com.todolist.backend.data.dto.request.TaskRequestDTO;
import com.todolist.backend.model.Task;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Tag(name = "Tarefas", description = "Endpoints para gerenciamento de tarefas do usuário")
public interface TaskControllerDocs {

    @Operation(
            summary = "Lista todas as tarefas de um usuário",
            description = "Retorna todas as tarefas associadas ao userId fornecido",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Lista de tarefas retornada com sucesso",
                            content = @Content(schema = @Schema(implementation = Task.class))
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Usuário não possui tarefas",
                            content = @Content
                    )
            }
    )
    ResponseEntity<List<Task>> getTasks(@Parameter(description = "ID do usuário") String userId) throws ExecutionException, InterruptedException;

    @Operation(
            summary = "Cria uma nova tarefa",
            description = "Cria uma tarefa para o usuário informado",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Tarefa criada com sucesso",
                            content = @Content(schema = @Schema(implementation = Task.class))
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Dados da tarefa inválidos",
                            content = @Content
                    )
            }
    )
    ResponseEntity<Task> createTask(@Parameter(description = "Dados da tarefa a serem criados") TaskRequestDTO taskDTO)
            throws ExecutionException, InterruptedException;

    @Operation(
            summary = "Atualiza uma tarefa existente",
            description = "Atualiza todos os campos de uma tarefa existente pelo seu ID",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Tarefa atualizada com sucesso",
                            content = @Content(schema = @Schema(implementation = Task.class))
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "ID inválido ou dados incorretos",
                            content = @Content
                    )
            }
    )
    ResponseEntity<Task> updateTask(@Parameter(description = "ID da tarefa") String id,
                                    @Parameter(description = "Dados atualizados da tarefa") TaskRequestDTO taskDTO)
            throws ExecutionException, InterruptedException;

    @Operation(
            summary = "Marca ou desmarca uma tarefa como concluída",
            description = "Atualiza apenas o status 'completed' da tarefa",
            responses = {
                    @ApiResponse(
                            responseCode = "204",
                            description = "Tarefa atualizada com sucesso",
                            content = @Content
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "ID da tarefa inválido",
                            content = @Content
                    )
            }
    )
    ResponseEntity<Void> toggleCompleted(@Parameter(description = "ID da tarefa") String id,
                                         @Parameter(description = "Status da conclusão") boolean completed)
            throws ExecutionException, InterruptedException;

    @Operation(
            summary = "Exclui uma tarefa",
            description = "Remove uma tarefa pelo seu ID",
            responses = {
                    @ApiResponse(
                            responseCode = "204",
                            description = "Tarefa excluída com sucesso",
                            content = @Content
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "ID da tarefa inválido",
                            content = @Content
                    )
            }
    )
    ResponseEntity<Void> deleteTask(@Parameter(description = "ID da tarefa") String id)
            throws ExecutionException, InterruptedException;
}