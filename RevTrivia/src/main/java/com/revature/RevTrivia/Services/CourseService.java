/**
 * Author: Mauricio Ornelas Gutierrez
 * Version: 0.0
 */
package com.revature.RevTrivia.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.RevTrivia.DAO.CourseDAO;
import com.revature.RevTrivia.Models.Course;

@Service
public class CourseService {

    @Autowired
    private CourseDAO courseRepository;

    public Course createCourse(Course course){
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses(){
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(int courseId){
        return courseRepository.findById(courseId);
    }

    public Course updateCourse(Course course){
        return courseRepository.save(course);
    }

    public void deleteCourse(int courseId){
        courseRepository.deleteById(courseId);
    }

    
}
