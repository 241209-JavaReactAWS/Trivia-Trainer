/**
 * Author: Mauricio Ornelas Gutierrez
 * Version: 0.0
 */
package com.revature.RevTrivia.Models;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.util.Set;


@Entity
@NoArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int courseId;

    @Column(nullable = false)
    private String name;

    @Column(length = 500)
    private String description;

    @ManyToOne
    @JoinColumn(name = "educator_id", nullable = false)
    private Educator educator;

    @OneToMany(mappedBy = "course")
    private Set<Enrollment> enrollments;

    @Column(nullable = false)
    private double fee;

    public Course(String name, String description, Educator educator, double fee) {
        this.name = name;
        this.description = description;
        this.educator = educator;
        this.fee = fee;
    }

    public int getCourseId() {
        return courseId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getFee() {
        return fee;
    }

    public void setFee(double fee) {
        this.fee = fee;
    }
}
