package arduino.controller;

import arduino.entity.Project;
import arduino.service.ProjectService; // Import the service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
@RequestMapping("/api")
public class ProjectController {

    @Autowired
    private ProjectService projectService; // Inject the Service instead of Repository

    // Fetch all projects
    @GetMapping("/projects")
    public List<Project> getAllProjects() {
        return projectService.getAllProjects(); // Delegate to service
    }

    // Create a new project entry dynamically
    @PostMapping("/projects")
    public Project createProject(@RequestBody Project newProject) {
        return projectService.saveProject(newProject); // Delegate to service
    }
}