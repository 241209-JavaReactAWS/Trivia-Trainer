package com.revature.RevTrivia.DAO;

import com.revature.RevTrivia.Models.Course;
import com.revature.RevTrivia.Models.Enrollment;
import com.revature.RevTrivia.Models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollmentDAO extends JpaRepository<Enrollment, Integer> {
    List<Enrollment> findAllByStudent(Student student);
    Optional<Enrollment> findByStudentAndCourse(Student student, Course course);
}
