package com.example.demo.controller;

import com.example.demo.dto.StudentDto;
import com.example.demo.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/student-form")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    @ResponseStatus(org.springframework.http.HttpStatus.OK)
    public List<StudentDto> createStudent(@RequestBody StudentDto studentDto) {
        studentService.saveStudent(studentDto);
        return studentService.getAllStudents();
    }
}
