package com.revature.RevTrivia.Models;

import com.revature.RevTrivia.Models.Course;
import com.revature.RevTrivia.Security.entity.Role;
import com.revature.RevTrivia.Security.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Educator {
    @Id
    @GeneratedValue
    private int educatorId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "professional_details")
    private String details;

    @OneToMany(mappedBy = "educator")
    private Set<Course> courses;

}