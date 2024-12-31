package com.revature.RevTrivia.Models;

import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private int studentId;

    @ManyToMany
    @JoinColumn(name = "attempt_id")
    private QuizAttempt quizAttempt;

    @OneToMany(mappedBy = "student")  
    private List<Enrollment> enrollments;

    @Column(unique = true)
    private String email;

    private String name;

    private String password;

    private Role role;

}