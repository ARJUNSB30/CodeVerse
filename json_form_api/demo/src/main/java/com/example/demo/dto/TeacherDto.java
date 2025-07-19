package com.example.demo.dto;

import lombok.Data;

@Data
public class TeacherDto {
    private Integer id;
    private String fullName;
    private String email;
    private String phone;
    private String dateOfBirth;
    private String education;
    private String subject;
    private Integer yearsOfExperience;
    private String certifications;
    private String additionalSkills;
    private Boolean agreedToTerms;
}