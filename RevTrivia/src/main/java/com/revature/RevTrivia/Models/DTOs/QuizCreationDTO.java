package com.revature.RevTrivia.Models.DTOs;

import com.revature.RevTrivia.Models.Question;
import lombok.Data;

import java.util.List;

@Data
public class QuizCreationDTO {
    private Integer courseId;
    private String title;
    private Integer timer;
    private Integer attemptLimit;
    private List<QuestionCreationDTO> questions;
}
