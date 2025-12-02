@echo off
echo ==========================================
echo Iniciando a Loja de Doces...
echo Acessar em: http://localhost:8082
echo ==========================================

REM Garante que o script rode na pasta correta
cd /d "%~dp0\backend"

REM Configurando o Java (JDK 21)
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.8.9-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"

REM Iniciando o Backend com Maven (Caminho Absoluto)
call "C:\Users\joao\.vscode\extensions\oracle.oracle-java-24.1.2\nbcode\java\maven\bin\mvn.cmd" spring-boot:run

pause
