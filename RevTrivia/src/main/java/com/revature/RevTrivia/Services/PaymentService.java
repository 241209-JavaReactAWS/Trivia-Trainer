package com.revature.RevTrivia.Services;

import com.revature.RevTrivia.DAO.CourseDAO;
import com.revature.RevTrivia.DAO.PaymentDAO;
import com.revature.RevTrivia.DAO.StudentDAO;
import com.revature.RevTrivia.Models.Course;
import com.revature.RevTrivia.Models.DTOs.PaymentDTO;
import com.revature.RevTrivia.Models.Payment;
import com.revature.RevTrivia.Models.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentDAO paymentDAO;
    @Autowired
    private CourseDAO courseDAO;
    @Autowired
    private StudentDAO studentDAO;

    // Create a new payment
    public Payment createNewPayment(PaymentDTO paymentDTO) {
        Payment pay = new Payment();
        //Set Amount
        pay.setAmount(paymentDTO.getAmount());

        //Add courseLookup
        Optional<Course> course = courseDAO.findById(paymentDTO.getCourseId());
        course.ifPresent(pay::setCourse);

        //Add studentLookup
        Optional<Student> student = studentDAO.findById(paymentDTO.getStudentId());
        student.ifPresent(pay::setStudent);

        return paymentDAO.save(pay);
    }

    // Get all payments from the payment table
    public List<Payment> getAllPayments() {
        return paymentDAO.findAll();
    }

    // Get all payments from a specific student
    public List<Payment> getAllPaymentsForStudent(int studentId) {
        return paymentDAO.findByStudent_StudentId(studentId);
    }

    // Get all payments for a specific course
    public List<Payment> getAllPaymentsForCourse(int courseId) {
        return paymentDAO.findByCourse_CourseId(courseId);
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
