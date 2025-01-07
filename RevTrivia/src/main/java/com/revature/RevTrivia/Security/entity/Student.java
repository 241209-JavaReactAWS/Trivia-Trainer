package com.revature.RevTrivia.Security.entity;

import java.util.List;
import java.util.Set;

import com.revature.RevTrivia.Models.Enrollment;
import com.revature.RevTrivia.Models.QuizAttempt;
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

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "student")
    private Set<QuizAttempt> quizAttempt;

    @OneToMany(mappedBy = "student")  
    private List<Enrollment> enrollments;


}