package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "student", schema = "public")
public class StudentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Integer id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "parent_email", nullable = false)
    private String parentEmail;

    @Column(name = "date_of_birth", nullable = false)
    private String dateOfBirth;

    @Column(name = "grade", nullable = false)
    private String grade;

    @Column(name = "preferred_subjects", nullable = false)
    private String preferredSubjects;

    @Column(name = "medical_information")
    private String medicalInformation;

    @Column(name = "extra_curricular")
    private String extraCurricular;

    @Column(name = "agreed_to_terms", nullable = false)
    private Boolean agreedToTerms;
}