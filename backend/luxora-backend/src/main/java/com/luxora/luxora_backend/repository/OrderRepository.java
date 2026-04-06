package com.luxora.luxora_backend.repository;
import com.luxora.luxora_backend.model.Order; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    
    @Query("SELECT SUM(o.totalPrice) FROM Order o")
    Double getTotalRevenue();

    // Change this name to match the Controller's call
    @Query("SELECT COUNT(o) FROM Order o")
    Long getTotalOrderCount(); 

    @Query(value = "SELECT COALESCE(DATE_FORMAT(order_date, '%b %Y'), 'No Date') as month_name, " +
                "SUM(total_price) as amount " +
                "FROM orders " +
                "GROUP BY month_name " + 
                "ORDER BY MIN(order_date) ASC", nativeQuery = true)
    List<Map<String, Object>> getMonthlySales();
        // Query for the Bar Chart (Orders per Day)
    @Query(value = "SELECT DAYNAME(order_date) as day, COUNT(*) as count " +
                "FROM orders WHERE order_date IS NOT NULL " +
                "GROUP BY day " +
                "ORDER BY FIELD(day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')", 
        nativeQuery = true)
    List<Map<String, Object>> getOrdersPerDay();

    // Query for the Pie Chart (Orders by Category)
    // In OrderRepository.java
    @Query(value = "SELECT p.category as name, COUNT(oi.id) as value " +
                "FROM order_items oi " +
                "JOIN products p ON oi.product_id = p.id " +
                "GROUP BY p.category " +
                "ORDER BY value DESC LIMIT 5", nativeQuery = true)
    List<Map<String, Object>> getOrdersByCategory();

}