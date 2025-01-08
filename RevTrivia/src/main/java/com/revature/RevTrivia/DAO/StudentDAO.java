package com.revature.RevTrivia.DAO;

import com.revature.RevTrivia.Models.Student;
import com.revature.RevTrivia.Security.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentDAO extends JpaRepository<Student, Integer>{
    Optional<Student> findByUser(User user);
}
