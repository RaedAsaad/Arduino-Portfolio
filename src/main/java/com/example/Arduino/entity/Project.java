package com.example.Arduino.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Data // Automatically generates getters, setters, and toString
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Project title cannot be blank")
    @Size(min = 3, max = 100, message = "Title must be between 3 and 100 characters")
    private String title;

    @NotBlank(message = "Description cannot be blank")
    @Size(max = 250, message = "Description cannot exceed 250 characters") // <-- Changed to 250
    private String shortDescription;
    
    private LocalDate completionDate;
}