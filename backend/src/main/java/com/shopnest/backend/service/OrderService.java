package com.shopnest.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.shopnest.backend.model.Order;
import com.shopnest.backend.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrderStatus(
            Long id,
            String status
    ) {
        Order existingOrder = orderRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found")
                );

        existingOrder.setStatus(status);

        return orderRepository.save(existingOrder);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}