package com.revature.RevTrivia.Models;

import java.util.List;
import java.util.Set;

import com.revature.RevTrivia.Security.entity.Role;
import com.revature.RevTrivia.Security.entity.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

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

    private String firstName;
    private String lastName;
    private String password;
    private Role role;
}