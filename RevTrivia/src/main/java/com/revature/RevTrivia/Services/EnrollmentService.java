package com.revature.RevTrivia.Services;

import com.revature.RevTrivia.DAO.EnrollmentDAO;
import com.revature.RevTrivia.Models.Enrollment;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class EnrollmentService {
    
    @Autowired
    private EnrollmentDAO enrollmentDAO;
    
    // Create a new enrollment
    public Enrollment createNewEnrollment(Enrollment enrollment) {
        return enrollmentDAO.save(enrollment);
    }

    // Get all enrollments
    public List<Enrollment> getAllEnrollments() {
        return enrollmentDAO.findAll();
    }

    // Update the review of the enrollment
    public Enrollment updateReview(Enrollment enrollment) {
        Optional<Enrollment> foundEnrollment = enrollmentDAO.findById(enrollment.getEnrollment_id());
        if (foundEnrollment.isPresent()) {
            Enrollment enroll = foundEnrollment.get();
            enroll.setReview(enrollment.getReview());
            return enroll;
        }
        return null;
    }

    // Delete an enrollment
    public void deleteEnrollment(int enrollmentId) {
        Optional<Enrollment> foundEnrollment = enrollmentDAO.findById(enrollmentId);
        if (foundEnrollment.isPresent()) {
            enrollmentDAO.deleteById(enrollmentId);
        }
    }

}
