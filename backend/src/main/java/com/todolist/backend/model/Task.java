package com.todolist.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    private String id;
    private String title;
    private String description;
    private Instant dateTime;
    private Boolean completed;
    private String userId;
}
