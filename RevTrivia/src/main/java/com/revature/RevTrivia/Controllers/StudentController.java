package com.revature.RevTrivia.Controllers;

import com.revature.RevTrivia.Models.Student;
import com.revature.RevTrivia.Services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping
    public ResponseEntity<Student> registerStudentHandler(@RequestBody Student studentToBeRegistered){
        Student createdStudent = studentService.registerStudent(studentToBeRegistered);
        return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Student> getAllStudentsHandler(){
        return studentService.getAllStudents();
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<Student> deleteStudentHandler(@PathVariable int studentId){
        Optional<Student> deletedStudent = studentService.deleteStudentByID(studentId);
        if(deletedStudent.isPresent())
            return new ResponseEntity<>(deletedStudent.get(), HttpStatus.OK);
        else
            return ResponseEntity.badRequest().build();
    }
}
