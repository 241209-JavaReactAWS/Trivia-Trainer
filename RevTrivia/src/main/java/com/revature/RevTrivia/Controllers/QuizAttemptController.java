package com.revature.RevTrivia.Controllers;

import com.revature.RevTrivia.Models.DTOs.QuizAttemptPostDTO;
import com.revature.RevTrivia.Models.QuizAttempt;
import com.revature.RevTrivia.Services.QuizAttemptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/attempts")
public class QuizAttemptController {

    @Autowired
    private QuizAttemptService quizAttemptService;

    @PostMapping
    public ResponseEntity<QuizAttemptPostDTO> createNewAttemptHandler(@RequestBody QuizAttemptPostDTO quizAttemptCreationDTO){
        QuizAttemptPostDTO newAttempt = quizAttemptService.createNewAttmept(quizAttemptCreationDTO);
        return new ResponseEntity<>(newAttempt, HttpStatus.CREATED);
    }

    @GetMapping
    public List<QuizAttempt> getAllAttemptsHandler(){
        return quizAttemptService.getAllAttempts();
    }

    @GetMapping("/student/attempts")
    public  List<QuizAttempt> getAttemptsByStudentHandler(@RequestBody QuizAttemptPostDTO quizAttemptDTO){
        return quizAttemptService.findAllFromStudent(quizAttemptDTO);
    }

    @DeleteMapping("/{attemptId}")
    public ResponseEntity<QuizAttempt> deleteAttemptByIdHandler(@PathVariable int attemptId){
        Optional<QuizAttempt> deletedAttempt = quizAttemptService.deleteAttemptById(attemptId);
        if(deletedAttempt.isPresent())
            return new ResponseEntity<>(deletedAttempt.get(), HttpStatus.OK);
        else
            return ResponseEntity.badRequest().build();
    }
}
