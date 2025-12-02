@echo off
echo ==========================================
echo Iniciando a Loja de Doces...
echo ==========================================

REM Garante que o script rode na pasta correta (onde o arquivo esta)
cd /d "%~dp0"

REM Configurando o Java (JDK 21)
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.8.9-hotspot"

REM Rodando com o Maven embutido do VS Code
"C:\Users\joao\.vscode\extensions\oracle.oracle-java-24.1.2\nbcode\java\maven\bin\mvn.cmd" org.springframework.boot:spring-boot-maven-plugin:run

pause
