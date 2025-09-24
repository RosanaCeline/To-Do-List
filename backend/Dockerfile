# Stage 1: Build
FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /app

# Copia apenas arquivos de configuração do Maven primeiro para aproveitar cache
COPY pom.xml .
COPY mvnw .
COPY .mvn ./.mvn
COPY src ./src

RUN chmod +x mvnw

# Build do projeto (gera JAR)
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Porta que o Spring vai usar
ENV SERVER_PORT=8080

# Copia JAR do stage de build
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
