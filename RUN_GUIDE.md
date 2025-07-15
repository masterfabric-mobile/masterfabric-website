# 🚀 MasterFabric Website - Run Script Usage Guide

This script manages the MasterFabric website Next.js project from development environment to production deployment.

## 🚀 Basic Usage

### 1. 🛠️ Initial Setup (One-time)
```bash
./run.sh setup
```
This command:
- ✅ Checks Node.js version compatibility
- 📦 Installs required npm/pnpm/yarn packages
- ▲ Installs Vercel CLI
- 🔥 Installs Firebase CLI
- 🧪 Sets up test environment
- 🔨 Builds the project

### 2. 🌐 Start Development Server
```bash
./run.sh dev
```
- 🚀 Starts development server on http://localhost:3000
- ⚡ Includes hot reload functionality

### 3. 🔨 Build and Preview
```bash
./run.sh build     # Build only
./run.sh preview   # Build + preview server
```

## 🚀 Deployment Operations

### ▲ Vercel Deploy
```bash
# Preview deploy
./run.sh deploy-vercel

# Production deploy
./run.sh deploy-vercel --prod
```

### 🔥 Firebase Deploy
```bash
./run.sh deploy-firebase
```

### 🌍 Deploy to Both Platforms
```bash
./run.sh deploy-all
```

## ✨ Features

### ✅ Automatic Setup
- 📦 Package manager detection (npm/pnpm/yarn)
- 🛠️ Automatic CLI tools installation
- 📥 Dependency management

### ✅ Environment Management
- 🧪 Test environment setup
- 📄 Environment files creation
- 🎯 Development/production separation

### ✅ Build and Deploy
- ▲ Vercel integration
- 🔥 Firebase hosting integration
- 🎯 Production-ready builds

### ✅ Error Management
- ✅ Requirements checking
- 📢 Descriptive error messages
- 🛡️ Safe execution (set -e)

## 📁 File Structure

The script automatically creates the following files in the project root:

- `vercel.json` - ▲ Vercel deploy configuration
- `firebase.json` - 🔥 Firebase hosting configuration
- `.env.test` - 🧪 Test environment variables

## 📋 Requirements

- 🟢 Node.js 18+
- 📦 npm/pnpm/yarn
- 🔄 Git (for deployment)

## 🔧 Troubleshooting

### 🚫 Permission Denied
```bash
chmod +x run.sh
```

### 🟢 Node.js Version
Script requires Node.js 18+. Please install the latest version.

### 🛠️ CLI Tools
Script automatically installs required CLI tools. No manual installation needed.

## 💡 Examples

```bash
# 🛠️ Full setup and start development
./run.sh setup && ./run.sh dev

# 👀 Quick build and preview
./run.sh preview

# 🎯 Production deploy
./run.sh deploy-vercel --prod

# 🌍 Deploy everywhere
./run.sh deploy-all
```
