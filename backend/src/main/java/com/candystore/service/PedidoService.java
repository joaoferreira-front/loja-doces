package com.candystore.service;

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
        pedido.setParcelas(pedidoDTO.getParcelas());
        pedido.setStatus(com.candystore.enums.StatusPedido.CONFIRMADO);

        List<ItemPedido> itens = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (ItemPedidoDTO itemDTO : pedidoDTO.getItens()) {
            if (itemDTO.getProdutoId() == null) {
                throw new IllegalArgumentException("ID do produto não pode ser nulo");
            }
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

    /**
     * Cancela um pedido e restaura o estoque dos produtos.
     * 
     * @param id ID do pedido.
     */
    @Transactional
    public void cancelarPedido(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID do pedido não pode ser nulo");
        }
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pedido não encontrado: " + id));

        if (pedido.getStatus() == com.candystore.enums.StatusPedido.CANCELADO) {
            throw new IllegalArgumentException("Pedido já está cancelado.");
        }

        // Restaurar estoque
        for (ItemPedido item : pedido.getItens()) {
            Produto produto = item.getProduto();
            produto.setQuantidade(produto.getQuantidade() + item.getQuantidade());
            produtoRepository.save(produto);
        }

        pedido.setStatus(com.candystore.enums.StatusPedido.CANCELADO);
        pedidoRepository.save(pedido);
    }

    /**
     * Avança o status do pedido seguindo o fluxo:
     * PENDENTE -> CONFIRMADO -> EM_PREPARO -> SAIU_PARA_ENTREGA -> ENTREGUE
     * 
     * @param id ID do pedido.
     */
    @Transactional
    public void avancarStatus(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID do pedido não pode ser nulo");
        }
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pedido não encontrado: " + id));

        com.candystore.enums.StatusPedido atual = pedido.getStatus();
        com.candystore.enums.StatusPedido proximo = null;

        switch (atual) {
            case PENDENTE:
                proximo = com.candystore.enums.StatusPedido.CONFIRMADO;
                break;
            case CONFIRMADO:
                proximo = com.candystore.enums.StatusPedido.EM_PREPARO;
                break;
            case EM_PREPARO:
                proximo = com.candystore.enums.StatusPedido.SAIU_PARA_ENTREGA;
                break;
            case SAIU_PARA_ENTREGA:
                proximo = com.candystore.enums.StatusPedido.ENTREGUE;
                break;
            default:
                // Não faz nada se já estiver entregue ou cancelado
                return;
        }

        if (proximo != null) {
            pedido.setStatus(proximo);
            pedidoRepository.save(pedido);
        }
    }
}
