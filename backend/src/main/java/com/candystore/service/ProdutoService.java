package com.candystore.service;

import com.candystore.dto.ProdutoDTO;
import com.candystore.model.Produto;
import com.candystore.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

// @Service: Indica que aqui fica a "Lógica de Negócio".
// É onde as regras da loja são processadas (ex: cálculos, validações).
@Service
public class ProdutoService {

        @Autowired
        private ProdutoRepository produtoRepository;

        // Método para buscar todos os produtos e converter para DTO (objeto de
        // transferência).
        // Usamos DTO para proteger nossa entidade principal e enviar apenas o
        // necessário para a tela.
        public List<ProdutoDTO> findAll() {
                // Se o banco estiver vazio, cria alguns produtos de exemplo (Seed).
                if (produtoRepository.count() == 0) {
                        seedDatabase();
                }

                // Busca tudo no banco, converte cada Produto para ProdutoDTO e retorna uma
                // lista.
                return produtoRepository.findAll().stream()
                                .map(this::convertToDTO)
                                .collect(Collectors.toList());
        }

        // Converte a Entidade (Banco) para DTO (Tela)
        private ProdutoDTO convertToDTO(Produto produto) {
                ProdutoDTO dto = new ProdutoDTO();
                dto.setId(produto.getId());
                dto.setNome(produto.getNome());
                dto.setDescricao(produto.getDescricao());
                dto.setPreco(produto.getPreco());
                dto.setQuantidade(produto.getQuantidade());
                dto.setImagemUrl(produto.getImagemUrl());
                return dto;
        }

        // Cria produtos iniciais se o banco estiver vazio.
        private void seedDatabase() {
                produtoRepository.save(new Produto(null, "Brigadeiro Gourmet", "Chocolate belga com granulado macio",
                                new BigDecimal("4.50"), 100,
                                "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=500"));
                produtoRepository.save(new Produto(null, "Beijinho de Coco", "Coco fresco ralado e leite condensado",
                                new BigDecimal("4.00"), 50,
                                "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=500"));
                produtoRepository.save(
                                new Produto(null, "Cupcake Red Velvet", "Massa vermelha aveludada com cream cheese",
                                                new BigDecimal("12.00"), 20,
                                                "https://images.unsplash.com/photo-1614707267469-959e8905cbef?w=500"));
                produtoRepository.save(new Produto(null, "Macaron de Framboesa",
                                "Delicado e crocante com recheio de framboesa",
                                new BigDecimal("8.50"), 30,
                                "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500"));
                produtoRepository.save(new Produto(null, "Torta de Limão",
                                "Massa sablé com creme de limão siciliano e merengue",
                                new BigDecimal("15.00"), 15,
                                "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500"));
                produtoRepository.save(
                                new Produto(null, "Brownie de Nozes", "Chocolate meio amargo com pedaços de nozes",
                                                new BigDecimal("10.00"), 40,
                                                "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500"));
                produtoRepository.save(new Produto(null, "Cheesecake de Frutas Vermelhas",
                                "Base crocante, creme suave e calda caseira",
                                new BigDecimal("18.00"), 10,
                                "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500"));
                produtoRepository.save(new Produto(null, "Bolo de Cenoura", "Cobertura generosa de chocolate ao leite",
                                new BigDecimal("45.00"), 5,
                                "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=500"));
                produtoRepository.save(new Produto(null, "Trufa de Maracujá", "Chocolate branco com recheio azedinho",
                                new BigDecimal("5.00"), 60,
                                "https://images.unsplash.com/photo-1626202158828-eff994a5c3d4?w=500"));
                produtoRepository.save(
                                new Produto(null, "Pão de Mel", "Recheado com doce de leite e coberto com chocolate",
                                                new BigDecimal("7.50"), 25,
                                                "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500"));

                // Novos produtos de teste solicitados
                produtoRepository.save(new Produto(null, "Bolo de Pote de Leite Ninho",
                                "Camadas de bolo fofinho com creme de Leite Ninho",
                                new BigDecimal("12.90"), 15,
                                "https://images.unsplash.com/photo-1563729768-3980d7c7463e?w=500"));
                produtoRepository.save(new Produto(null, "Cone Trufado de Nutella",
                                "Casquinha crocante recheada com Nutella pura",
                                new BigDecimal("9.90"), 20,
                                "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500"));

                // Mais produtos para garantir categorias (Bolo, Doce, Torta)
                produtoRepository.save(new Produto(null, "Bolo de Fubá com Goiabada",
                                "Clássico bolo caseiro com pedaços de goiabada",
                                new BigDecimal("8.00"), 10,
                                "https://images.unsplash.com/photo-1600617294526-80f2ffb02a4e?w=500"));

                produtoRepository.save(new Produto(null, "Doce de Abóbora",
                                "Doce de abóbora caseiro em pedaços com coco",
                                new BigDecimal("6.50"), 30,
                                "https://images.unsplash.com/photo-1576618148400-f54bed99fcf8?w=500"));

                produtoRepository.save(new Produto(null, "Torta Holandesa",
                                "Creme leve com base de biscoito e cobertura de chocolate",
                                new BigDecimal("14.00"), 12,
                                "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500"));

                System.out.println("--- BANCO DE DADOS POPULADO COM SUCESSO! ---");
        }
}
