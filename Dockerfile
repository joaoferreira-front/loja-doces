# Estágio 1: Build da aplicação usando Maven
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copia o pom.xml e o código fonte da pasta backend para dentro do container
COPY backend/pom.xml .
COPY backend/src ./src

RUN mvn clean package -DskipTests

# Estágio 2: Execução da aplicação com um JDK leve
FROM eclipse-temurin:17-jdk-alpine
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
