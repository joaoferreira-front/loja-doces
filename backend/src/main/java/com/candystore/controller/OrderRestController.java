package com.candystore.controller;

import com.candystore.model.Pedido;
import com.candystore.repository.PedidoRepository;
import com.candystore.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
@RequestMapping("/api/meus-pedidos")
public class OrderRestController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private com.candystore.service.PedidoService pedidoService;

    @GetMapping
    public ResponseEntity<List<Pedido>> getMyOrders(@AuthenticationPrincipal UserDetails userDetails) {
        System.out.println("--- GET MY ORDERS DEBUG ---");
        if (userDetails == null) {
            System.out.println("UserDetails is NULL (Unauthorized)");
            return ResponseEntity.status(401).build();
        }

        System.out.println("User: " + userDetails.getUsername());

        return usuarioRepository.findByEmail(userDetails.getUsername())
                .map(usuario -> {
                    List<Pedido> pedidos = pedidoRepository.findByCliente(usuario);
                    System.out.println("Orders found: " + pedidos.size());
                    return ResponseEntity.ok(pedidos);
                })
                .orElseGet(() -> {
                    System.out.println("User not found in DB");
                    return ResponseEntity.notFound().build();
                });
    }

    @PostMapping("/{id}/cancelar")
    public ResponseEntity<?> cancelOrder(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }

        try {
            // Verify if order belongs to user
            Pedido pedido = pedidoRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Pedido não encontrado"));
            if (pedido.getCliente() == null || !pedido.getCliente().getEmail().equals(userDetails.getUsername())) {
                return ResponseEntity.status(403).body("Você não tem permissão para cancelar este pedido.");
            }

            pedidoService.cancelarPedido(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao cancelar pedido.");
        }
    }
}
