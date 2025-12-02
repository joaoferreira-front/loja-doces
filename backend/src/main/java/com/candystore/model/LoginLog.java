package com.candystore.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class LoginLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private LocalDateTime dataHora;
    private boolean sucesso;
    private String mensagem; // "Sucesso", "Senha incorreta", etc.

    public LoginLog() {
    }

    public LoginLog(String email, boolean sucesso, String mensagem) {
        this.email = email;
        this.dataHora = LocalDateTime.now();
        this.sucesso = sucesso;
        this.mensagem = mensagem;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public boolean isSucesso() {
        return sucesso;
    }

    public void setSucesso(boolean sucesso) {
        this.sucesso = sucesso;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
}
