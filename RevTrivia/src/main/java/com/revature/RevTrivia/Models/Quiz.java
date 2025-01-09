/**
 * Author: Mauricio Ornelas Gutierrez
 * Version: 0.0
 */
package com.revature.RevTrivia.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;


@Entity
@NoArgsConstructor
@Data
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_id")
    private Integer quizId;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @OneToMany(mappedBy = "quiz")
    @JsonIgnore
    private Set<QuizAttempt> quizAttempt;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer timer;

    @Column(name = "attempt_limit", nullable = false)
    private int attemptLimit;

    @OneToMany(mappedBy = "quiz")
    private List<Question> questions;

    public Quiz(Course course, String title, int timer, int attemptLimit) {
        this.course = course;
        this.title = title;
        this.timer = timer;
        this.attemptLimit = attemptLimit;
    }

    public int getQuizId() {
        return quizId;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getTimer() {
        return timer;
    }

    public void setTimer(int timer) {
        this.timer = timer;
    }

    public int getAttemptLimit() {
        return attemptLimit;
    }

    public void setAttemptLimit(int attemptLimit) {
        this.attemptLimit = attemptLimit;
    }
}
