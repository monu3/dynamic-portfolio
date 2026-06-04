package com.example.monudemoport.controller.admin;

import com.example.monudemoport.entity.Skills;
import com.example.monudemoport.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * @author diwash
 * Created on 6/3/26
 */

@RestController
@RequestMapping("/admin/skills")
@RequiredArgsConstructor
public class SkillController {
    private final SkillService skillService;

    @PostMapping
    public Skills save(
            @RequestBody Skills skills
    ) {
        return skillService.save(skills);
    }

    @PutMapping
    public Skills update(
            @RequestBody Skills skills
    ) {
        return skillService.save(skills);
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id
    ) {
        skillService.delete(id);
    }
}
