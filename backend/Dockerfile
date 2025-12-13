# Use Maven image to build
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy project-specific Maven settings (uses only public Maven Central)
COPY settings.xml /root/.m2/settings.xml

# Copy project files
COPY pom.xml .
COPY src ./src

# Build using project settings (no company repositories)
RUN mvn clean package -DskipTests -s /root/.m2/settings.xml

# Use JRE image to run
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/fitness-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
