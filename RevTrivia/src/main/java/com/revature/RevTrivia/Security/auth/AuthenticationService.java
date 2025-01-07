package com.revature.RevTrivia.Security.auth;

import com.revature.RevTrivia.Security.jwt.JwtService;
import com.revature.RevTrivia.Security.entity.Role;
import com.revature.RevTrivia.Security.entity.User;
import com.revature.RevTrivia.Security.entity.UserRepository;
import com.revature.RevTrivia.Security.token.Token;
import com.revature.RevTrivia.Security.token.TokenRepository;
import com.revature.RevTrivia.Security.token.TokenType;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request, Role role) {
        Optional<User> userExists = userRepository.findByUsername(request.getUsername());
        if (userExists.isPresent()) return null;
        List<Role> roles = new ArrayList<>();
        roles.add(role);
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(roles)
                .build();
        User savedUser = userRepository.save(user);
        HashMap<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("roles", user.getRoles());
        String jwt = jwtService.generateJwt(extraClaims, user);
        saveUserToken(savedUser, jwt);
        return AuthenticationResponse.builder()
                .jwt(jwt)
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
        extraClaims.put("roles", user.getRoles());
        var jwt = jwtService.generateJwt(extraClaims, user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwt);
        return AuthenticationResponse.builder()
                .jwt(jwt)
                .build();
    }

    private void revokeAllUserTokens(User user) {
        List<Token> validTokens = tokenRepository.findAllValidTokensByUser(user.getId());
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
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expired(false)
                .build();
        tokenRepository.save(token);
    }
}
