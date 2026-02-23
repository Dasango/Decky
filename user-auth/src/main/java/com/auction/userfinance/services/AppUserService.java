package com.auction.userfinance.services;

import com.auction.userfinance.persistence.models.AppUser;
import com.auction.userfinance.persistence.repositories.AppUserRepository;
import com.auction.userfinance.services.dtos.AppUserDtos;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AppUserService {

    private final PasswordEncoder passwordEncoder;
    private final AppUserRepository appUserRepository;

    public Optional<AppUserDtos.Response> getUserById(Long id){
        return appUserRepository.findById(id)
                .map(AppUserDtos.Response::fromEntity);
    }

    public AppUserDtos.Response createUser(AppUserDtos.SignUpRequest request){
        return AppUserDtos.Response.fromEntity(
                appUserRepository.save(AppUser.builder()
                        .username(request.username())
                        .password(passwordEncoder.encode(request.password()))
                        .build())
        );
    }
}
