package com.candystore.controller;

import com.candystore.model.Pedido;
import com.candystore.repository.PedidoRepository;
import com.candystore.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/debug")
public class DebugController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrders() {
        List<Pedido> pedidos = pedidoRepository.findAll();

        List<String> summaries = pedidos.stream().map(p -> "ID: " + p.getId() +
                " | Cliente: " + (p.getCliente() != null ? p.getCliente().getEmail() : "NULL") +
                " | Status: " + p.getStatus() +
                " | Valor: " + p.getValorTotal()).collect(Collectors.toList());

        return ResponseEntity.ok(summaries);
    }

    @GetMapping("/me")
    public ResponseEntity<?> debugMyUser(Authentication auth) {
        StringBuilder sb = new StringBuilder();
        sb.append("=== DIAGNÓSTICO DO USUÁRIO ===\n");

        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            sb.append("❌ Status: NÃO LOGADO (Anônimo)\n");
            sb.append("Dica: Faça login novamente.\n");
            return ResponseEntity.ok(sb.toString());
        }

        String email = auth.getName();
        sb.append("✅ Status: LOGADO\n");
        sb.append("📧 Email na Sessão: ").append(email).append("\n");

        usuarioRepository.findByEmail(email).ifPresentOrElse(u -> {
            sb.append("👤 Usuário encontrado no Banco de Dados: SIM\n");
            sb.append("🆔 ID do Usuário: ").append(u.getId()).append("\n");
            sb.append("📛 Nome: ").append(u.getNome()).append("\n");

            List<Pedido> pedidos = pedidoRepository.findByCliente(u);
            sb.append("📦 Pedidos encontrados: ").append(pedidos.size()).append("\n");

            for (Pedido p : pedidos) {
                sb.append("   - Pedido #").append(p.getId())
                        .append(" | Status: ").append(p.getStatus())
                        .append(" | Valor: R$ ").append(p.getValorTotal()).append("\n");
            }
        }, () -> {
            sb.append("❌ ERRO CRÍTICO: Usuário autenticado na sessão MAS NÃO EXISTE no banco de dados!\n");
            sb.append("Isso explica por que os pedidos não salvam/aparecem.\n");
        });

        return ResponseEntity.ok(sb.toString());
    }
}
