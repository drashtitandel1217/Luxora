package com.luxora.luxora_backend.controller;

import com.luxora.luxora_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:5175") 
public class AnalyticsController {

    @Autowired private OrderRepository orderRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private CustomerRepository customerRepository;

    @GetMapping("/summary")
    public Map<String, Object> getSummary() {
        Map<String, Object> stats = new HashMap<>();
        Double revenue = orderRepository.getTotalRevenue();
        Long orders = orderRepository.getTotalOrderCount();
        Long products = productRepository.getTotalProductCount();
        Long customers = customerRepository.getTotalCustomerCount();

        stats.put("revenue", (revenue != null) ? revenue : 0.0);
        stats.put("orders", (orders != null) ? orders : 0);
        stats.put("products", (products != null) ? products : 0);
        stats.put("customers", (customers != null) ? customers : 0);
        
        return stats;
    }

    // ✅ ONLY ONE getAllProducts() method now
    @GetMapping("/products")
    public List<com.luxora.luxora_backend.model.Product> getAllProducts() {
        return productRepository.findAll(); 
    }

    @GetMapping("/sales-trend")
    public List<Map<String, Object>> getSalesTrend() {
        return orderRepository.getMonthlySales();
    }

    @GetMapping("/top-categories")
    public List<Map<String, Object>> getTopCategories() {
        return productRepository.findAll().stream()
            .map(p -> p.getCategory())
            .filter(Objects::nonNull)
            .collect(Collectors.groupingBy(c -> c, Collectors.counting()))
            .entrySet().stream()
            .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
            .limit(5)
            .map(e -> {
                Map<String, Object> m = new HashMap<>();
                m.put("name", e.getKey().toString());
                m.put("value", e.getValue()); 
                return m;
            }).collect(Collectors.toList());
    }

    @GetMapping("/orders-per-day")
    public List<Map<String, Object>> getOrdersPerDay() {
        return orderRepository.getOrdersPerDay();
    }

    @GetMapping("/orders-by-category")
    public List<Map<String, Object>> getOrdersByCategory() {
        return orderRepository.getOrdersByCategory();
    }   
}