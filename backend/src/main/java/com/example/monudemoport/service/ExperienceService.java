package com.example.monudemoport.service;

import com.example.monudemoport.entity.Experience;
import com.example.monudemoport.repo.ExperienceRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author diwash
 * Created on 6/3/26
 */

@Service
@RequiredArgsConstructor
public class ExperienceService {
    private final ExperienceRepo experienceRepo;

    public Experience save(Experience experience) {
        return experienceRepo.save(experience);
    }

    public void delete(Long id) {
        experienceRepo.deleteById(id);
    }

}
