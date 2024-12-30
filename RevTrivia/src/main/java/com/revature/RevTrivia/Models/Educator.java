package com.revature.RevTrivia.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Educator")
public class Educator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "educator_id")
    private int studentId;

    @Column(unique = true)
    private String email;

    private String name;

    private  String password;

    @Column(name = "professional_details")
    private String details;

    private Role role;

}