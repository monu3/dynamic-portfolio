package com.example.monudemoport.controller.admin;

import com.example.monudemoport.entity.Profile;
import com.example.monudemoport.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * @author diwash
 * Created on 6/3/26
 */

@RestController
@RequestMapping("/admin/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping
    public Profile create(
            @RequestBody Profile profile
    ) {
        return profileService.save(profile);
    }

    @PutMapping
    public Profile update(
            @RequestBody Profile profile
    ) {
        return profileService.save(profile);
    }

}
