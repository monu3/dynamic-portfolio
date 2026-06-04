package com.example.monudemoport.controller.admin;

import com.example.monudemoport.entity.Experience;
import com.example.monudemoport.service.ExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * @author diwash
 * Created on 6/3/26
 */

@RestController
@RequestMapping("/admin/experience")
@RequiredArgsConstructor
public class ExperienceController {
    private final ExperienceService experienceService;

    @PostMapping
    public Experience save(
            @RequestBody Experience experience
    ) {
        return experienceService.save(experience);
    }

    @PutMapping
    public Experience update(
            @RequestBody Experience experience
    ) {
        return experienceService.save(experience);
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id
    ) {
        experienceService.delete(id);
    }
}
