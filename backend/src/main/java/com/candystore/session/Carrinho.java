package com.candystore.session;

import com.candystore.model.ItemPedido;
import com.candystore.model.Produto;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
@SessionScope
public class Carrinho {
    private List<ItemPedido> itens = new ArrayList<>();

    public void adicionarItem(Produto produto, int quantidade) {
        // Check if item already exists
        for (ItemPedido item : itens) {
            if (item.getProduto().getId().equals(produto.getId())) {
                item.setQuantidade(item.getQuantidade() + quantidade);
                return;
            }
        }

        ItemPedido novoItem = new ItemPedido();
        novoItem.setProduto(produto);
        novoItem.setQuantidade(quantidade);
        novoItem.setPrecoUnitario(produto.getPreco());
        itens.add(novoItem);
    }

    public void removerItem(Long produtoId) {
        itens.removeIf(item -> item.getProduto().getId().equals(produtoId));
    }

    public List<ItemPedido> getItens() {
        return itens;
    }

    public BigDecimal getTotal() {
        return itens.stream()
                .map(item -> item.getPrecoUnitario().multiply(new BigDecimal(item.getQuantidade())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public void limpar() {
        itens.clear();
    }
}
