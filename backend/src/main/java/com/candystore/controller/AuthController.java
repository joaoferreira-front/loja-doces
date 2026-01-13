package com.candystore.controller;

import com.candystore.dto.RegisterRequest;
import com.candystore.model.Usuario;
import com.candystore.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Endpoint de registro de usuário.
     * Recebe um JSON com nome, email e senha e cria o usuário no banco.
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // Verifica se o e‑mail já está cadastrado
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email já cadastrado");
        }
        // Cria a entidade de usuário
        Usuario user = new Usuario();
        user.setNome(request.getNome());
        user.setEmail(request.getEmail());
        user.setSenha(passwordEncoder.encode(request.getSenha()));
        user.setRole(Usuario.Role.USER); // Default to USER
        usuarioRepository.save(user);

        return ResponseEntity.status(201).body(java.util.Collections.singletonMap("redirectUrl", "/"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody com.candystore.dto.LoginRequest request) {
        return usuarioRepository.findByEmail(request.getEmail())
                .filter(user -> passwordEncoder.matches(request.getSenha(), user.getSenha()))
                .map(user -> {
                    String redirectUrl = user.getRole() == Usuario.Role.ADMIN ? "/admin" : "/";
                    return ResponseEntity.ok(java.util.Collections.singletonMap("redirectUrl", redirectUrl));
                })
                .orElse(ResponseEntity.status(401)
                        .body(java.util.Collections.singletonMap("error", "Email ou senha inválidos")));
    }
}
