package com.candystore.controller;

import com.candystore.model.Pedido;
import com.candystore.repository.PedidoRepository;
import com.candystore.repository.UsuarioRepository;
import com.candystore.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/meus-pedidos")
public class ClienteController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public String meusPedidos(@AuthenticationPrincipal UserDetails userDetails, Model model) {
        usuarioRepository.findByEmail(userDetails.getUsername()).ifPresent(usuario -> {
            List<Pedido> pedidos = pedidoRepository.findByCliente(usuario);
            model.addAttribute("pedidos", pedidos);
            model.addAttribute("usuario", usuario.getNome());
        });

        return "meus-pedidos";
    }

    @PostMapping("/cancelar/{id}")
    public String cancelarPedido(@PathVariable Long id) {
        try {
            pedidoService.cancelarPedido(id);
        } catch (Exception e) {
            // Tratar erro (ex: pedido já cancelado)
        }
        return "redirect:/meus-pedidos";
    }
}
