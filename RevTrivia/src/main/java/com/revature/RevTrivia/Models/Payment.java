package com.revature.RevTrivia.Models;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int payment_id;

    private int student_id;

    private int course_id;

    private double amount;

    private LocalDate payment_date;

    private PayStatus status;


    public int getPayment_id() {
        return payment_id;
    }

    public void setPayment_id(int payment_id) {
        this.payment_id = payment_id;
    }

    public int getStudent_id() {
        return student_id;
    }

    public void setStudent_id(int student_id) {
        this.student_id = student_id;
    }

    public int getCourse_id() {
        return course_id;
    }

    public void setCourse_id(int course_id) {
        this.course_id = course_id;
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