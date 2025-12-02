package com.candystore.controller;

import com.candystore.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping("/")
    public String home(Model model) {
        // Busca todos os produtos para exibir na vitrine
        model.addAttribute("produtos", produtoRepository.findAll());
        return "index";
    }
}
