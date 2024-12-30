package com.revature.RevTrivia.Services;

import com.revature.RevTrivia.DAO.EducatorDAO;
import com.revature.RevTrivia.Models.Educator;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class EducatorService {
    private final EducatorDAO educatorDAO;

    @Autowired
    public EducatorService(EducatorDAO educatorDAO)
    {
        this.educatorDAO = educatorDAO;
    }

    //Create New Student
    Educator createEducator(Educator newEducator)
    {
        return educatorDAO.save(newEducator);
    }

    //Get All Educators
    List<Educator> getAllEducators()
    {
        return educatorDAO.findAll();
    }
    //Delete Educators by ID
    Optional<Educator> deleteEducatorByID(int educatorId)
    {
        Optional<Educator> retStudent = educatorDAO.findById(educatorId);
        educatorDAO.deleteById(educatorId);
        return retStudent;
    }
}
