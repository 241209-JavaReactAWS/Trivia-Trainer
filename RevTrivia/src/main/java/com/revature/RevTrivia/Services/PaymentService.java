package com.revature.RevTrivia.Services;

import com.revature.RevTrivia.DAO.PaymentDAO;
import com.revature.RevTrivia.Models.Payment;

import java.util.List;
import java.util.Optional;

public class PaymentService {

    private final PaymentDAO paymentDAO;

//    // No ID constructor
//    public PaymentService() {
//    }

    // Constructor
    public PaymentService(PaymentDAO paymentDAO) {
        this.paymentDAO = paymentDAO;
    }

    // Create a new payment
    public Payment createNewPayment(Payment pay) {
        return paymentDAO.save(pay);
    }

    // Get all payments from the payment table
    public List<Payment> getAllPayments() {
        return paymentDAO.findAll();
    }

    // Get all payments from a specific student
    public List<Payment> getAllPaymentsForStudent(int studentId) {
        return paymentDAO.getPaymentByStudentId(studentId);
    }

    // Get all payments for a specific course
    public List<Payment> getAllPaymentsForCourse(int courseId) {
        return paymentDAO.getPaymentByCourseId(courseId);
    }

    // Update the payment amount
    public Payment updatePayment(Payment payment) {
        Optional<Payment> foundPayment = paymentDAO.findById(payment.getPayment_id());
        if (foundPayment.isPresent()) {
            Payment pay = foundPayment.get();
            pay.setAmount(payment.getAmount());
            return pay;
        }
        return null;
    }

    // Delete a payment
    public void deletePayment(int paymentId) {
        Optional<Payment> foundPayment = paymentDAO.findById(paymentId);
        if (foundPayment.isPresent()) {
            paymentDAO.deleteById(paymentId);
        }
    }

}
