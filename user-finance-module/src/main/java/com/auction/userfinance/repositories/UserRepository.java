package com.auction.userfinance.repositories;

import com.auction.userfinance.entities.User;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;

@ApplicationScoped
public class UserRepository extends RepositoryBase<User> {

    public UserRepository(EntityManager em) {
        super(em, User.class);
    }


}