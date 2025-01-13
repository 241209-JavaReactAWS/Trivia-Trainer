/**
 * Author: Mauricio Ornelas Gutierrez
 * Version: 0.0
 */
package com.revature.RevTrivia.DAO;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.RevTrivia.Models.Course;

@Repository
public interface CourseDAO extends JpaRepository<Course, Integer>{

    List<Course> findAllByEducator_EducatorId(int educatorId);
    
}
