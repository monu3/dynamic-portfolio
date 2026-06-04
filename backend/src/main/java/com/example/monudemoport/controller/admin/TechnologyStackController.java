package com.example.monudemoport.controller.admin;

import com.example.monudemoport.entity.TechnologyStack;
import com.example.monudemoport.service.TechnologyStackService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * @author diwash
 * Created on 6/3/26
 */

@RestController
@RequestMapping("/admin/technology-stack")
@RequiredArgsConstructor
public class TechnologyStackController {
    private final TechnologyStackService technologyStackService;

    @PostMapping
    public TechnologyStack save(
            @RequestBody TechnologyStack technologyStack
    ) {
        return technologyStackService.save(technologyStack);
    }

    @PutMapping
    public TechnologyStack update(
            @RequestBody TechnologyStack technologyStack
    ) {
        return technologyStackService.save(technologyStack);
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id
    ) {
        technologyStackService.delete(id);
    }
}
