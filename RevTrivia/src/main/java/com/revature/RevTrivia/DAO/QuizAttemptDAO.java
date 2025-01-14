package com.revature.RevTrivia.DAO;

import com.revature.RevTrivia.Models.Quiz;
import com.revature.RevTrivia.Models.QuizAttempt;
import com.revature.RevTrivia.Models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizAttemptDAO extends JpaRepository<QuizAttempt, Integer> {
    List<QuizAttempt> findByStudentAndQuiz(Student student, Quiz quiz);
}
