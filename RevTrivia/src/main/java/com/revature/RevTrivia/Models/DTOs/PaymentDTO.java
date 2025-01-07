package com.revature.RevTrivia.Models.DTOs;

public class PaymentDTO {
    //Student Id
    private int studentId;
    //Course ID
    private int courseId;
    //Payment Amount
    private double amount;

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

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
