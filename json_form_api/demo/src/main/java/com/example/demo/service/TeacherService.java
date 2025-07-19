package com.example.demo.service;

import com.example.demo.dto.StudentDto;
import com.example.demo.dto.TeacherDto;
import com.example.demo.entity.StudentEntity;
import com.example.demo.entity.TeacherEntity;
import com.example.demo.repository.TeacherRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.*;

@Service
public class TeacherService {
    private final TeacherRepository teacherRepository;

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public TeacherDto saveTeacher(TeacherDto teacherDto) {
        // Convert DTO to Entity
        TeacherEntity entity = new TeacherEntity();
        BeanUtils.copyProperties(teacherDto, entity);

        // Save entity
        TeacherEntity savedEntity = teacherRepository.save(entity);

        // Convert saved Entity back to DTO
        TeacherDto savedDto = new TeacherDto();
        BeanUtils.copyProperties(savedEntity, savedDto);
        return savedDto;
    }

    public List<TeacherDto> getAllTeachers() {
        // Get all student entities from the repository
        List<TeacherEntity> teacherEntities = teacherRepository.findAll();
        // Convert list of entities to list of DTOs
        return teacherEntities.stream()
                .map(entity -> {
                    TeacherDto dto = new TeacherDto();
                    BeanUtils.copyProperties(entity, dto);
                    return dto;
                })
                .collect(toList());
    }
}