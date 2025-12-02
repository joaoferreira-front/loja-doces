@echo off
echo ==========================================
echo Iniciando o Frontend (Site)...
echo ==========================================

REM Garante que o script rode na pasta correta
cd /d "%~dp0\frontend"

REM Instalando dependencias (caso nao existam)
if not exist "node_modules" (
    echo Instalando dependencias...
    call npm install
)

REM Iniciando o servidor de desenvolvimento
echo Iniciando o servidor...
call npm run dev

pause
