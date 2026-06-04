package com.example.monudemoport.service;

import com.example.monudemoport.dto.PortfolioResponse;
import com.example.monudemoport.entity.*;
import com.example.monudemoport.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author diwash
 * Created on 6/3/26
 */

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileRepo profileRepository;
    private final ContactRepo contactRepo;
    private final ExperienceRepo experienceRepo;
    private final SkillRepo skillRepo;
    private final TechnologyStackRepo technologyStackRepo;
    private final ProjectRepo projectRepo;

    public Profile save(Profile profile) {
        return profileRepository.save(profile);
    }

    public PortfolioResponse get() {
        Profile profile = profileRepository.findAll()
                .stream()
                .findFirst()
                .orElse(null);
        List<Contact> contacts = contactRepo.findAll();
        List<Experience> experiences = experienceRepo.findAll();
        List<Skills> skills = skillRepo.findAll();
        List<TechnologyStack> technologyStacks = technologyStackRepo.findAll();
        List<Project> projects = projectRepo.findAll();

        return PortfolioResponse.builder()
                .profile(profile)
                .experience(experiences)
                .contacts(contacts)
                .skills(skills)
                .technologyStacks(technologyStacks)
                .projects(projects)
                .build();
    }
}
