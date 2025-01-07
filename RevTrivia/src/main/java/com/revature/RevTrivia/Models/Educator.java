package com.revature.RevTrivia.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private Integer educatorId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "professional_details")
    private String details;

    @JsonIgnore
    @OneToMany(mappedBy = "educator")
    private Set<Course> courses;

}