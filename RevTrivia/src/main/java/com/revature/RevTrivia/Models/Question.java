package com.revature.RevTrivia.Models;

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
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private int questionId;

    @Column(name = "quiz_id", nullable = false)
    @ManyToOne
    private int quizId;

    //Stores the question being asked
    @Column(nullable = false)
    private String content;

    //Stores a JSON string containing all answer choices
    @Column(nullable = false)
    private String options;

    //Stores a single character String that determines the correct answer choice
    @Column(nullable = false)
    private String correct;

    public Question(int quizId, String content, String options, String correct) {
        this.quizId = quizId;
        this.content = content;
        this.options = options;
        this.correct = correct;
    }
}
