/**
 * Author: Mauricio Ornelas Gutierrez
 * Version: 0.0
 */
package com.revature.RevTrivia.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.RevTrivia.Models.Quiz;
@Repository
public interface QuizDAO extends JpaRepository<Quiz, Integer>{
    
}
