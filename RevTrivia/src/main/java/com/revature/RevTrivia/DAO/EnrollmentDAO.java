package com.revature.RevTrivia.DAO;

import com.revature.RevTrivia.Models.Enrollment;
import com.revature.RevTrivia.Models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentDAO extends JpaRepository<Enrollment, Integer> {
    List<Enrollment> findAllByStudent(Student student);
}
