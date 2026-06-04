package com.example.monudemoport.service;

import com.example.monudemoport.entity.Contact;
import com.example.monudemoport.repo.ContactRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author diwash
 * Created on 6/3/26
 */

@Service
@RequiredArgsConstructor
public class ContactService {
    private final ContactRepo contactRepo;

    public Contact save(Contact contact) {
        return contactRepo.save(contact);
    }

    public void delete(Long id) {
        contactRepo.deleteById(id);
    }
}
