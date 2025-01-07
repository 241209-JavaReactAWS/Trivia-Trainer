package com.revature.RevTrivia.Security.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {
    @RequestMapping("/protected/demo")
    @GetMapping
    public ResponseEntity<String> hello() {
        Boolean test = true;
        return ResponseEntity.ok("Hello from secured endpoint");
    }

    @RequestMapping("/student/demo")
    @GetMapping
    public ResponseEntity<String> helloStudent() {
        return ResponseEntity.ok("Hello from secured student endpoint");
    }
}
