package com.example.Arduino.repository;

import com.example.Arduino.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    // Standard CRUD methods like .save(), .findAll(), and .deleteById() are built-in!
}