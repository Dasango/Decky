package com.auction.userfinance.web.dtos;

import com.auction.userfinance.persistence.models.AppUser;
import com.auction.userfinance.persistence.models.Wallet;

public class AppUserDtos {

    public record Response(
            Long id,
            String name,
            String email,
            Integer reputationPoints,
            Wallet wallet
    ){
        public static Response fromEntity(AppUser user) {
            return new Response(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getReputationPoints(),
                    user.getWallet()
            );
        }
    }
    public record LoginRequest(
            String name,
            String password
    ){}
}
