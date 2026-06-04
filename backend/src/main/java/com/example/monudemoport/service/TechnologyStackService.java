package com.example.monudemoport.service;

import com.example.monudemoport.entity.TechnologyStack;
import com.example.monudemoport.repo.TechnologyStackRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author diwash
 * Created on 6/3/26
 */

@Service
@RequiredArgsConstructor
public class TechnologyStackService {
    private final TechnologyStackRepo technologyStackRepo;

    public TechnologyStack save(TechnologyStack technologyStack) {
        return technologyStackRepo.save(technologyStack);
    }

    public void delete(Long id) {
        technologyStackRepo.deleteById(id);
    }
}
