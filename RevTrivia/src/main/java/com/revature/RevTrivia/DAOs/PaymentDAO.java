package com.revature.RevTrivia.DAOs;
import com.revature.RevTrivia.Models.Payment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentDAO extends JpaRepository<Payment, Integer>{

    @Query("SELECT p FROM Payment p WHERE p.student_id = %studentId")
    List<Payment> getPaymentByStudentId(@Param("studentId") int studentId);

    @Query("SELECT p FROM Payment p WHERE p.course_id = %courseId")
    List<Payment> getPaymentByCourseId(int courseId);

}
