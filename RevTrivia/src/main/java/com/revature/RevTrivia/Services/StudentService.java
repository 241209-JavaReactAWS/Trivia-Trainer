package com.revature.RevTrivia.Services;

import com.revature.RevTrivia.DAO.StudentDAO;
import com.revature.RevTrivia.Models.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    private final StudentDAO studentDAO;

    @Autowired
    public StudentService(StudentDAO studentDAO)
    {
        this.studentDAO = studentDAO;
    }

    //Create New Student
    Student createStudent(Student newStudent)
    {
        return studentDAO.save(newStudent);
    }

    //Get All Students
    List<Student> getAllStudents()
    {
        return studentDAO.findAll();
    }
    //Delete Student by ID
    Optional<Student> deleteStudentByID(int studentId)
    {
        Optional<Student> retStudent = studentDAO.findById(studentId);
        studentDAO.deleteById(studentId);
        return retStudent;
    }
}
