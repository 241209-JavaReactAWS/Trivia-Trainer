package com.revature.RevTrivia.Models;

import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studentId;

    @OneToMany(mappedBy = "student")
    private Set<QuizAttempt> quizAttempt;

    @OneToMany(mappedBy = "student")  
    private List<Enrollment> enrollments;

    @Column(unique = true)
    private String email;

    private String name;
    private String password;
    private Role role;
}