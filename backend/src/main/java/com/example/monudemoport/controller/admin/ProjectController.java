package com.example.monudemoport.controller.admin;

import com.example.monudemoport.entity.Project;
import com.example.monudemoport.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * @author diwash
 * Created on 6/3/26
 */

@RestController
@RequestMapping("/admin/project")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectRepo;

    @PostMapping
    public Project save(@RequestBody Project project) {
        return projectRepo.save(project);
    }

    @PutMapping
    public Project update(@RequestBody Project project) {
        return projectRepo.save(project);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        projectRepo.delete(id);
    }
}
