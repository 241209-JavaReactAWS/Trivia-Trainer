package com.revature.RevTrivia.Services;

import com.revature.RevTrivia.DAO.QuestionDAO;
import com.revature.RevTrivia.Models.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    @Autowired
    private QuestionDAO questionDAO;

    //Create a new question
    public Question createQuestion(int quizId, String content, String options, String correct){
        Question newQuestion = new Question(quizId, content, options, correct);
        return questionDAO.save(newQuestion);
    }

    //Get a list of all questions
    public List<Question> getAllQuestions(){
        return questionDAO.findAll();
    }

    //Delete a question by ID
    public Optional<Question> deleteQuestionById(int questionId){
        Optional<Question> deletedQuestion = questionDAO.findById(questionId);
        questionDAO.deleteById(questionId);
        return deletedQuestion;
    }
}
