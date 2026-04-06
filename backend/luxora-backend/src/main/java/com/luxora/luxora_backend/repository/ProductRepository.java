package com.luxora.luxora_backend.repository;

import com.luxora.luxora_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    
    @Query("SELECT COUNT(p) FROM Product p")
    Long getTotalProductCount();
}