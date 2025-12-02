package com.candystore.controller;

import com.candystore.dto.ProdutoDTO;
import com.candystore.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

// @RestController: Agora somos uma API! Retornamos dados (JSON), não HTML.
@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    // @Autowired: Injeta automaticamente o nosso serviço de produtos.
    // Não precisamos criar 'new ProdutoService()', o Spring faz isso pra gente.
    @Autowired
    private ProdutoService produtoService;

    // Retorna a lista de produtos em formato JSON.
    @GetMapping
    public List<ProdutoDTO> listarProdutos() {
        // Chama o serviço para buscar todos os produtos cadastrados no banco.
        return produtoService.findAll();
    }
}
