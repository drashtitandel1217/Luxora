package com.luxora.luxora_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {
    @Id
    private String id;

    private String name;
    private String category;
    private Double price;
    private Integer quantity;

    @Column(name = "days_since_last_sale")
    private Integer daysSinceLastSale;

    public Product() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Integer getDaysSinceLastSale() { return daysSinceLastSale; }
    public void setDaysSinceLastSale(Integer daysSinceLastSale) { this.daysSinceLastSale = daysSinceLastSale; }
}