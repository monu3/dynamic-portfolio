package com.example.monudemoport.controller.admin;

import com.example.monudemoport.entity.Contact;
import com.example.monudemoport.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * @author diwash
 * Created on 6/3/26
 */

@RestController
@RequestMapping("/admin/contacts")
@RequiredArgsConstructor
public class ContactController {
    private final ContactService contactService;

    @PostMapping
    public Contact save(
            @RequestBody Contact contact
    ) {
        return contactService.save(contact);
    }

    @PutMapping
    public Contact update(
            @RequestBody Contact contact
    ) {
        return contactService.save(contact);
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id
    ) {
        contactService.delete(id);
    }
}
