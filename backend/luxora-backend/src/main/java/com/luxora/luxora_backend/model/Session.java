package com.luxora.luxora_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Session {

    @Id
    private Long id;
    private Long userId;
    private boolean isActive; // true = logged in

    public Session() {}

    public Session(Long id, Long userId, boolean isActive) {
        this.id = id;
        this.userId = userId;
        this.isActive = isActive;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public boolean getIsActive() { return isActive; }
    public void setIsActive(boolean isActive) { this.isActive = isActive; }
}