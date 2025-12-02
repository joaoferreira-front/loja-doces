package com.candystore.controller;

import com.candystore.model.Produto;
import com.candystore.repository.ProdutoRepository;
import com.candystore.session.Carrinho;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/carrinho")
public class CarrinhoController {

    @Autowired
    private Carrinho carrinho;

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping
    public String verCarrinho(Model model) {
        model.addAttribute("itens", carrinho.getItens());
        model.addAttribute("total", carrinho.getTotal());
        return "carrinho";
    }

    @PostMapping("/adicionar/{id}")
    public String adicionarAoCarrinho(@PathVariable Long id) {
        Produto produto = produtoRepository.findById(id).orElse(null);
        if (produto != null) {
            carrinho.adicionarItem(produto, 1);
        }
        return "redirect:/carrinho";
    }

    @GetMapping("/remover/{id}")
    public String removerDoCarrinho(@PathVariable Long id) {
        carrinho.removerItem(id);
        return "redirect:/carrinho";
    }
}
