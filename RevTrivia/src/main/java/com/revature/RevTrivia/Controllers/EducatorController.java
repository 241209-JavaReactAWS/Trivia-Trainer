package com.revature.RevTrivia.Controllers;

import com.revature.RevTrivia.Models.Educator;
import com.revature.RevTrivia.Services.EducatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/educator")
public class EducatorController {
    @Autowired
    private EducatorService educatorService;

    @PostMapping
    public ResponseEntity<Educator> registerEducatorHandler(@RequestBody Educator newEducator){
        Educator createdEducator = educatorService.registerEducator(newEducator);
        return new ResponseEntity<>(createdEducator, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Educator> getAllEducatorsHandler(){
        return educatorService.getAllEducators();
    }

    @DeleteMapping("/{educatorId}")
    public ResponseEntity<Educator> deleteEducatorHandler(@PathVariable int educatorId){
        Optional<Educator> deletedEducator = educatorService.deleteEducatorByID(educatorId);
        if(deletedEducator.isPresent())
            return new ResponseEntity<>(deletedEducator.get(), HttpStatus.OK);
        else
            return ResponseEntity.badRequest().build();
    }
}
