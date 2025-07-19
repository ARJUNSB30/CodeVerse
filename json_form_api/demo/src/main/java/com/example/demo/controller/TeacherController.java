package com.example.demo.controller;

import com.example.demo.dto.TeacherDto;
import com.example.demo.service.TeacherService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/teacher-form")
public class TeacherController {
    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping
    @ResponseStatus(org.springframework.http.HttpStatus.OK)
    public List<TeacherDto> createTeacher(@RequestBody TeacherDto teacherEntity) {
        teacherService.saveTeacher(teacherEntity);
        return teacherService.getAllTeachers();
    }
}