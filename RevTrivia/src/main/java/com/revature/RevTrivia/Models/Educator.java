package com.revature.RevTrivia.Models;

import com.revature.RevTrivia.Security.entity.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Educator")
public class Educator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int educatorId;

    @Column(unique = true)
    private String email;

    private String name;

    @Column(unique = true)
    private  String username;

    @Column(name = "professional_details")
    private String details;

    private String password;

    private Role role;

    @OneToMany(mappedBy = "educator")
    private Set<Course> courses;

}