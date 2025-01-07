package com.revature.RevTrivia.Services;

import com.revature.RevTrivia.DAO.StudentDAO;
import com.revature.RevTrivia.Security.entity.Student;
import com.revature.RevTrivia.Security.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentDAO studentDAO;
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
