# Deployment Guide

This guide will help you deploy the Fitness Tracker app on free hosting platforms.

## 🚀 Deployment Architecture

- **Frontend**: Netlify (Free tier)
- **Backend**: Render (Free tier)
- **Database**: H2 In-Memory (included with backend)

## 📋 Prerequisites

1. GitHub account
2. Netlify account (sign up at https://netlify.com)
3. Render account (sign up at https://render.com)

## 🔧 Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Fitness Tracker App"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/fitness-for-everyone.git
git branch -M main
git push -u origin main
```

## 🖥️ Step 2: Deploy Backend on Render

### Option A: Using Render Dashboard

1. Go to https://render.com and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `fitness-backend`
   - **Environment**: `Java`
   - **Build Command**: `mvn clean install -DskipTests`
   - **Start Command**: `java -jar target/fitness-backend-0.0.1-SNAPSHOT.jar`
   - **Instance Type**: `Free`
5. Add Environment Variables:
   - `JAVA_OPTS`: `-Xmx512m`
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. **Copy your backend URL** (e.g., `https://fitness-backend-xxxx.onrender.com`)

### Option B: Using render.yaml (Automatic)

1. The `render.yaml` file is already in the backend folder
2. Go to Render Dashboard → "New +" → "Blueprint"
3. Connect your repository
4. Render will automatically detect and deploy using the YAML config

### ⚠️ Important Notes for Render Free Tier:
- Backend will spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds to wake up
- Database resets on every deployment (H2 in-memory)

## 🌐 Step 3: Deploy Frontend on Netlify

### Option A: Using Netlify Dashboard

1. Go to https://netlify.com and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Add Environment Variable:
   - **Key**: `VITE_API_BASE`
   - **Value**: Your Render backend URL (from Step 2)
     Example: `https://fitness-backend-xxxx.onrender.com`
6. Click "Deploy site"
7. Wait for deployment (2-3 minutes)
8. Your app is live! 🎉

### Option B: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Navigate to frontend
cd frontend

# Build the app
npm run build

# Deploy
netlify deploy --prod

# Follow the prompts:
# - Create & configure a new site
# - Set publish directory to: dist
```

### Update Environment Variable

After deployment, update the backend URL:

1. Go to Netlify Dashboard → Your Site → Site settings → Environment variables
2. Add or update `VITE_API_BASE` with your Render backend URL
3. Trigger a new deployment: Deploys → Trigger deploy → Deploy site

## 🔗 Step 4: Update Frontend to Use Backend URL

Edit `frontend/.env.production`:

```env
VITE_API_BASE=https://your-actual-backend-url.onrender.com
```

Then redeploy the frontend on Netlify.

## ✅ Step 5: Test Your Deployed App

1. Visit your Netlify URL (e.g., `https://your-app-name.netlify.app`)
2. Try adding a workout
3. Try adding a progress entry
4. Verify data is saved and displayed

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Check CORS is enabled on backend (should be `@CrossOrigin(origins = "*")`)
- Verify `VITE_API_BASE` environment variable is set correctly
- Check browser console for errors

### Backend is slow to respond
- Render free tier spins down after inactivity
- First request takes 30-60 seconds to wake up
- Consider upgrading to paid tier for always-on service

### Database resets on deployment
- H2 is in-memory, data is lost on restart
- For persistent data, upgrade to PostgreSQL on Render
- See "Upgrading to PostgreSQL" section below

## 📊 Alternative Free Hosting Options

### Backend Alternatives:
1. **Railway** (https://railway.app) - 500 hours/month free
2. **Fly.io** (https://fly.io) - Free tier available
3. **Heroku** (https://heroku.com) - Limited free tier

### Frontend Alternatives:
1. **Vercel** (https://vercel.com) - Unlimited free deployments
2. **GitHub Pages** - Free static hosting
3. **Cloudflare Pages** - Free with unlimited bandwidth

## 🔄 Upgrading to PostgreSQL (Optional)

To persist data across deployments:

1. On Render, create a new PostgreSQL database (free tier available)
2. Update `backend/src/main/resources/application.properties`:

```properties
# PostgreSQL Configuration
spring.datasource.url=${DATABASE_URL}
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
```

3. Add PostgreSQL dependency to `pom.xml`:

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

4. Render will automatically inject `DATABASE_URL` environment variable

## 📝 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed on Render
- [ ] Backend URL copied
- [ ] Frontend environment variable updated with backend URL
- [ ] Frontend deployed on Netlify
- [ ] App tested and working
- [ ] Custom domain configured (optional)

## 🎉 Your App is Live!

Share your deployed app URL with others:
- Frontend: `https://your-app-name.netlify.app`
- Backend API: `https://your-backend-name.onrender.com/api/workouts`

## 💡 Tips

1. **Custom Domain**: Both Netlify and Render support custom domains for free
2. **HTTPS**: Automatically enabled on both platforms
3. **Continuous Deployment**: Both platforms auto-deploy on git push
4. **Monitoring**: Use Render and Netlify dashboards to monitor deployments

## 📞 Support

If you encounter issues:
- Netlify Docs: https://docs.netlify.com
- Render Docs: https://render.com/docs
- GitHub Issues: Open an issue in your repository
