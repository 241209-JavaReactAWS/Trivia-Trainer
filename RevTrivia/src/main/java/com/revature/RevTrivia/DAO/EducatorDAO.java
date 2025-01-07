package com.revature.RevTrivia.DAO;

import com.revature.RevTrivia.Security.entity.Educator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducatorDAO extends JpaRepository<Educator, Integer> {
}
