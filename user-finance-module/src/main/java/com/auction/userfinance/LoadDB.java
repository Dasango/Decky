package com.auction.userfinance;

import jakarta.enterprise.inject.se.SeContainer;
import jakarta.enterprise.inject.se.SeContainerInitializer;
import jakarta.persistence.EntityManager;

import java.util.logging.Level;
import java.util.logging.Logger;

public class LoadDB {
    public static void main(String[] args) {
        Logger.getLogger("").setLevel(Level.SEVERE);
        try (SeContainer container = SeContainerInitializer.newInstance().initialize()){
            System.out.println("CDI container initialized successfully.");
            var em = container.select(EntityManager.class).get();
            em.getTransaction().begin();
            try {

                em.createNativeQuery("DELETE FROM financial_transactions").executeUpdate();
                em.createNativeQuery("DELETE FROM users").executeUpdate();
                em.createNativeQuery("DELETE FROM wallets").executeUpdate();


                em.createNativeQuery("INSERT INTO wallets (id, balance, blockedAmount, currency) VALUES " +
                                "(1, 1500.00, 200.00, 'USD'), " +
                                "(2, 0.00, 0.00, 'EUR'), " +
                                "(3, 5420.50, 1000.00, 'GBP'), " +
                                "(4, 0.45, 0.01, 'BTC')")
                        .executeUpdate();

                em.createNativeQuery("INSERT INTO users (name, email, password, reputationPoints, wallet_id) VALUES " +
                        "('Alice Smith', 'alice@example.com', 'hashed_pass_1', 100, 1), " +
                        "('Bob Jones', 'bob@example.com', 'hashed_pass_2', 50, 2), " +
                        "('Charlie Brown', 'charlie@example.com', 'hashed_pass_3', 500, 3), " +
                        "('Dana White', 'dana@example.com', 'hashed_pass_4', 250, 4)").executeUpdate();

                em.createNativeQuery("INSERT INTO financial_transactions (wallet_id, amount, type, timestamp) VALUES " +
                                "(1, 2000.00, 'DEPOSIT', '2026-01-10 10:00:00'), " +
                                "(1, 200.00, 'BID_HOLD', '2023-01-11 14:30:00'), " +
                                "(1, 300.00, 'PURCHASE', '2020-01-12 09:15:00'), " +
                                "(3, 6000.00, 'DEPOSIT', '2026-01-01 12:00:00'), " +
                                "(3, 1000.00, 'BID_HOLD', '2026-01-15 16:45:00'), " +
                                "(3, 579.50, 'WITHDRAWAL', '2020-01-20 11:20:00'), " +
                                "(4, 0.50, 'DEPOSIT', '2020-01-25 08:00:00'), " +
                                "(4, 0.04, 'PURCHASE', '2023-01-26 19:10:00'), " +
                                "(4, 0.01, 'BID_HOLD', '2022-01-27 22:00:00')")

                        .executeUpdate();

                em.getTransaction().commit();
                System.out.println("¡Datos insertados correctamente!");

            } catch (Exception ex) {
                em.getTransaction().rollback();
                System.err.println("Error en la transacción: " + ex.getMessage());
            }

        } catch (Exception e) {
            System.err.println("Error initializing CDI container: " + e.getMessage());
            e.printStackTrace();
        }
        System.out.println("Thank you for being here <3");
    }
}
