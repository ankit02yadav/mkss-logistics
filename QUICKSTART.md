# 🚀 MKSS Logistics Platform - Quick Start Guide

## ⚡ Super Quick Start (30 seconds)

```bash
# 1. Navigate to project
cd "c:\Users\Ankit Yadav\Desktop\Ideathon\logistics"

# 2. Install dependencies
npm install

# 3. Setup environment
npm run mkss:setup

# 4. Start the platform
npm run mkss:start
```

Then open **http://localhost:5173** in your browser! 🎉

---

## 🛠 MKSS Custom Commands

We've created special commands just for the MKSS Logistics Platform:

### 🚀 `npm run mkss:start`
**The main command you'll use!**
- Starts both frontend and backend servers
- Beautiful colored output with server names
- Auto-restart on file changes
- Shows both server logs in one terminal

### ⚙️ `npm run mkss:setup`
**Run this first time or when having issues**
- Checks Node.js version
- Verifies MongoDB installation
- Creates .env file automatically
- Creates necessary directories
- Shows helpful setup instructions

### 📦 `npm run mkss:build`
**Build for production**
- Creates optimized production build
- Shows success message when complete

### 🧹 `npm run mkss:clean`
**Clean slate restart**
- Removes node_modules and package-lock.json
- Reinstalls all dependencies fresh
- Useful when having dependency issues

### 🏥 `npm run mkss:health`
**Check if server is running**
- Quick health check of the backend API
- Useful for debugging

---

## 📋 Prerequisites

Make sure you have:
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 🎯 Step-by-Step First Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
npm run mkss:setup
```
This will:
- Check your system requirements
- Create .env file with default settings
- Show you what to do next

### 3. Start MongoDB
**Option A: Local MongoDB**
```bash
# Windows
net start MongoDB
# Or just run: mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create free account at https://www.mongodb.com/atlas
- Get connection string
- Update `.env` file: `MONGODB_URI=your-connection-string`

### 4. Launch the Platform
```bash
npm run mkss:start
```

You'll see colorful output like:
```
[🚀SERVER] 🚀 MKSS Logistics Server running on port 5000
[⚡FRONTEND] ➜  Local:   http://localhost:5173/
```

### 5. Open in Browser
Go to **http://localhost:5173**

---

## 👥 Testing Different User Roles

### Create Test Accounts:

1. **MSME Account** (Business Owner)
   - Register at http://localhost:5173/register
   - Role: MSME
   - Test creating delivery requests

2. **Driver Account** 
   - Use different browser or incognito mode
   - Role: Driver  
   - Test viewing and managing deliveries

3. **Warehouse Account**
   - Use another browser/incognito
   - Role: Warehouse
   - Test inventory management

---

## 🌐 Application URLs

Once running:
- **Main App**: http://localhost:5173
- **API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

---

## 🔧 Troubleshooting

### Port Already in Use?
```bash
# Kill processes on the ports
npx kill-port 5173
npx kill-port 5000
```

### MongoDB Issues?
```bash
# Check if MongoDB is running
npm run mkss:health
```

### Dependencies Issues?
```bash
# Clean reinstall
npm run mkss:clean
```

### Still Having Issues?
1. Run `npm run mkss:setup` again
2. Check the colored output for specific error messages
3. Make sure MongoDB is running
4. Try restarting your terminal

---

## 💡 Pro Tips

- **Different User Roles**: Use different browsers or incognito windows to test different user roles simultaneously
- **Real-time Updates**: Open multiple browser tabs to see real-time updates between MSME, Driver, and Warehouse dashboards
- **API Testing**: Use the health check endpoint to verify backend is running
- **Development**: Files auto-reload, so you can make changes and see them immediately

---

## 🏢 About the Platform

**MKSS Foundation - Ethical Logistics Platform** connects:
- 🏭 **MSMEs** - Small businesses needing logistics
- 🚛 **Drivers** - Delivery personnel 
- 🏪 **Warehouses** - Storage and distribution centers

**Serving Delhi's Industrial Hubs:**
- Okhla Industrial Area
- Bawana Industrial Area  
- Mayapuri Industrial Area
- Wazirpur Industrial Area

---

## 🎉 You're Ready!

Run `npm run mkss:start` and start building ethical logistics solutions for Delhi's industrial community!

**Happy Coding! 🚀**