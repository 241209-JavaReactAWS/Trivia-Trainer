/**
 * Author: Mauricio Ornelas Gutierrez
 * Version: 0.0
 */
package com.revature.RevTrivia.Services;

import java.util.List;
import java.util.Optional;

import com.revature.RevTrivia.DAO.EducatorDAO;
import com.revature.RevTrivia.Models.DTOs.CourseCreationDTO;
import com.revature.RevTrivia.Models.Educator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.RevTrivia.DAO.CourseDAO;
import com.revature.RevTrivia.Models.Course;

@Service
public class CourseService {

    @Autowired
    private CourseDAO courseRepository;

    @Autowired
    private EducatorDAO educatorDAO;

    public Course createCourse(CourseCreationDTO courseCreationDTO){
        Course newCourse = new Course();
        newCourse.setDescription(courseCreationDTO.getDescription());
        newCourse.setFee(courseCreationDTO.getFee());
        newCourse.setName(courseCreationDTO.getName());
        Educator creator = educatorDAO.findById(courseCreationDTO.getEducatorId()).orElseThrow();
        newCourse.setEducator(creator);
        return courseRepository.save(newCourse);
    }

    public List<Course> getAllCourses(){
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(int courseId){
        return courseRepository.findById(courseId);
    }

    public Course updateCourse(int courseId, CourseCreationDTO courseCreationDTO){
        return courseRepository.findById(courseId).map(editedCourse -> {
            editedCourse.setName(courseCreationDTO.getName());
            editedCourse.setDescription(courseCreationDTO.getDescription());
            editedCourse.setFee(courseCreationDTO.getFee());
            editedCourse.setEducator(editedCourse.getEducator());
            return courseRepository.save(editedCourse);
        }).orElseThrow(() -> new IllegalArgumentException("Course not found, please try again."));
    }

    public void deleteCourse(int courseId){
        courseRepository.deleteById(courseId);
    }

    public List<Course> getCoursesByEducatorId(int educatorId) {
        return courseRepository.findAllByEducator_EducatorId(educatorId);
    }

    
}
