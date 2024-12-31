package com.revature.RevTrivia.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private int questionId;

    @JoinColumn(name = "quiz_id", nullable = false)
    @ManyToOne
    private Quiz quiz;

    //Stores the question being asked
    @Column(nullable = false)
    private String content;

    //Stores a JSON string containing all answer choices
    @Column(nullable = false)
    private String options;

    //Stores a single character String that determines the correct answer choice
    @Column(nullable = false)
    private String correct;


    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getOptions() {
        return options;
    }

    public void setOptions(String options) {
        this.options = options;
    }

    public String getCorrect() {
        return correct;
    }

    public void setCorrect(String correct) {
        this.correct = correct;
    }
}
