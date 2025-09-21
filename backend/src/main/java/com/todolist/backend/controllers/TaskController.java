package com.todolist.backend.controllers;

import com.todolist.backend.controllers.docs.TaskControllerDocs;
import com.todolist.backend.data.dto.request.TaskRequestDTO;
import com.todolist.backend.model.Task;
import com.todolist.backend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/tarefas")
@RequiredArgsConstructor
public class TaskController implements TaskControllerDocs {

    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<Task>> getTasks(@RequestParam String userId) throws ExecutionException, InterruptedException {
        List<Task> tasks = taskService.listTasksByUser(userId);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody @Valid TaskRequestDTO taskDTO) throws ExecutionException, InterruptedException {
        Task createdTask = taskService.createTask(taskDTO);
        return ResponseEntity.ok(createdTask);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable String id, @RequestBody @Valid TaskRequestDTO taskDTO) throws ExecutionException, InterruptedException {
        Task updatedTask = taskService.updateTask(id, taskDTO);
        return ResponseEntity.ok(updatedTask);
    }

    @PatchMapping("/{id}/concluir")
    public ResponseEntity<Void> toggleCompleted(@PathVariable String id, @RequestParam boolean completed) throws ExecutionException, InterruptedException {
        taskService.toggleCompletedTask(id, completed);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) throws ExecutionException, InterruptedException {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
