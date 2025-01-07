package com.revature.RevTrivia.Security.auth;

import com.revature.RevTrivia.Security.entity.Role;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register/student")
    public ResponseEntity<AuthenticationResponse> registerStudent(@RequestBody RegisterRequest request) {
        AuthenticationResponse response = authenticationService.register(request, Role.STUDENT);
        if (response == null) return new ResponseEntity<>(HttpStatus.CONFLICT);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/register/educator")
    public ResponseEntity<AuthenticationResponse> registerEducator(@RequestBody RegisterRequest request) {
        AuthenticationResponse response = authenticationService.register(request, Role.EDUCATOR);
        if (response == null) return new ResponseEntity<>(HttpStatus.CONFLICT);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request) {
        return new ResponseEntity<>(authenticationService.authenticate(request), HttpStatus.OK);
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authenticationService.refreshToken(request, response);
    }
}
