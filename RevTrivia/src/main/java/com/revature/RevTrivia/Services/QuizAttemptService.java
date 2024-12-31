package com.revature.RevTrivia.Services;

import com.revature.RevTrivia.DAO.QuizAttemptDAO;
import com.revature.RevTrivia.Models.QuizAttempt;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

public class QuizAttemptService {
    @Autowired
    private QuizAttemptDAO quizAttemptDAO;

    public QuizAttempt createNewAttmept(QuizAttempt newAttempt){
        return quizAttemptDAO.save(newAttempt);
    }

    public List<QuizAttempt> getAllAttempts(){
        return quizAttemptDAO.findAll();
    }

    public Optional<QuizAttempt> deleteAttemptById(int attemptId){
        Optional<QuizAttempt> deletedAttempt = quizAttemptDAO.findById(attemptId);
        quizAttemptDAO.deleteById(attemptId);
        return deletedAttempt;
    }
}
