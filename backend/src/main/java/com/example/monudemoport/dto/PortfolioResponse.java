package com.example.monudemoport.dto;

import com.example.monudemoport.entity.*;
import lombok.*;

import java.util.List;

/**
 * @author diwash
 * Created on 6/3/26
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PortfolioResponse {
    private Profile profile;
    private List<Experience> experience;
    private List<Contact> contacts;
    private List<Skills> skills;
    private List<TechnologyStack> technologyStacks;
    private List<Project> projects;
}
