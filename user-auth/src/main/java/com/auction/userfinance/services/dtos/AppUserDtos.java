package com.auction.userfinance.services.dtos;


import com.auction.userfinance.persistence.models.AppUser;
import com.auction.userfinance.persistence.models.Role;

import java.util.Set;

public class AppUserDtos {

    public record Response(
            Long id,
            String name,
            Set<Role> roles
    ){
        public static Response fromEntity(AppUser user) {
            return new Response(
                    user.getId(),
                    user.getUsername(),
                    user.getRoles()
            );
        }
    }

    public record SignUpRequest(
            String username,
            String password
    ) {}
}
