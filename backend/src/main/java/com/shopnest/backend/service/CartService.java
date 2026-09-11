package com.shopnest.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shopnest.backend.model.CartItem;
import com.shopnest.backend.repository.CartItemRepository;

@Service
public class CartService {

    private final CartItemRepository cartItemRepository;

    public CartService(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    public List<CartItem> getCartByUserId(Long userId) {
        return cartItemRepository.findByUserId(userId);
    }

    public CartItem addToCart(CartItem cartItem) {

        return cartItemRepository
                .findByUserIdAndProductId(
                        cartItem.getUserId(),
                        cartItem.getProductId()
                )
                .map(existingItem -> {
                    existingItem.setQuantity(
                            existingItem.getQuantity()
                                    + cartItem.getQuantity()
                    );

                    return cartItemRepository.save(existingItem);
                })
                .orElseGet(() ->
                        cartItemRepository.save(cartItem)
                );
    }

    public CartItem updateQuantity(
            Long cartItemId,
            int quantity
    ) {
        CartItem cartItem = cartItemRepository
                .findById(cartItemId)
                .orElseThrow(() ->
                        new RuntimeException("Cart item not found")
                );

        cartItem.setQuantity(quantity);

        return cartItemRepository.save(cartItem);
    }

    public void removeCartItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    @Transactional
    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }
}