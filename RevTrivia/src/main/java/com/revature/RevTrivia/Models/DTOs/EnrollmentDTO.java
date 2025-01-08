package com.revature.RevTrivia.Models.DTOs;

import com.revature.RevTrivia.Models.EnrollStatus;

public class EnrollmentDTO {
    private int studentId;
    private int courseId;
    private String enrollmentDate;
    private EnrollStatus enrollStatus;
    private String review;
    private int rating;

    public EnrollmentDTO() {
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public String getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(String enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }

    public EnrollStatus getEnrollStatus() {
        return enrollStatus;
    }

    public void setEnrollStatus(EnrollStatus enrollStatus) {
        this.enrollStatus = enrollStatus;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
