package com.candystore.service;

import com.candystore.model.Usuario;
import com.candystore.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("--- Tentativa de login: " + email + " ---");
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> {
                    System.out.println("--- Usuário NÃO encontrado: " + email + " ---");
                    return new UsernameNotFoundException("Usuário não encontrado: " + email);
                });

        System.out
                .println("--- Usuário encontrado: " + usuario.getEmail() + " | Senha: " + usuario.getSenha() + " ---");

        String role = "USER";
        if ("admin@doces.com".equals(usuario.getEmail())) {
            role = "ADMIN";
        }

        return User.withUsername(usuario.getEmail())
                .password(usuario.getSenha())
                .roles(role)
                .build();
    }
}
