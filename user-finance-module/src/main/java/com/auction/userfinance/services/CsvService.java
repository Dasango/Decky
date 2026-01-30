package com.auction.userfinance.services;

import com.auction.userfinance.persistence.repositories.UserRepository;
import com.auction.userfinance.persistence.repositories.WalletRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.Getter;
import lombok.Setter;

import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;
import java.util.concurrent.Callable;
import java.util.concurrent.CompletableFuture;
import java.util.function.Supplier;
import java.util.stream.Stream;

@Getter
@Setter
@ApplicationScoped
public class CsvService {

    private final String csvUserPath = "user.csv";
    private final String csvWalletPath = "wallet.csv";
    private UserRepository userRepository;
    private WalletRepository walletRepository;

    @Inject
    public CsvService(UserRepository userRepository, WalletRepository walletRepository) {
        this.userRepository = userRepository;
        this.walletRepository = walletRepository;
    }

    private Callable<Long> saveUsers = () -> {

        try (BufferedWriter writer = Files.newBufferedWriter(Path.of(csvUserPath))) {
            userRepository.findAll().forEach(x -> {
                try {
                    System.out.println("Writing: " + x.toString());
                    writer.write(x.toString());
                    writer.newLine();
                    Thread.sleep(300);
                } catch (IOException | InterruptedException e) {
                    throw new RuntimeException(e);
                }
            });
        }

        try (Stream<String> lines = Files.lines(Path.of(csvUserPath))) {
            return lines.count();
        } catch (IOException e) {
            e.printStackTrace();
            throw new Exception("Error al contar las líneas del CSV", e);
        }
    };

    private Runnable saveWallets = () ->{
        try (BufferedWriter writer = Files.newBufferedWriter(Path.of(csvWalletPath))) {
            walletRepository.findAll().forEach(x -> {
                try {
                    writer.write(x.toString());
                    writer.newLine();
                    Thread.sleep(300);
                    System.out.println("Writing: " + x.toString());
                } catch (IOException | InterruptedException e) {
                    throw new RuntimeException(e);
                }
            });
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar wallets",e);
        }

    };

    private Supplier<Optional<Long>> countWalletsCsv= ()->{
                try (Stream<String> lines = Files.lines(Path.of(csvWalletPath))) {
                    System.out.println("Counting wallets ... :D");
                    Thread.sleep(300);
                    return Optional.of(lines.count());
                } catch (Exception e) {
                    System.out.println("Error counting wallets:(");
                    return Optional.empty();
                }
            };
}
