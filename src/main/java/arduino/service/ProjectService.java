package arduino.service;

import arduino.entity.Project;
import arduino.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service // Tells Spring to manage this class as a business logic component
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    // Fetch all records
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Handle business rules and save a project
    public Project saveProject(Project project) {
        // Business Rule: Default to today's date if none is provided
        if (project.getCompletionDate() == null) {
            project.setCompletionDate(LocalDate.now());
        }

        // You could add more rules here later (e.g., stripping harmful HTML, logging events)
        return projectRepository.save(project);
    }
}