# Backend - Fitness Tracker

## ✅ Repository Configuration

This project is configured to use **ONLY public, open-source repositories**:

- **Maven Central**: https://repo.maven.apache.org/maven2
- **No company or private repositories**

### Files that ensure public repositories only:

1. **`settings.xml`** - Project-specific Maven settings
2. **`pom.xml`** - Explicit repository configuration
3. **`Dockerfile`** - Uses project settings during build

## 🚀 Building Locally

To build this project using only public repositories:

```bash
# Build with project-specific settings
mvn clean install -s settings.xml

# Or run the application
mvn spring-boot:run -s settings.xml
```

## 🐳 Docker Build

The Dockerfile automatically uses the project's `settings.xml`, ensuring:
- ✅ Only Maven Central is used
- ✅ No company repositories
- ✅ 100% open-source dependencies

```bash
docker build -t fitness-backend .
docker run -p 8080:8080 fitness-backend
```

## 📦 Dependencies

All dependencies are from Maven Central (public):
- Spring Boot 3.3.4
- Spring Data JPA
- H2 Database
- Lombok
- Spring Boot Validation

## 🔒 Security Note

This project does NOT use any:
- ❌ Company repositories
- ❌ Private Maven repositories
- ❌ ServiceNow/devsnc resources
- ✅ Only public, open-source libraries from Maven Central
