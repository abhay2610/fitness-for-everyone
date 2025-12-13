# Frontend - Fitness Tracker

## ✅ NPM Registry Configuration

This project is configured to use **ONLY the public npm registry**:

- **Public npm**: https://registry.npmjs.org/
- **No company or private registries**

### Files that ensure public registry only:

1. **`.npmrc`** - Project-specific npm configuration
2. **`package-lock.json`** - Regenerated using public registry

## 🚀 Running Locally

```bash
# Install dependencies (uses public npm only)
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📦 Dependencies

All dependencies are from public npm registry:
- React 18.3.1
- React DOM 18.3.1
- Axios 1.6.0
- Vite 5.4.8
- @vitejs/plugin-react 4.3.2

## 🔒 Security Note

This project does NOT use any:
- ❌ Company npm registries
- ❌ Private npm registries  
- ❌ ServiceNow/devsnc resources
- ✅ Only public packages from npmjs.org

## 🌐 Deployment

When deploying to Netlify:
- The `.npmrc` file ensures only public npm is used
- All dependencies are downloaded from npmjs.org
- Zero company resources accessed
