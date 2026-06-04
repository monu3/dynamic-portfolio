package com.example.monudemoport.entity;

import jakarta.persistence.Column;
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
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String title;
    private String subtitle;
    private String bio;
    private String tagline;
    @Column(columnDefinition = "TEXT")
    private String philosophy;
    private String email;
    private String phone;
    private String location;
    private String github;
    private String linkedin;
    private String imageUrl;
    private String cvUrl;
}
