package com.revature.RevTrivia.DAO;

import com.revature.RevTrivia.Models.Educator;
import com.revature.RevTrivia.Security.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EducatorDAO extends JpaRepository<Educator, Integer> {
    Optional<Educator> findByUser(User user);
}
