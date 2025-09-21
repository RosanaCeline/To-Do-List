package com.todolist.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class EmailAlreadyRegisteredException extends RuntimeException {
    public EmailAlreadyRegisteredException() {
        super("E-mail já está cadastrado.");
    }

    public EmailAlreadyRegisteredException(String message) {
        super(message);
    }
}
