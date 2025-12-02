package com.candystore.service;

import com.candystore.enums.FormaPagamento;
import com.candystore.model.ItemPedido;
import com.candystore.model.Pedido;
import com.candystore.repository.PedidoRepository;
import com.candystore.session.Carrinho;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import com.candystore.dto.ItemPedidoDTO;
import com.candystore.dto.PedidoDTO;
import com.candystore.model.Produto;
import com.candystore.repository.ProdutoRepository;
import java.math.BigDecimal;
import java.util.ArrayList;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProdutoRepository produtoRepository; // Added ProdutoRepository dependency

    @Autowired(required = false) // Made optional as its usage might be removed or changed
    private Carrinho carrinho; // Injected Carrinho if it's still needed for limpar()

    @Transactional
    public Pedido criarPedido(PedidoDTO pedidoDTO) {
        Pedido pedido = new Pedido();
        pedido.setDataPedido(LocalDateTime.now());
        pedido.setDataEntrega(pedidoDTO.getDataEntrega());
        pedido.setFormaPagamento(pedidoDTO.getFormaPagamento());

        List<ItemPedido> itens = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (ItemPedidoDTO itemDTO : pedidoDTO.getItens()) {
            Produto produto = produtoRepository.findById(itemDTO.getProdutoId())
                    .orElseThrow(
                            () -> new IllegalArgumentException("Produto não encontrado: " + itemDTO.getProdutoId()));

            // Validação de Estoque
            if (produto.getQuantidade() < itemDTO.getQuantidade()) {
                throw new IllegalArgumentException("Estoque insuficiente para o produto: " + produto.getNome());
            }

            // Baixa no Estoque
            produto.setQuantidade(produto.getQuantidade() - itemDTO.getQuantidade());
            produtoRepository.save(produto);

            ItemPedido item = new ItemPedido();
            item.setProduto(produto);
            item.setQuantidade(itemDTO.getQuantidade());
            item.setPrecoUnitario(produto.getPreco());
            item.setPedido(pedido);

            itens.add(item);
            total = total.add(produto.getPreco().multiply(new BigDecimal(itemDTO.getQuantidade())));
        }

        pedido.setItens(itens);
        pedido.setValorTotal(total);

        pedidoRepository.save(pedido);
        if (carrinho != null) { // Check if carrinho is injected before clearing
            carrinho.limpar(); // Limpa o carrinho da sessão (se estiver usando sessão)
        }

        return pedido;
    }
}
