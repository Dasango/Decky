package com.auction.userfinance.persistence.repositories;


import com.auction.userfinance.persistence.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {

}