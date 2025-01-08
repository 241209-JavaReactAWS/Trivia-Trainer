package com.revature.RevTrivia.Controllers;

import com.revature.RevTrivia.Models.Question;
import com.revature.RevTrivia.Models.Quiz;
import com.revature.RevTrivia.Services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/questions")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}, allowCredentials = "true")
public class QuestionController {

    @Autowired
    private QuestionService questionService;


    @PostMapping("/{quizId}")
    public ResponseEntity<Question> createQuestionHandler(@PathVariable int quizId, @RequestBody Question question){
        try {
            Question newQuestion = questionService.createQuestion(quizId, question.getContent(), question.getOptions(), question.getCorrect());
            return new ResponseEntity<>(newQuestion, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public List<Question> getAllQuestionsHandler(){
        return questionService.getAllQuestions();
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<Question> deleteQuestionByIdHandler(@PathVariable int questionId){
        Optional<Question> deletedQuestion = questionService.deleteQuestionById(questionId);
        if(deletedQuestion.isPresent())
            return new ResponseEntity<>(deletedQuestion.get(), HttpStatus.OK);
        else
            return ResponseEntity.badRequest().build();
    }
}
