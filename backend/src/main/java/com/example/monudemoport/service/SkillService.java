package com.example.monudemoport.service;

import com.example.monudemoport.entity.Skills;
import com.example.monudemoport.repo.SkillRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author diwash
 * Created on 6/3/26
 */

@Service
@RequiredArgsConstructor
public class SkillService {
    private final SkillRepo skillRepo;

    public Skills save(Skills skills) {
        return skillRepo.save(skills);
    }

    public void delete(Long id) {
        skillRepo.deleteById(id);
    }
}
