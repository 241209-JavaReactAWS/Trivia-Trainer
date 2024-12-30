/**
 * Author: Mauricio Ornelas Gutierrez
 * Version: 0.0
 */
package com.revature.RevTrivia.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.RevTrivia.DAO.QuizRepository;
import com.revature.RevTrivia.Models.Quiz;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

        public Quiz createQuiz(Quiz quiz){
        return quizRepository.save(quiz);
    }

    public List<Quiz> getAllQuizzes(){
        return quizRepository.findAll();
    }

    public Optional<Quiz> getQuizById(int quizId){
        return quizRepository.findById(quizId);
    }

    public Quiz updateQuiz(Quiz quiz){
        return quizRepository.save(quiz);
    }

    public void deleteQuiz(int quizId){
        quizRepository.deleteById(quizId);
    }
    
}
