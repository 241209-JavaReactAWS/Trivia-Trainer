package com.revature.RevTrivia.Controllers;

import com.revature.RevTrivia.Models.DTOs.EnrollmentDTO;
import com.revature.RevTrivia.Models.Enrollment;
import com.revature.RevTrivia.Services.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enrollment")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}, allowCredentials = "true")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    // CREATE
    // Create a new enrollment
    @PostMapping
    public ResponseEntity<Enrollment> createNewEnrollment(@RequestBody EnrollmentDTO enrollmentDTO) {
        Enrollment potentialEnrollment = enrollmentService.createNewEnrollment(enrollmentDTO);
        if (potentialEnrollment != null) {
            return new ResponseEntity<>(potentialEnrollment, HttpStatus.CREATED);
        }
        return ResponseEntity.badRequest().build();
    }

    // READ
    // Get all enrollments
    @GetMapping
    public List<Enrollment> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }

    // UPDATE
    // Change the review of an Enrollment (just putting something for update)
    @PatchMapping("/review")
    public ResponseEntity<Enrollment> updateEnrollmentReview(@RequestBody Enrollment enrollment) {
        Enrollment updatedEnrollment = enrollmentService.updateReview(enrollment);
        if (updatedEnrollment == null) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(updatedEnrollment, HttpStatus.OK);
    }

    @PatchMapping("/payFee/{enrollmentId}")
    public ResponseEntity<Enrollment> updatePaymentStatusHandler(@PathVariable int enrollmentId) {
        Enrollment updatedEnrollment = enrollmentService.updatePaymentStatus(enrollmentId);
        if (updatedEnrollment == null) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(updatedEnrollment, HttpStatus.OK);
    }

    // DELETE
    // Delete an enrollment by enrollmentId
    @DeleteMapping("/{enrollmentId}")
    public void deleteEnrollment(@PathVariable int enrollmentId) {
        enrollmentService.deleteEnrollment(enrollmentId);
    }

}
