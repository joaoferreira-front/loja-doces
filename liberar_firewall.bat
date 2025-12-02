@echo off
echo ==========================================================
echo       LIBERANDO ACESSO PARA O CELULAR (FIREWALL)
echo ==========================================================
echo.
echo Verificando permissoes de administrador...
net session >nul 2>&1
if %errorLevel% == 0 (
    echo [OK] Permissao de administrador confirmada.
) else (
    echo [ERRO] Voce precisa rodar este arquivo como ADMINISTRADOR.
    echo.
    echo 1. Feche esta janela.
    echo 2. Clique com o BOTAO DIREITO no arquivo "liberar_firewall.bat".
    echo 3. Escolha "Executar como administrador".
    echo.
    pause
    exit
)

echo.
echo Liberando porta 5173 (Frontend React)...
netsh advfirewall firewall delete rule name="Doces G&J Frontend" >nul 2>&1
netsh advfirewall firewall add rule name="Doces G&J Frontend" dir=in action=allow protocol=TCP localport=5173 profile=any

echo Liberando porta 8080 (Backend Java)...
netsh advfirewall firewall delete rule name="Doces G&J Backend" >nul 2>&1
netsh advfirewall firewall add rule name="Doces G&J Backend" dir=in action=allow protocol=TCP localport=8080 profile=any

echo.
echo ==========================================================
echo               PRONTO! ACESSO LIBERADO
echo ==========================================================
echo.
echo Tente acessar pelo celular novamente:
echo http://192.168.15.9:5173
echo.
pause
