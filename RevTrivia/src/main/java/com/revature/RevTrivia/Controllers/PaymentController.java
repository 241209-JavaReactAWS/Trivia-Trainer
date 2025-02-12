package com.revature.RevTrivia.Controllers;

import com.revature.RevTrivia.Models.DTOs.PaymentDTO;
import com.revature.RevTrivia.Models.Payment;
import com.revature.RevTrivia.Services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}/*, allowCredentials = "true"*/)
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    // CREATE
    @PostMapping
    public ResponseEntity<Payment> createNewPayment(@RequestBody PaymentDTO paymentDTO) {
        Payment potentialPayment = paymentService.createNewPayment(paymentDTO);
        if (potentialPayment != null) {
            return new ResponseEntity<>(potentialPayment, HttpStatus.CREATED);
        }
        System.out.println("potentialPayment is null");
        return ResponseEntity.badRequest().build();
    }

    // READ
    // Get all payments
    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    // Get all payments based on student id
    @GetMapping("student/{studentId}")
    public List<Payment> getAllPaymentsForStudent(@PathVariable("studentId") int studentId) {
        return paymentService.getAllPaymentsForStudent(studentId);
    }

    // Get all payments based on course id
    @GetMapping("course/{courseId}")
    public List<Payment> getAllPaymentsForCourse(@PathVariable("courseId") int courseId) {
        return paymentService.getAllPaymentsForCourse(courseId);
    }

    // UPDATE
    // Change the amount of a payment (just putting something for update)
    @PatchMapping
    public ResponseEntity<Payment> updateEnrollmentReview(@RequestBody Payment payment) {
        Payment updatedPayment = paymentService.updatePayment(payment);
        if (updatedPayment == null) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(updatedPayment, HttpStatus.OK);
    }

    // DELETE
    // Remove payment by payment id
    @DeleteMapping("/{paymentId}")
    public void deletePayment(@PathVariable int paymentId) {
        paymentService.deletePayment(paymentId);
    }

}
