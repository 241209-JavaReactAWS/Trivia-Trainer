/**
 * Author: Mauricio Ornelas Gutierrez
 * Version: 0.0
 */
package com.revature.RevTrivia.Controllers;

import com.revature.RevTrivia.Models.DTOs.QuizCreationDTO;
import com.revature.RevTrivia.Models.Quiz;
import com.revature.RevTrivia.Services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;




@RestController
@RequestMapping("/quizzes")//Needs to be reviewed and approved.
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}, allowCredentials = "true")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody QuizCreationDTO quizCreationDTO) {
        return ResponseEntity.ok(quizService.createQuiz(quizCreationDTO));
    }

    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        return ResponseEntity.ok(quizService.getAllQuizzes());
    }

    @GetMapping("/courses/{courseId}")
    public ResponseEntity<List<Quiz>> getAllQuizzesByCourse(@PathVariable int courseId) {
        return ResponseEntity.ok(quizService.getQuizzesByCourse(courseId));
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
