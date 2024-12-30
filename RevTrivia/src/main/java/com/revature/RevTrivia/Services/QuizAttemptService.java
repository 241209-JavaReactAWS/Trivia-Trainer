package com.revature.RevTrivia.Services;

import com.revature.RevTrivia.DAO.QuizAttemptDAO;
import com.revature.RevTrivia.Models.QuizAttempt;

import java.util.List;
import java.util.Optional;

public class QuizAttemptService {

    private final QuizAttemptDAO quizAttemptDAO;

    public QuizAttemptService(QuizAttemptDAO quizAttemptDAO){
        this.quizAttemptDAO = quizAttemptDAO;
    }

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
