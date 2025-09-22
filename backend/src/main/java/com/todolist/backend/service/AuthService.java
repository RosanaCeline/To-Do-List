package com.todolist.backend.service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.cloud.FirestoreClient;
import com.todolist.backend.data.dto.request.AuthRequestDTO;
import com.todolist.backend.data.dto.response.AuthResponseDTO;
import com.todolist.backend.exception.EmailAlreadyRegisteredException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class AuthService {

    // AuthService.java
    public AuthResponseDTO register(AuthRequestDTO requestDTO) {
        try {
            // Cria usuário no Firebase Auth
            UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                    .setEmail(requestDTO.email())
                    .setPassword(requestDTO.password());

            UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);

            // Salva dados no Firestore
            Firestore db = FirestoreClient.getFirestore();
            Map<String, Object> userData = new HashMap<>();
            userData.put("email", userRecord.getEmail());
            db.collection("users").document(userRecord.getUid()).set(userData).get();

            // Cria Custom Token
            String customToken = FirebaseAuth.getInstance().createCustomToken(userRecord.getUid());

            // Retorna info do usuário sem custom token
            return new AuthResponseDTO(
                    userRecord.getUid(),
                    userRecord.getEmail(),
                    "Usuário criado com sucesso",
                    customToken
            );
        } catch (FirebaseAuthException e) {
            if (e.getMessage().contains("EMAIL_EXISTS")) {
                throw new EmailAlreadyRegisteredException();
            }
            throw new RuntimeException("Erro ao criar usuário", e);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Erro ao salvar usuário no Firestore", e);
        }
    }

    public AuthResponseDTO login(String idToken) {
        try {
            // Verifica token enviado pelo frontend (idToken gerado pelo signInWithEmailAndPassword)
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid();

            return new AuthResponseDTO(uid, null, "Login válido", null);
        } catch (FirebaseAuthException e) {
            throw new RuntimeException("Token inválido", e);
        }
    }
}
