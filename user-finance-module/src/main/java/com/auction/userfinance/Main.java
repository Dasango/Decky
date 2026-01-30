package com.auction.userfinance;

import com.auction.userfinance.persistence.repositories.FinancialTransactionRepository;
import com.auction.userfinance.persistence.repositories.UserRepository;
import com.auction.userfinance.services.CsvService;
import jakarta.annotation.PreDestroy;
import jakarta.enterprise.inject.se.SeContainer;
import jakarta.enterprise.inject.se.SeContainerInitializer;
import jakarta.persistence.EntityManager;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
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
            System.out.println(LocalDateTime.now());

            System.out.println("lets run csv :D");
            var csvService = container.select(CsvService.class).get();

            var cores = Runtime.getRuntime().availableProcessors() -1;
            System.out.println("Well use: "+ cores +" cores");
            ExecutorService executorService = Executors.newFixedThreadPool(cores);

            var saveUsers = csvService.getSaveUsers();

            Future<Long> noUsersInCsv = executorService.submit(saveUsers);

            CompletableFuture<?> saveWallets = CompletableFuture.runAsync(csvService.getSaveWallets());

            CompletableFuture<Optional<Long>> countWallets = saveWallets
                    .thenComposeAsync(x -> CompletableFuture.supplyAsync(csvService.getCountWalletsCsv()));

            var usersInCsv = noUsersInCsv.get();

            var walletsInCsv = countWallets.join().get();

            System.out.println("Theres "+ usersInCsv +" users in our csv");

            System.out.println("Theres "+ walletsInCsv +" wallets in our csv");

            executorService.shutdown();
        }catch (Exception e){
            System.err.println("Error initializing CDI container: " + e.getMessage());
            e.printStackTrace();
        }
        System.out.println("Thank you for being here <3");
    }

}
