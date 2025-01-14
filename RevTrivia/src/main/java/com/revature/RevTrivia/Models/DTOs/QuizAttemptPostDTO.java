package com.revature.RevTrivia.Models.DTOs;

import lombok.Data;

@Data
public class QuizAttemptPostDTO {
    private Integer quizId;
    private Integer studentId;
    private Double score;
    private String attemptDate;
    private Integer currentAttempt;
}
