package com.example.monudemoport.controller;

import com.example.monudemoport.dto.PortfolioResponse;
import com.example.monudemoport.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author diwash
 * Created on 6/3/26
 */

@RestController
@RequestMapping("/public/profile")
@RequiredArgsConstructor
public class PublicProfileController {
    private final ProfileService profileService;

    @GetMapping
    public PortfolioResponse getProfile() {
        return profileService.get();
    }
}