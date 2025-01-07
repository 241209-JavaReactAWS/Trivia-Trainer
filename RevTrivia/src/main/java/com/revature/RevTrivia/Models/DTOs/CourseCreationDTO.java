package com.revature.RevTrivia.Models.DTOs;

import com.revature.RevTrivia.Models.Enrollment;
import lombok.Data;

import java.util.List;

@Data
public class CourseCreationDTO {
    private String name;
    private String description;
    private Integer educatorId;
    private List<Enrollment> enrollments;
    private double fee;
}
