package com.revature.RevTrivia.DAOs;

import com.revature.RevTrivia.Models.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentDAO extends JpaRepository<Enrollment, Integer> {
}
