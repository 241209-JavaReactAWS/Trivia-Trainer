package com.revature.RevTrivia.Services;

import com.revature.RevTrivia.DAO.StudentDAO;
import com.revature.RevTrivia.Models.Role;
import com.revature.RevTrivia.Models.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentDAO studentDAO;
    
    //Create New Student
    public Student registerStudent(Student studentToBeRegistered)
    {
        Student newStudent = new Student();
        newStudent.setEmail(studentToBeRegistered.getEmail());
        newStudent.setFirstName(studentToBeRegistered.getFirstName());
        newStudent.setRole(Role.STUDENT);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        String encryptedPassword = passwordEncoder.encode(studentToBeRegistered.getPassword());
        newStudent.setPassword(encryptedPassword);

        return studentDAO.save(newStudent);
    }

    //Get All Students
    public List<Student> getAllStudents()
    {
        return studentDAO.findAll();
    }
    //Delete Student by ID
    public Optional<Student> deleteStudentByID(int studentId)
    {
        Optional<Student> retStudent = studentDAO.findById(studentId);
        studentDAO.deleteById(studentId);
        return retStudent;
    }
}
