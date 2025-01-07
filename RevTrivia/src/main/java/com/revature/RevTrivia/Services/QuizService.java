/**
 * Author: Mauricio Ornelas Gutierrez
 * Version: 0.0
 */
package com.revature.RevTrivia.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.revature.RevTrivia.DAO.CourseDAO;
import com.revature.RevTrivia.Models.Course;
import com.revature.RevTrivia.Models.DTOs.QuestionCreationDTO;
import com.revature.RevTrivia.Models.DTOs.QuizCreationDTO;
import com.revature.RevTrivia.Models.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.RevTrivia.DAO.QuizDAO;
import com.revature.RevTrivia.Models.Quiz;

@Service
public class QuizService {

    @Autowired
    private QuizDAO quizDAO;

    @Autowired
    private CourseDAO courseDAO;

    public Quiz createQuiz(QuizCreationDTO quizCreationDTO){
        Quiz newQuiz = new Quiz();
        Course course = courseDAO.findById(quizCreationDTO.getCourseId()).orElseThrow();
        newQuiz.setCourse(course);
        newQuiz.setAttemptLimit(quizCreationDTO.getAttemptLimit());
        newQuiz.setTimer(quizCreationDTO.getTimer());
        newQuiz.setTitle(quizCreationDTO.getTitle());
        Quiz savedQuiz = quizDAO.save(newQuiz);
        List<Question> questions = new ArrayList<>();
        for (QuestionCreationDTO question : quizCreationDTO.getQuestions()) {
            Question newQuestion = new Question();
            newQuestion.setOptions(question.getOptions());
            newQuestion.setCorrect(question.getCorrect());
            newQuestion.setContent(question.getContent());
            newQuestion.setQuiz(savedQuiz);
            questions.add(newQuestion);
        }
        savedQuiz.setQuestions(questions);
        return quizDAO.save(savedQuiz);
    }

    public List<Quiz> getAllQuizzes(){
        return quizDAO.findAll();
    }

    public Optional<Quiz> getQuizById(int quizId){
        return quizDAO.findById(quizId);
    }

    public Quiz updateQuiz(Quiz quiz){
        return quizDAO.save(quiz);
    }

    public void deleteQuiz(int quizId){
        quizDAO.deleteById(quizId);
    }
    
}
