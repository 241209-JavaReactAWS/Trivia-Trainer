package com.revature.RevTrivia.Controllers;

import com.revature.RevTrivia.Models.Question;
import com.revature.RevTrivia.Services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("questions")
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService){
        this.questionService = questionService;
    }

    @PostMapping("create")
    public ResponseEntity<Question> createQuestionHandler(@RequestParam(name = "quizId") int quizId, @RequestParam(name = "content") String content,
                                                @RequestParam(name = "options") String options, @RequestParam(name = "correct") String correct){
        Question newQuestion = questionService.createQuestion(quizId, content, options, correct);
        return new ResponseEntity<>(newQuestion, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Question> getAllQuestionsHandler(){
        return questionService.getAllQuestions();
    }

    @DeleteMapping("delete/{questionId}")
    public ResponseEntity<Question> deleteQuestionByIdHandler(@PathVariable int questionId){
        Optional<Question> deletedQuestion = questionService.deleteQuestionById(questionId);
        if(deletedQuestion.isPresent())
            return new ResponseEntity<>(deletedQuestion.get(), HttpStatus.OK);
        else
            return ResponseEntity.badRequest().build();
    }
}
