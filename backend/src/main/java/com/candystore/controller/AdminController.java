package com.candystore.controller;

import com.candystore.repository.PedidoRepository;
import com.candystore.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @GetMapping("/admin")
    public String dashboard(Model model) {
        // Busca todos os produtos e pedidos para exibir na tela de admin
        model.addAttribute("produtos", produtoRepository.findAll());
        model.addAttribute("pedidos", pedidoRepository.findAll());
        return "admin";
    }
}
