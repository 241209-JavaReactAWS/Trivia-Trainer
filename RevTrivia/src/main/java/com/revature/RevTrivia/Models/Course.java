/**
 * Author: Mauricio Ornelas Gutierrez
 * Version: 0.0
 */
package com.revature.RevTrivia.Models;

import jakarta.persistence.*;


@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int courseId;

    @Column(nullable = false)
    private String name;

    @Column(length = 500)
    private String description;

    @ManyToOne
    @JoinColumn(name = "program_id", nullable = false)
    private Program program;


    @ManyToOne
    @JoinColumn(name = "educator_id", nullable = false)
    private Educator educator;

    @Column(nullable = false)
    private double fee;

    public Course(String name, String description, Program program, Educator educator, double fee) {
        this.name = name;
        this.description = description;
        this.program = program;
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

    public int getProgramId() {
        return programId;
    }

    public void setProgramId(int programId) {
        this.programId = programId;
    }

    public double getFee() {
        return fee;
    }

    public void setFee(double fee) {
        this.fee = fee;
    }
}
