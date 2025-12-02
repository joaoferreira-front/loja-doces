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

echo ==========================================
echo Tudo pronto! Acesse: http://localhost:5173
echo ==========================================
pause
