package com.candystore.controller;

import com.candystore.repository.PedidoRepository;
import com.candystore.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.candystore.enums.StatusPedido;
import java.math.BigDecimal;

@Controller
public class AdminController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private com.candystore.service.PedidoService pedidoService;

    @Autowired
    private com.candystore.repository.LoginLogRepository loginLogRepository;

    @GetMapping("/admin")
    public String dashboard(Model model) {
        // Busca todos os produtos e pedidos para exibir na tela de admin
        var pedidos = pedidoRepository.findAll();

        // Calcula o total vendido (apenas pedidos não cancelados)
        BigDecimal totalVendas = pedidos.stream()
                .filter(p -> p.getStatus() != StatusPedido.CANCELADO)
                .map(p -> p.getValorTotal() != null ? p.getValorTotal() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        model.addAttribute("produtos", produtoRepository.findAll());
        model.addAttribute("pedidos", pedidos);
        model.addAttribute("totalVendas", totalVendas);
        model.addAttribute("logs", loginLogRepository.findTop20ByOrderByDataHoraDesc());
        return "admin";
    }

    /**
     * Cancela um pedido específico.
     * 
     * @param id ID do pedido a ser cancelado.
     * @return Redireciona para o painel administrativo.
     */
    @org.springframework.web.bind.annotation.PostMapping("/admin/cancelar/{id}")
    public String cancelarPedido(@org.springframework.web.bind.annotation.PathVariable Long id) {
        pedidoService.cancelarPedido(id);
        return "redirect:/admin";
    }

    /**
     * Avança o status do pedido para a próxima etapa lógica.
     * 
     * @param id ID do pedido.
     * @return Redireciona para o painel administrativo.
     */
    @org.springframework.web.bind.annotation.PostMapping("/admin/avancar-status/{id}")
    public String avancarStatus(@org.springframework.web.bind.annotation.PathVariable Long id) {
        pedidoService.avancarStatus(id);
        return "redirect:/admin";
    }
}
