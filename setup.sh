#!/bin/bash

# ==========================================
# Script de Configuração - Doceria Showcase
# ==========================================

echo "Iniciando configuração do ambiente Linux..."

# Verificando dependências
if ! command -v node &> /dev/null; then
    echo "ERRO: Node.js não encontrado. Por favor, instale o Node.js."
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "ERRO: Docker não encontrado. Por favor, instale o Docker."
    exit 1
fi

# 1. Configurando o Frontend
echo "------------------------------------------"
echo "Configurando o Frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Instalando dependências do npm..."
    npm install
else
    echo "Dependências do frontend já instaladas."
fi
cd ..

# 2. Configurando o Backend (Docker)
echo "------------------------------------------"
echo "Configurando o Backend (Docker)..."
echo "Construindo a imagem Docker para o backend..."
docker build -t candy-store-backend .

echo "------------------------------------------"
echo "Configuração concluída com sucesso!"
echo ""
echo "Para iniciar o projeto:"
echo "1. No terminal 1 (Backend):"
echo "   docker run -p 8082:8082 candy-store-backend"
echo ""
echo "2. No terminal 2 (Frontend):"
echo "   cd frontend && npm run dev"
echo ""
echo "Acesse em: http://localhost:5173"
echo "=========================================="
