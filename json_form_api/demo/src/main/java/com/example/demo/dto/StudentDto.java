package com.example.demo.dto;

import lombok.Data;

@Data
public class StudentDto {
    private Integer id;
    private String fullName;
    private String email;
    private String parentEmail;
    private String dateOfBirth;
    private String grade;
    private String preferredSubjects;
    private String medicalInformation;
    private String extraCurricular;
    private Boolean agreedToTerms;
}