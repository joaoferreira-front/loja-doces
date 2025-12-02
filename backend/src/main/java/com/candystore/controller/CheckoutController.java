package com.candystore.controller;

import com.candystore.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.candystore.dto.PedidoDTO;
import com.candystore.model.Pedido;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private com.candystore.repository.UsuarioRepository usuarioRepository;

    @Autowired
    private com.candystore.repository.PedidoRepository pedidoRepository;

    @PostMapping
    public ResponseEntity<?> checkout(@RequestBody @Valid PedidoDTO pedidoDTO) {
        try {
            Pedido pedido = pedidoService.criarPedido(pedidoDTO);

            // Link logged in user if available
            org.springframework.security.core.Authentication auth = org.springframework.security.core.context.SecurityContextHolder
                    .getContext().getAuthentication();

            System.out.println("--- CHECKOUT DEBUG ---");
            if (auth != null) {
                System.out.println("Auth Status: " + auth.isAuthenticated());
                System.out.println("Principal: " + auth.getPrincipal());
                System.out.println("Name: " + auth.getName());
            } else {
                System.out.println("Auth is NULL");
            }

            if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
                String email = auth.getName();
                usuarioRepository.findByEmail(email).ifPresentOrElse(u -> {
                    System.out.println("User found: " + u.getEmail());
                    pedido.setCliente(u);
                    pedidoRepository.save(pedido);
                    System.out.println("Order " + pedido.getId() + " linked to user " + u.getEmail());
                }, () -> {
                    System.out.println("User NOT found in DB: " + email);
                });
            } else {
                System.out.println("User treated as ANONYMOUS");
            }

            return ResponseEntity.ok(pedido);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao processar pedido: " + e.getMessage());
        }
    }
}
