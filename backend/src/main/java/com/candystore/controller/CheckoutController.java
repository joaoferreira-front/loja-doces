package com.candystore.controller;

import com.candystore.enums.FormaPagamento;
import com.candystore.service.PedidoService;
import com.candystore.session.Carrinho;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;

import com.candystore.dto.PedidoDTO;
import com.candystore.model.Pedido;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<?> checkout(@RequestBody @Valid PedidoDTO pedidoDTO) {
        try {
            Pedido pedido = pedidoService.criarPedido(pedidoDTO);
            return ResponseEntity.ok(pedido);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao processar pedido: " + e.getMessage());
        }
    }
}
