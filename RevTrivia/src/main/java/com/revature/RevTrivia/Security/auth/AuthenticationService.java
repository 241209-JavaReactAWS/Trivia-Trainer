package com.revature.RevTrivia.Security.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.RevTrivia.DAO.EducatorDAO;
import com.revature.RevTrivia.DAO.StudentDAO;
import com.revature.RevTrivia.Models.Educator;
import com.revature.RevTrivia.Models.Student;
import com.revature.RevTrivia.Security.jwt.JwtService;
import com.revature.RevTrivia.Security.entity.Role;
import com.revature.RevTrivia.Security.entity.User;
import com.revature.RevTrivia.Security.entity.UserRepository;
import com.revature.RevTrivia.Security.token.Token;
import com.revature.RevTrivia.Security.token.TokenRepository;
import com.revature.RevTrivia.Security.token.TokenType;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final StudentDAO studentDAO;
    private final EducatorDAO educatorDAO;
    private final TokenRepository tokenRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request, Role role) {
        Optional<User> userExists = userRepository.findByUsername(request.getUsername());
        if (userExists.isPresent()) return null;
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();
        User savedUser = userRepository.save(user);
        HashMap<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("roles", user.getRole());
        String jwt = jwtService.generateJwt(extraClaims, savedUser);
        String refreshToken = jwtService.generateRefreshToken(savedUser);
        saveUserToken(savedUser, jwt);
        saveRefreshToken(savedUser, refreshToken);
        return AuthenticationResponse.builder()
                .accessToken(jwt)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        HashMap<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("roles", user.getRole());
        var jwt = jwtService.generateJwt(extraClaims, user);
        String refreshToken = jwtService.generateRefreshToken(user);
        revokeAllOfUsersAccessTokens(user);
        saveUserToken(user, jwt);
        saveRefreshToken(user, refreshToken);
        return AuthenticationResponse.builder()
                .accessToken(jwt)
                .refreshToken(refreshToken)
                .build();
    }

    private void revokeAllOfUsersAccessTokens(User user) {
        List<Token> validTokens = tokenRepository.findAllValidAccessTokensByUser(user.getId());
        if (validTokens.isEmpty()) return;
        validTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validTokens);
    }

    private void saveUserToken(User savedUser, String jwt) {
        Token token = Token.builder()
                .user(savedUser)
                .token(jwt)
                .tokenType(TokenType.ACCESS)
                .revoked(false)
                .expired(false)
                .build();
        tokenRepository.save(token);
    }

    private void saveRefreshToken(User savedUser, String jwt) {
        Token token = Token.builder()
                .user(savedUser)
                .token(jwt)
                .tokenType(TokenType.REFRESH)
                .revoked(false)
                .expired(false)
                .build();
        tokenRepository.save(token);
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String username;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        username = jwtService.extractUsername(refreshToken);

        // user exists
        if (username != null) {
            User user = this.userRepository.findByUsername(username).orElseThrow();
            Boolean isTokenValid = tokenRepository.findByToken(refreshToken)
                    .map(token -> !token.isExpired() && !token.isRevoked() && token.getTokenType().equals(TokenType.REFRESH))
                    .orElse(false);
            if (jwtService.isValidJwt(refreshToken, user) && isTokenValid) {
                String accessToken = jwtService.generateJwt(user);
                revokeAllOfUsersAccessTokens(user);
                saveUserToken(user, accessToken);
                AuthenticationResponse authenticationResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authenticationResponse);
            }
        }
    }
}
