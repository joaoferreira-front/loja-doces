@echo off
echo ==========================================
echo Iniciando a Loja de Doces G & J...
echo ==========================================

echo Iniciando o Backend (Java)...
start "Backend Doces G&J" cmd /k "cd backend && mvn spring-boot:run"

echo Iniciando o Frontend (React)...
start "Frontend Doces G&J" cmd /k "cd frontend && npm run dev"

echo ==========================================
echo Tudo pronto! Acesse: http://localhost:5173
echo ==========================================
pause
