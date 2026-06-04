package com.example.monudemoport.service;

import com.example.monudemoport.entity.Project;
import com.example.monudemoport.repo.ProjectRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author diwash
 * Created on 6/3/26
 */

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepo projectRepo;

    public Project save(Project project) {
        return projectRepo.save(project);
    }

    public void delete(Long id) {
        projectRepo.deleteById(id);
    }
}
