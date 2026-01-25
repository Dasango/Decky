package com.uce;

import com.uce.user.entity.User;
import com.uce.user.repository.UserRepository;
import jakarta.enterprise.inject.se.SeContainer;
import jakarta.enterprise.inject.se.SeContainerInitializer;
import java.util.logging.Logger;
import java.util.logging.Level;

public class Main {
    public static void main(String[] args) {
        java.util.logging.Logger.getLogger("").setLevel(java.util.logging.Level.SEVERE);

        try (SeContainer container = SeContainerInitializer.newInstance().initialize()) {

            UserRepository userRepo = container.select(UserRepository.class).get();

            System.out.println("Creando usuario...");
            User nuevo = new User("david_dev", "david@email.com");
            userRepo.save(nuevo);
            System.out.println("¡Usuario guardado con éxito!");
        }
    }
}