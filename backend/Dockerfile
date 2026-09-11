# ---- Build stage ----
FROM eclipse-temurin:11-jdk-jammy AS build

WORKDIR /app

# Copia primeiro os arquivos do Maven Wrapper e o pom.xml para aproveitar o
# cache de dependências entre builds.
COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN chmod +x mvnw && ./mvnw -B dependency:go-offline

COPY src src
RUN ./mvnw -B -DskipTests package

# ---- Runtime stage ----
FROM eclipse-temurin:11-jre-jammy

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
