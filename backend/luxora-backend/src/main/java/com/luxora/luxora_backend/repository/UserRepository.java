package com.luxora.luxora_backend.repository;

import com.luxora.luxora_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByIdInAndRole(List<Long> ids, String role);
}