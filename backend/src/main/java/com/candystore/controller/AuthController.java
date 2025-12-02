package com.candystore.controller;

import com.candystore.model.Usuario;
import com.candystore.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final java.util.List<String> PALAVRAS_PROIBIDAS = java.util.Arrays.asList(
            "palavrao", "feio", "bobo", "chato", "idiota", "burro", "besta", "merda", "bosta", "caralho", "porra",
            "puta", "viado", "corno");

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @org.springframework.web.bind.annotation.RequestBody com.candystore.dto.RegisterRequest request) {
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email já cadastrado!");
        }

        // Profanity Filter
        String nomeLower = request.getNome().toLowerCase();
        for (String palavra : PALAVRAS_PROIBIDAS) {
            if (nomeLower.contains(palavra)) {
                return ResponseEntity.badRequest().body("Nome inválido. Por favor, escolha um nome apropriado.");
            }
        }

        Usuario usuario = new Usuario();
        usuario.setNome(request.getNome());
        usuario.setEmail(request.getEmail());
        usuario.setSenha(passwordEncoder.encode(request.getSenha()));
        usuario.setProvider(Usuario.Provider.LOCAL);

        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Cadastro realizado com sucesso!");
    }
}
