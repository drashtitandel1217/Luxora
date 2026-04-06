package com.luxora.luxora_backend.repository;

import com.luxora.luxora_backend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepository extends JpaRepository<Customer, String> {
    
    @Query("SELECT COUNT(c) FROM Customer c")
    Long getTotalCustomerCount();
}