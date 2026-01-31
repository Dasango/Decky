package com.auction.userfinance.controllers;

import com.auction.userfinance.persistence.models.AppUser;
import com.auction.userfinance.persistence.repositories.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class AppUserController {

    private final AppUserRepository appUserRepository;

    @Autowired
    public AppUserController(AppUserRepository userRepository) {
        this.appUserRepository = userRepository;
    }

    @GetMapping
    public List<AppUser> getAllUsers(){
        return appUserRepository.findAll();
    }
}
