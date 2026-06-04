package com.example.monudemoport.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

/**
 * @author diwash
 * Created on 6/3/26
 */

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TechnologyStack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;        // e.g. Java, Spring Boot
    private String category;    // Backend / Frontend / DevOps
    private String level;       // Beginner / Intermediate / Expert
    private String iconUrl;     // optional (for UI)
}
