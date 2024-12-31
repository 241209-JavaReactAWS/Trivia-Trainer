package com.revature.RevTrivia.DAO;

import com.revature.RevTrivia.Models.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizAttemptDAO extends JpaRepository<QuizAttempt, Integer> {
}
