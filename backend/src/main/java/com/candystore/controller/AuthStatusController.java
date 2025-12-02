package com.candystore.controller;

import com.candystore.model.Usuario;
import com.candystore.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthStatusController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/status")
    public ResponseEntity<?> getStatus() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> response = new HashMap<>();

        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            System.out.println("--- AUTH STATUS: AUTHENTICATED AS " + auth.getName() + " ---");
            response.put("authenticated", true);
            response.put("email", auth.getName());

            String role = auth.getAuthorities().stream()
                    .findFirst().map(a -> a.getAuthority()).orElse("ROLE_USER");
            response.put("role", role);

            usuarioRepository.findByEmail(auth.getName()).ifPresent(u -> {
                response.put("nome", u.getNome());
            });
        } else {
            response.put("authenticated", false);
        }

        return ResponseEntity.ok(response);
    }
}
