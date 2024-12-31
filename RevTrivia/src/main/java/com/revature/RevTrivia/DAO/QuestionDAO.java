package com.revature.RevTrivia.DAO;

import com.revature.RevTrivia.Models.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionDAO extends JpaRepository <Question, Integer> {
}
