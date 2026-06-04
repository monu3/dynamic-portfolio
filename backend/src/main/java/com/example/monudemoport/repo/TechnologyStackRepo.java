package com.example.monudemoport.repo;

import com.example.monudemoport.entity.TechnologyStack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author diwash
 * Created on 6/3/26
 */

@Repository
public interface TechnologyStackRepo extends JpaRepository<TechnologyStack, Long> {
}
