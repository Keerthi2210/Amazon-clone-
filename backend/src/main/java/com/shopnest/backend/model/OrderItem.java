package com.shopnest.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;

    private String productName;

    private String category;

    private double price;

    private String image;

    private int quantity;

    public OrderItem() {
    }

    public OrderItem(
            Long productId,
            String productName,
            String category,
            double price,
            String image,
            int quantity
    ) {
        this.productId = productId;
        this.productName = productName;
        this.category = category;
        this.price = price;
        this.image = image;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(
            String productName
    ) {
        this.productName = productName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(
            String category
    ) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(
            double price
    ) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(
            String image
    ) {
        this.image = image;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(
            int quantity
    ) {
        this.quantity = quantity;
    }
}