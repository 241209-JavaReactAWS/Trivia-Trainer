package com.revature.RevTrivia.Models;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int payment_id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private double amount;

    private LocalDate payment_date;

    private PayStatus status;

    public Payment() {
    }

    public int getPayment_id() {
        return payment_id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDate getPayment_date() {
        return payment_date;
    }

    public void setPayment_date(LocalDate payment_date) {
        this.payment_date = payment_date;
    }

    public PayStatus getStatus() {
        return status;
    }

    public void setStatus(PayStatus status) {
        this.status = status;
    }

    
}