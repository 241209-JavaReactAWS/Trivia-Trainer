package com.revature.RevTrivia.Models.DTOs;

import lombok.Data;

@Data
public class QuestionCreationDTO {
    private String content;
    private String options;
    private String correct;
}
