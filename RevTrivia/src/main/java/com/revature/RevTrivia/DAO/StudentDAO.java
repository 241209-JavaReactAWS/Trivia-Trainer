package com.revature.RevTrivia.DAO;

import com.revature.RevTrivia.Models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentDAO extends JpaRepository<Student, Integer>{
}
