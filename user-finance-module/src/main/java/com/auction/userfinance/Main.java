package com.auction.userfinance;

import com.auction.userfinance.persistence.repositories.FinancialTransactionRepository;
import com.auction.userfinance.persistence.repositories.UserRepository;
import jakarta.enterprise.inject.se.SeContainer;
import jakarta.enterprise.inject.se.SeContainerInitializer;
import jakarta.persistence.EntityManager;

import java.util.logging.Level;
import java.util.logging.Logger;

public class Main {
    public static void main(String[] args) {
        Logger.getLogger("").setLevel(Level.SEVERE);
        try (SeContainer container = SeContainerInitializer.newInstance().initialize()){
            System.out.println("CDI container initialized successfully.");
            var em = container.select(EntityManager.class).get();

            var users = container.select(UserRepository.class).get();

            System.out.println(users.getGhostUsers(2024));

            var transactions = container.select(FinancialTransactionRepository.class).get();

            var aUser = users.getGhostUsers(2024).getFirst();
            var user = users.findById(aUser.getId());
            System.out.println(transactions.getAllTransactionsByUser(user.get()));
        }catch (Exception e){
            System.err.println("Error initializing CDI container: " + e.getMessage());
            e.printStackTrace();
        }
        System.out.println("Thank you for being here <3");
    }
}
