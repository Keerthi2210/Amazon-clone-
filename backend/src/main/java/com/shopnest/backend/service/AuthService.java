package com.shopnest.backend.service;

import com.shopnest.backend.dto.LoginRequest;
import com.shopnest.backend.dto.LoginResponse;
import com.shopnest.backend.dto.RegisterRequest;
import com.shopnest.backend.model.User;
import com.shopnest.backend.repository.UserRepository;
import com.shopnest.backend.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponse login(LoginRequest loginRequest) {

        User user = userRepository
                .findByEmail(loginRequest.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password")
                );

        boolean passwordMatches =
                passwordEncoder.matches(
                        loginRequest.getPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {
            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole()
        );

        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                token
        );
    }

    public LoginResponse register(
            RegisterRequest registerRequest
    ) {

        if (
                userRepository
                        .findByEmail(
                                registerRequest.getEmail()
                        )
                        .isPresent()
        ) {
            throw new RuntimeException(
                    "Email already registered"
            );
        }

        User user = new User();

        user.setName(
                registerRequest.getName()
        );

        user.setEmail(
                registerRequest.getEmail()
        );

        user.setPassword(
                passwordEncoder.encode(
                        registerRequest.getPassword()
                )
        );

        user.setRole("USER");

        User savedUser =
                userRepository.save(user);

        String token = jwtUtil.generateToken(
                savedUser.getEmail(),
                savedUser.getRole()
        );

        return new LoginResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole(),
                token
        );
    }
}