package com.candystore.dto;

import com.candystore.enums.FormaPagamento;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class PedidoDTO {
    @NotNull(message = "A forma de pagamento é obrigatória")
    private FormaPagamento formaPagamento;

    @NotNull(message = "A data de entrega é obrigatória")
    @Future(message = "A data de entrega deve ser no futuro")
    private LocalDateTime dataEntrega;

    @NotNull(message = "O pedido deve conter itens")
    @Size(min = 1, message = "O pedido deve conter pelo menos um item")
    private List<ItemPedidoDTO> itens;
}
