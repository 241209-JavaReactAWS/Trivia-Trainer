package com.revature.RevTrivia.Controllers;

import com.revature.RevTrivia.Models.QuizAttempt;
import com.revature.RevTrivia.Services.QuizAttemptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("attempts")
public class QuizAttemptController {

    private final QuizAttemptService quizAttemptService;

    @Autowired
    public QuizAttemptController(QuizAttemptService quizAttemptService){
        this.quizAttemptService = quizAttemptService;
    }

    @PostMapping("create")
    public ResponseEntity<QuizAttempt> createNewAttemptHandler(@RequestBody QuizAttempt quizAttempt){
        QuizAttempt newAttempt = quizAttemptService.createNewAttmept(quizAttempt);
        return new ResponseEntity<>(newAttempt, HttpStatus.CREATED);
    }

    @GetMapping
    public List<QuizAttempt> getAllAttemptsHandler(){
        return quizAttemptService.getAllAttempts();
    }

    @DeleteMapping("delete/{attemptId}")
    public ResponseEntity<QuizAttempt> deleteAttemptByIdHandler(@PathVariable int attemptId){
        Optional<QuizAttempt> deletedAttempt = quizAttemptService.deleteAttemptById(attemptId);
        if(deletedAttempt.isPresent())
            return new ResponseEntity<>(deletedAttempt.get(), HttpStatus.OK);
        else
            return ResponseEntity.badRequest().build();
    }
}
