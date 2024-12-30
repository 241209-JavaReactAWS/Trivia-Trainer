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
@RequestMapping("students")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService)
    {
        this.studentService = studentService;
    }

    @PostMapping("register")
    public ResponseEntity<Student> registerStudentHandler(@RequestBody Student newStudent){
        Student createdStudent = studentService.registerStudent(newStudent);
        return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Student> getAllStudentsHandler(){
        return studentService.getAllStudents();
    }

    @DeleteMapping("delete/{studentId}")
    public ResponseEntity<Student> deleteStudentHandler(@PathVariable int studentId){
        Optional<Student> deletedStudent = studentService.deleteStudentByID(studentId);
        if(deletedStudent.isPresent())
            return new ResponseEntity<>(deletedStudent.get(), HttpStatus.OK);
        else
            return ResponseEntity.badRequest().build();
    }
}
