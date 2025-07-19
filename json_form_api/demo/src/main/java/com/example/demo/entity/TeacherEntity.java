package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "teacher", schema = "public")
public class TeacherEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacher_id")
    private Integer id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "date_of_birth", nullable = false)
    private String dateOfBirth;

    @Column(name = "education", nullable = false)
    private String education;

    @Column(name = "subject", nullable = false)
    private String subject;

    @Column(name = "years_of_experience", nullable = false)
    private Integer yearsOfExperience;

    @Column(name = "certifications")
    private String certifications;

    @Column(name = "additional_skills")
    private String additionalSkills;

    @Column(name = "agreed_to_terms", nullable = false)
    private Boolean agreedToTerms;
}