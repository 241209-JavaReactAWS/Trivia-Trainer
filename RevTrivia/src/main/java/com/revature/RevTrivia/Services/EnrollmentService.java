package com.revature.RevTrivia.Services;

import com.revature.RevTrivia.DAO.CourseDAO;
import com.revature.RevTrivia.DAO.EnrollmentDAO;
import com.revature.RevTrivia.DAO.StudentDAO;
import com.revature.RevTrivia.Models.Course;
import com.revature.RevTrivia.Models.DTOs.EnrollmentDTO;
import com.revature.RevTrivia.Models.EnrollStatus;
import com.revature.RevTrivia.Models.Enrollment;
import com.revature.RevTrivia.Models.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {
    
    @Autowired
    private EnrollmentDAO enrollmentDAO;
    @Autowired
    private CourseDAO courseDAO;
    @Autowired
    private StudentDAO studentDAO;
    
    // Create a new enrollment
    public Enrollment createNewEnrollment(EnrollmentDTO enrollmentDTO) {
        Optional<Student> student = studentDAO.findById(enrollmentDTO.getStudentId());
        Optional<Course> course = courseDAO.findById(enrollmentDTO.getCourseId());
        Optional<Enrollment> existingEnrollment = Optional.empty();
        if(student.isPresent() && course.isPresent()) {
            existingEnrollment = enrollmentDAO.findByStudentAndCourse(student.get(), course.get());
        }
        if(existingEnrollment.isEmpty()) {
            Enrollment enrollment = new Enrollment();
            //Set object fields
            course.ifPresent(enrollment::setCourse);
            student.ifPresent(enrollment::setStudent);
            //Set non-object fields
            enrollment.setEnrollmentDate(enrollmentDTO.getEnrollmentDate());
            enrollment.setStatus(enrollmentDTO.getEnrollStatus());
            enrollment.setReview(enrollmentDTO.getReview());
            enrollment.setRating(enrollmentDTO.getRating());
            return enrollmentDAO.save(enrollment);
        }
        return null;
    }



    // Get all enrollments
    public List<Enrollment> getAllEnrollments() {
        return enrollmentDAO.findAll();
    }

    public List<Enrollment> getAllStudentEnrollments(int studentId) {
        Optional<Student> student = studentDAO.findById(studentId);
        return enrollmentDAO.findAllByStudent(student.get());
    }

    // Update the review of the enrollment
    public Enrollment updateReview(Enrollment enrollment) {
        Optional<Enrollment> foundEnrollment = enrollmentDAO.findById(enrollment.getEnrollmentId());
        if (foundEnrollment.isPresent()) {
            Enrollment enroll = foundEnrollment.get();
            enroll.setReview(enrollment.getReview());
            return enrollmentDAO.save(enroll);
        }
        return null;
    }

    //Update the payment status of the Enrollment
    public Enrollment updatePaymentStatus(int enrollmentId) {
        Optional<Enrollment> foundEnrollment = enrollmentDAO.findById(enrollmentId);
        if (foundEnrollment.isPresent()) {
            Enrollment enroll = foundEnrollment.get();
            if(enroll.getStatus() == EnrollStatus.ACTIVE)
                enroll.setStatus(EnrollStatus.CANCELLED);
            else
                enroll.setStatus(EnrollStatus.ACTIVE);
            return enrollmentDAO.save(enroll);
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
