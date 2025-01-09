package com.revature.RevTrivia.Services;

import com.revature.RevTrivia.DAO.QuizAttemptDAO;
import com.revature.RevTrivia.DAO.QuizDAO;
import com.revature.RevTrivia.DAO.StudentDAO;
import com.revature.RevTrivia.Models.DTOs.QuizAttemptPostDTO;
import com.revature.RevTrivia.Models.Quiz;
import com.revature.RevTrivia.Models.QuizAttempt;

import java.util.List;
import java.util.Optional;

import com.revature.RevTrivia.Models.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizAttemptService {
    @Autowired
    private QuizAttemptDAO quizAttemptDAO;

    @Autowired
    private QuizDAO quizDAO;

    @Autowired
    private StudentDAO studentDAO;

    public QuizAttemptPostDTO createNewAttmept(QuizAttemptPostDTO quizAttemptCreationDTO){
        QuizAttempt newAttempt = new QuizAttempt();
        Quiz quiz = quizDAO.findById(quizAttemptCreationDTO.getQuizId()).orElseThrow();
        Student student = studentDAO.findById(quizAttemptCreationDTO.getStudentId()).orElseThrow();
        newAttempt.setQuiz(quiz);
        newAttempt.setStudent(student);
        newAttempt.setScore(quizAttemptCreationDTO.getScore());
        newAttempt.setAttemptDate(quizAttemptCreationDTO.getAttemptDate());
        QuizAttempt saved = quizAttemptDAO.save(newAttempt);
        QuizAttemptPostDTO res = new QuizAttemptPostDTO();
        res.setAttemptDate(saved.getAttemptDate());
        res.setScore(saved.getScore());
        res.setStudentId(saved.getStudent().getStudentId());
        res.setQuizId(saved.getQuiz().getQuizId());
        return res;
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
