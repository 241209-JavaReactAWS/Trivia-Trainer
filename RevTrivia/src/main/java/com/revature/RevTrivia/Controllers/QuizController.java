/**
 * Author: Mauricio Ornelas Gutierrez
 * Version: 0.0
 */
package com.revature.RevTrivia.Controllers;

import com.revature.RevTrivia.Models.Quiz;
import com.revature.RevTrivia.Services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;




@RestController
@RequestMapping("/quizzes")//Needs to be reviewed and approved.
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
        return ResponseEntity.ok(quizService.createQuiz(quiz));
    }

    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        return ResponseEntity.ok(quizService.getAllQuizzes());
    }

    @GetMapping("/{quizId}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable int quizId) {
        return quizService.getQuizById(quizId).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{quizId}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable int quizId, @RequestBody Quiz quiz) {
        return ResponseEntity.ok(quizService.updateQuiz(quiz));
    }

    @DeleteMapping("/{quizId}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable int quizId){
        quizService.deleteQuiz(quizId);
        return ResponseEntity.noContent().build();
    }
    
    
    
}
