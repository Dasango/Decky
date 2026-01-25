package com.uce.config;

import jakarta.annotation.PostConstruct;

import jakarta.enterprise.context.ApplicationScoped;

import jakarta.enterprise.inject.Disposes;

import jakarta.enterprise.inject.Produces;

import jakarta.persistence.EntityManager;

import jakarta.persistence.EntityManagerFactory;

import jakarta.persistence.Persistence;

@ApplicationScoped

public class JpaConfig {

    private EntityManagerFactory emf;

    @PostConstruct
    void init() {
        emf = Persistence.createEntityManagerFactory("auctionPU");
    }

    @Produces
    public EntityManager createEntityManager() {
        return emf.createEntityManager();
    }


    public void close(@Disposes EntityManager em) {
        if (em.isOpen()) {
            em.close();
        }
    }

}