package com.revature.RevTrivia.Services;

import com.revature.RevTrivia.DAO.EducatorDAO;
import com.revature.RevTrivia.Models.Educator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EducatorService {
    @Autowired
    private EducatorDAO educatorDAO;

    //Create New Student
    public Educator registerEducator(Educator newEducator)
    {
        return educatorDAO.save(newEducator);
    }

    //Get All Educators
    public List<Educator> getAllEducators()
    {
        return educatorDAO.findAll();
    }
    //Delete Educators by ID
    public Optional<Educator> deleteEducatorByID(int educatorId)
    {
        Optional<Educator> retStudent = educatorDAO.findById(educatorId);
        educatorDAO.deleteById(educatorId);
        return retStudent;
    }

    public Optional<Educator> getEducatorById(int educatorId) {
        return educatorDAO.findById(educatorId);
    }

    public Optional<Educator> updateEducatorDetails(int educatorId, String newDetails) {
        Optional<Educator> retStudent = educatorDAO.findById(educatorId);
        if (retStudent.isPresent()) {
            Educator educator = retStudent.get();
            educator.setDetails(newDetails);
            educatorDAO.save(educator);
        }
        return retStudent;
    }


}
