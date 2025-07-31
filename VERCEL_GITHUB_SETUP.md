# 🚀 GitHub to Vercel Deployment Guide

## Step 1: GitHub Repository Setup

### Upload to GitHub:
1. Create a new repository on GitHub
2. Upload your entire `Ideathon` folder (including the `logistics` subfolder)
3. Your GitHub structure should look like:
   ```
   your-repo/
   ├── logistics/          ← Your main project
   │   ├── package.json
   │   ├── src/
   │   ├── public/
   │   ├── vite.config.js
   │   └── vercel.json
   └── other-files/
   ```

## Step 2: Vercel Import Settings

### When importing from GitHub to Vercel, use these EXACT settings:

**🎯 Project Configuration:**
- **Framework Preset:** `Vite`
- **Root Directory:** `logistics`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Node.js Version:** `18.x` (recommended)

### 📋 Vercel Dashboard Settings:

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. **IMPORTANT:** Set Root Directory to `logistics`
5. Vercel should auto-detect Vite framework
6. Click "Deploy"

## Step 3: Environment Variables (if needed)

If you get environment errors, add these in Vercel dashboard:
```
NODE_ENV=production
VITE_APP_NAME=MKSS Logistics
```

## Step 4: Build Settings Override

If auto-detection fails, manually set:

**Build & Development Settings:**
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Development Command: npm run dev
```

## Common Issues & Solutions

### ❌ "Build failed" Error:
**Solution:** Make sure Root Directory is set to `logistics`

### ❌ "Module not found" Error:
**Solution:** Check that all dependencies are in package.json

### ❌ "404 on page refresh" Error:
**Solution:** vercel.json is already configured for SPA routing

### ❌ "Build command not found" Error:
**Solution:** Ensure Root Directory points to the folder with package.json

## Verification Checklist

Before deploying, ensure:
- [x] Root Directory: `logistics`
- [x] package.json exists in logistics folder
- [x] src/ folder exists in logistics folder
- [x] vercel.json is configured
- [x] All dependencies are listed in package.json

## Expected File Structure on GitHub

```
your-github-repo/
├── logistics/                    ← Set this as Root Directory
│   ├── package.json             ← Build commands here
│   ├── vite.config.js           ← Vite configuration
│   ├── vercel.json              ← Deployment config
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   └── pages/
│   ├── public/
│   └── dist/                    ← Build output
└── other-files/
```

## Success Indicators

✅ **Successful deployment shows:**
- Build logs show "vite build" command
- Output shows "dist/index.html" created
- Site loads with navigation working
- All portal pages accessible

## Quick Fix Commands

If you need to rebuild locally first:
```bash
cd "c:\Users\Ankit Yadav\Desktop\Ideathon\logistics"
npm install
npm run build
```

Then commit and push the updated files to GitHub.

---

**🎯 Key Point:** Always set Root Directory to `logistics` in Vercel settings!