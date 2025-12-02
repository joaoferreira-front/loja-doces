package com.candystore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication: Esta anotação mágica diz que esta é uma aplicação Spring Boot.
// Ela configura tudo automaticamente para nós (banco de dados, servidor web, etc).
@SpringBootApplication
public class CandyStoreApplication {

    // O método main é o ponto de partida de qualquer aplicação Java.
    // Quando rodamos o projeto, é aqui que tudo começa!
    public static void main(String[] args) {
        // SpringApplication.run: Este comando inicia o servidor do Spring Boot (Tomcat)
        // e coloca nossa loja de doces no ar.
        SpringApplication.run(CandyStoreApplication.class, args);
    }

}
