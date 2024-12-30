package com.revature.RevTrivia.DAO;

import com.revature.RevTrivia.Models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentDAO extends JpaRepository<Payment, Integer>{

    @Query("SELECT p FROM Payment p WHERE p.student_id = %studentId")
    List<Payment> getPaymentByStudentId(@Param("studentId") int studentId);

    @Query("SELECT p FROM Payment p WHERE p.course_id = %courseId")
    List<Payment> getPaymentByCourseId(int courseId);

}
