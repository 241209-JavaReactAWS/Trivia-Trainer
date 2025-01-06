package com.revature.RevTrivia.Models.DTOs;

public class PaymentDTO {
    //Student Id
    private int studentId;
    //Course ID
    private int courseId;
    //Payment Amount
    private int amount;

    public PaymentDTO() {
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

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
