package com.luxora.luxora_backend.repository;

import com.luxora.luxora_backend.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Long> {

    @Query("SELECT s.userId FROM Session s WHERE s.isActive = true")
    List<Long> findActiveUserIds();
}