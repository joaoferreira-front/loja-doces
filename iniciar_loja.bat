@echo off
echo ==========================================
echo Iniciando a Loja de Doces G ^& J...
echo ==========================================

REM Configurando o Java (JDK 21)
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.8.9-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo Iniciando o Backend (Java)...
start "Backend Doces G&J" cmd /k "cd backend && "C:\Users\joao\.vscode\extensions\oracle.oracle-java-24.1.2\nbcode\java\maven\bin\mvn.cmd" spring-boot:run -U"

echo Iniciando o Frontend (React)...
start "Frontend Doces G&J" cmd /k "cd frontend && npm.cmd run dev"

echo ===============================================================================
echo                 LOJA INICIADA COM SUCESSO!
echo ===============================================================================
echo.
echo ACESSO PELO CELULAR:
echo 1. Conecte seu celular no mesmo Wi-Fi deste computador.
echo 2. Veja o "Endereço IPv4" abaixo (ex: 192.168.0.X):
echo.
ipconfig | findstr "IPv4"
echo.
echo 3. Digite no navegador do celular: http://[SEU_IP]:5173
echo.
echo ===============================================================================
pause
