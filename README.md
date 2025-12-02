# 🍬 Loja de Doces G & J - Guia do Projeto

Este é o guia oficial para gerenciar, rodar e salvar seu projeto "Doces G & J".

## 🚀 Como Rodar o Projeto (Automático)

Eu criei um "botão mágico" para você.

1.  Vá até a pasta `Loja-de-Doce`.
2.  Dê um **duplo clique** no arquivo `iniciar_loja.bat`.
3.  Pronto! Duas janelas pretas vão abrir (não feche elas!) e o site vai abrir no seu navegador.

---

## 💾 Como Salvar no GitHub (O jeito certo)

Salvar no GitHub é a melhor forma de garantir que você nunca vai perder seu trabalho.

### Passo 1: Criar o Repositório no GitHub
1.  Acesse [github.com/new](https://github.com/new) (faça login se precisar).
2.  Nome do Repositório: `loja-doces-g-j`.
3.  **IMPORTANTE**: Marque a opção **Private** (Privado). Isso protege seu código e suas senhas.
4.  **NÃO** marque "Add a README file" (nós já temos um).
5.  Clique em **Create repository**.

### Passo 2: Enviar o Código (Pela primeira vez)
Abra o terminal na pasta `Loja-de-Doce` e digite os comandos abaixo, um por um:

```bash
# 1. Inicia o Git (se ainda não fez)
git init

# 2. Adiciona todos os arquivos
git add .

# 3. Salva a versão atual
git commit -m "Primeira versão da Loja de Doces G&J"

# 4. Conecta com o GitHub (SUBSTITUA O LINK PELO SEU!)
git remote add origin https://github.com/SEU_USUARIO/loja-doces-g-j.git

# 5. Envia para a nuvem
git push -u origin master
```

### Passo 3: Salvar alterações futuras
Sempre que você mudar algo e quiser salvar:

```bash
git add .
git commit -m "Descreva o que mudou (ex: mudei a cor do botão)"
git push
```

---

## 🌟 Funcionalidades Implementadas

### 🎨 Design & Experiência (Novo!)
*   **Hero Ultra Minimalista:** Fundo animado com efeito cascata infinito.
*   **Scroll Reveal:** Elementos aparecem suavemente conforme você rola a página.
*   **Animações Staggered:** Efeito "degrau" na entrada de textos e cards.
*   **Depoimentos:** Seção dinâmica com avaliações reais (incluindo a Margarete C.!).
*   **Footer:** Rodapé elegante com créditos discretos.

### 🛒 Cliente
*   **Catálogo de Produtos:** Visualização de doces com preços e fotos.
*   **Carrinho de Compras:** Adicionar/Remover itens.
*   **Checkout:** Pagamento via PIX (com QR Code real), Cartão ou Dinheiro.
*   **Meus Pedidos:** Histórico completo.
*   **Rastreamento em Tempo Real:** Barra de progresso (Recebido -> Preparando -> Saiu -> Entregue).

### 👮‍♂️ Painel Administrativo
*   **Dashboard:** Visão geral do estoque e pedidos.
*   **Gestão de Pedidos:**
    *   Ver nome e e-mail do cliente.
    *   **Avançar Status:** Botão para mudar a etapa do pedido.
    *   **Cancelar Pedido:** Estorna o estoque automaticamente.
*   **Logs de Acesso:** Monitoramento de quem entra no sistema.

---

## 🔑 Acesso ao Sistema

### 👤 Cliente (Teste)
*   **Login:** `neto`
*   **Senha:** `123`

### 👑 Administrador
*   **URL:** [http://localhost:8082/admin](http://localhost:8082/admin)
*   **Login:** `admin@doces.com`
*   **Senha:** `Jucabala@123`

---

## 📂 Estrutura das Pastas

*   **`backend/`**: O "cérebro" do sistema (Java/Spring Boot).
    *   `src/main/java/.../ProdutoService.java`: Onde você adiciona/remove doces.
*   **`frontend/`**: O "rosto" do sistema (React/Site).
    *   `src/components/`: Onde ficam as partes visuais (Botões, Cabeçalho).
    *   `src/pages/`: As páginas do site (Home, Menu, Contato).

