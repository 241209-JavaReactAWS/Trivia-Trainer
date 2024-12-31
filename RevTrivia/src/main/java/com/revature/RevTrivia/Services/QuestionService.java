package com.revature.RevTrivia.Services;

import com.revature.RevTrivia.DAO.QuestionDAO;
import com.revature.RevTrivia.DAO.QuizDAO;
import com.revature.RevTrivia.Models.Question;
import com.revature.RevTrivia.Models.Quiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    @Autowired
    private QuestionDAO questionDAO;

    @Autowired
    private QuizDAO quizDAO;

    //Create a new question
    public Question createQuestion(int quizId, String content, String options, String correct) throws Exception {
        Optional<Quiz> optionalQuiz = quizDAO.findById(quizId);
        if (optionalQuiz.isEmpty()) throw new Exception("Attempt to create question for quiz that doesn't exist");
        Question newQuestion = new Question();
        newQuestion.setQuiz(optionalQuiz.get());
        newQuestion.setCorrect(correct);
        newQuestion.setContent(content);
        newQuestion.setOptions(options);
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
