package com.example.demo.service;

import com.example.demo.dto.StudentDto;
import com.example.demo.entity.StudentEntity;
import com.example.demo.repository.StudentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public StudentDto saveStudent(StudentDto studentDto) {
        // Convert DTO to Entity
        StudentEntity entity = new StudentEntity();
        BeanUtils.copyProperties(studentDto, entity);

        // Save entity
        StudentEntity savedEntity = studentRepository.save(entity);

        // Convert saved Entity back to DTO
        StudentDto savedDto = new StudentDto();
        BeanUtils.copyProperties(savedEntity, savedDto);
        return savedDto;
    }

    public List<StudentDto> getAllStudents() {
        // Get all student entities from the repository
        List<StudentEntity> studentEntities = studentRepository.findAll();
        // Convert list of entities to list of DTOs
        return studentEntities.stream()
                .map(entity -> {
                    StudentDto dto = new StudentDto();
                    BeanUtils.copyProperties(entity, dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
