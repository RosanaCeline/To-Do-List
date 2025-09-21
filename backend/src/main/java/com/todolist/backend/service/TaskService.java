package com.todolist.backend.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import com.todolist.backend.data.dto.request.TaskRequestDTO;
import com.todolist.backend.model.Task;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class TaskService {

    private static final String COLLECTION = "tasks";

    public List<Task> listTasksByUser(String userId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> query = db.collection(COLLECTION)
                .whereEqualTo("userId", userId)
                .get();

        List<Task> tasks = new ArrayList<>();
        for (QueryDocumentSnapshot doc : query.get().getDocuments()) {
            tasks.add(doc.toObject(Task.class));
        }
        return tasks;
    }

    public Task createTask(TaskRequestDTO taskDTO) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        Task task = new Task();
        task.setId(null); // Firestore gera o ID
        task.setTitle(taskDTO.title());
        task.setDescription(taskDTO.description());
        task.setDateTime(taskDTO.dateTime() != null ? taskDTO.dateTime() : Instant.now());
        task.setCompleted(taskDTO.completed() != null ? taskDTO.completed() : false);
        task.setUserId(taskDTO.userId());

        DocumentReference docRef = db.collection(COLLECTION).document();
        task.setId(docRef.getId());
        docRef.set(task).get();

        return task;
    }

    public Task updateTask(String taskId, TaskRequestDTO taskDTO) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        DocumentReference docRef = db.collection(COLLECTION).document(taskId);
        Task task = new Task();
        task.setId(taskId);
        task.setTitle(taskDTO.title());
        task.setDescription(taskDTO.description());
        task.setDateTime(taskDTO.dateTime());
        task.setCompleted(taskDTO.completed());
        task.setUserId(taskDTO.userId());

        docRef.set(task).get();

        return task;
    }

    public void toggleCompletedTask(String taskId, boolean completed) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection(COLLECTION).document(taskId);
        docRef.update("completed", completed).get();
    }

    public void deleteTask(String taskId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION).document(taskId).delete().get();
    }
}
