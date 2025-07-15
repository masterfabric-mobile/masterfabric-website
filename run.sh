#!/bin/bash

# 🚀 MasterFabric Website - Next.js Development and Deploy Script
# This script sets up, tests, and deploys the Next.js project in the root directory

set -e  # Exit on error

# 🎨 Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 🎯 Logo and header
echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                  🚀 MasterFabric Website                  ║"
echo "║           💻 Next.js Development & Deploy Script          ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# 📢 Functions
print_step() {
    echo -e "${BLUE}[🔄 STEP]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✅ SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[⚠️  WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[❌ ERROR]${NC} $1"
}

# 📁 Check Next.js directory
check_directory() {
    if [[ ! -f "package.json" ]]; then
        print_error "package.json not found. Make sure you're in the project root."
        exit 1
    fi
    print_success "Next.js project directory verified."
}

# 🟢 Check Node.js and npm versions
check_node() {
    print_step "Checking Node.js version..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+."
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [[ $NODE_VERSION -lt 18 ]]; then
        print_error "Node.js 18+ required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "Node.js version is compatible: $(node --version)"
}

# 📦 Detect package manager
detect_package_manager() {
    if [[ -f "pnpm-lock.yaml" ]]; then
        PKG_MANAGER="pnpm"
        print_success "Package manager: pnpm"
    elif [[ -f "yarn.lock" ]]; then
        PKG_MANAGER="yarn"
        print_success "Package manager: yarn"
    else
        PKG_MANAGER="npm"
        print_success "Package manager: npm"
    fi
}

# 📥 Install dependencies
install_dependencies() {
    print_step "Installing dependencies..."
    case $PKG_MANAGER in
        "pnpm")
            if ! command -v pnpm &> /dev/null; then
                print_warning "pnpm not installed. Installing via npm..."
                npm install -g pnpm
            fi
            pnpm install
            ;;
        "yarn")
            if ! command -v yarn &> /dev/null; then
                print_warning "yarn not installed. Installing via npm..."
                npm install -g yarn
            fi
            yarn install
            ;;
        *)
            npm install
            ;;
    esac
    print_success "Dependencies successfully installed."
}

# ▲ Check and install Vercel CLI
setup_vercel() {
    print_step "Checking Vercel CLI..."
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not installed. Installing..."
        npm install -g vercel@latest
        print_success "Vercel CLI installed"
    else
        print_success "Vercel CLI already installed"
    fi
}

# 🔥 Check and install Firebase CLI
setup_firebase() {
    print_step "Checking Firebase CLI..."
    if ! command -v firebase &> /dev/null; then
        print_warning "Firebase CLI not installed. Installing..."
        npm install -g firebase-tools
        print_success "Firebase CLI installed"
    else
        print_success "Firebase CLI already installed"
    fi
}

# 🔨 Build project
build_project() {
    print_step "Building Next.js project..."
    case $PKG_MANAGER in
        "pnpm")
            pnpm run build
            ;;
        "yarn")
            yarn build
            ;;
        *)
            npm run build
            ;;
    esac
    print_success "Build completed successfully."
}

# 🧪 Setup test environment
setup_test_environment() {
    print_step "Setting up test environment..."
    # Create .env.test file (if not exists)
    if [[ ! -f ".env.test" ]]; then
        cat > .env.test << EOF
# Test Environment Variables
NODE_ENV=test
NEXT_PUBLIC_BASE_URL=http://localhost:3000
EOF
        print_success ".env.test file created"
    fi
    # Check test dependencies
    print_step "Checking test dependencies..."
    case $PKG_MANAGER in
        "pnpm")
            if ! pnpm list jest &> /dev/null; then
                print_warning "Test framework not found. Installing Jest..."
                pnpm add -D jest @testing-library/react @testing-library/jest-dom
            fi
            ;;
        "yarn")
            if ! yarn list jest &> /dev/null; then
                print_warning "Test framework not found. Installing Jest..."
                yarn add -D jest @testing-library/react @testing-library/jest-dom
            fi
            ;;
        *)
            if ! npm list jest &> /dev/null; then
                print_warning "Test framework not found. Installing Jest..."
                npm install -D jest @testing-library/react @testing-library/jest-dom
            fi
            ;;
    esac
    print_success "Test environment ready."
}

# 🌐 Start localhost server
start_localhost() {
    print_step "Starting Next.js development server..."
    case $PKG_MANAGER in
        "pnpm")
            echo -e "${GREEN}🚀 Starting Next.js dev server... http://localhost:3000${NC}"
            pnpm run dev
            ;;
        "yarn")
            echo -e "${GREEN}🚀 Starting Next.js dev server... http://localhost:3000${NC}"
            yarn dev
            ;;
        *)
            echo -e "${GREEN}🚀 Starting Next.js dev server... http://localhost:3000${NC}"
            npm run dev
            ;;
    esac
}

# 👀 Start preview server
start_preview() {
    print_step "Starting Next.js preview server..."
    build_project
    case $PKG_MANAGER in
        "pnpm")
            echo -e "${GREEN}🔍 Starting Next.js preview server... http://localhost:3000${NC}"
            pnpm run start
            ;;
        "yarn")
            echo -e "${GREEN}🔍 Starting Next.js preview server... http://localhost:3000${NC}"
            yarn start
            ;;
        *)
            echo -e "${GREEN}🔍 Starting Next.js preview server... http://localhost:3000${NC}"
            npm run start
            ;;
    esac
}

# ▲ Vercel deploy
deploy_vercel() {
    print_step "Deploying Next.js app to Vercel..."
    # Create vercel.json if not exists
    if [[ ! -f "vercel.json" ]]; then
        cat > vercel.json << EOF
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "devCommand": "npm run dev"
}
EOF
        print_success "vercel.json file created (Next.js)"
    fi
    # Build first
    build_project
    # Deploy
    if [[ "$1" == "--prod" ]]; then
        vercel --prod
        print_success "Deployed to production (Vercel)"
    else
        vercel
        print_success "Deployed to preview (Vercel)"
    fi
}

# 🔥 Firebase deploy
deploy_firebase() {
    print_step "Deploying Next.js app to Firebase..."
    # Create firebase.json if not exists
    if [[ ! -f "firebase.json" ]]; then
        cat > firebase.json << EOF
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
EOF
        print_success "firebase.json file created (Next.js)"
    fi
    # Build static export
    case $PKG_MANAGER in
        "pnpm")
            pnpm run build && pnpm run export
            ;;
        "yarn")
            yarn build && yarn export
            ;;
        *)
            npm run build && npm run export
            ;;
    esac
    # Firebase login check
    if ! firebase projects:list &> /dev/null; then
        print_warning "Not logged in to Firebase. Please log in:"
        firebase login
    fi
    # Deploy
    firebase deploy
    print_success "Deployed to Firebase (Next.js)"
}

# 📚 Help message
show_help() {
    echo -e "${BLUE}Usage:${NC}"
    echo "  ./run.sh [COMMAND] [OPTIONS]"
    echo ""
    echo -e "${BLUE}Commands:${NC}"
    echo "  setup           - 🛠️  Complete setup (dependencies, CLI tools) for Next.js"
    echo "  dev             - 🌐 Start Next.js development server"
    echo "  build           - 🔨 Build the Next.js project"
    echo "  preview         - 👀 Build and start Next.js preview server"
    echo "  test            - 🧪 Setup test environment (Jest)"
    echo "  deploy-vercel   - ▲  Deploy Next.js app to Vercel"
    echo "  deploy-firebase - 🔥 Deploy Next.js app to Firebase (static export)"
    echo "  deploy-all      - 🚀 Deploy to both Vercel and Firebase"
    echo "  help            - 📚 Show this help message"
    echo ""
    echo -e "${BLUE}Options:${NC}"
    echo "  --prod          - 🎯 Production deploy (Vercel only)"
    echo ""
    echo -e "${BLUE}Examples:${NC}"
    echo "  ./run.sh setup                 # Complete setup for Next.js"
    echo "  ./run.sh dev                   # Start Next.js development"
    echo "  ./run.sh deploy-vercel --prod  # Deploy to production (Vercel)"
    echo "  ./run.sh deploy-all            # Deploy everywhere"
}

# 🎯 Main function
main() {
    check_directory
    detect_package_manager
    case "${1:-setup}" in
        "setup")
            print_step "Starting comprehensive setup for Next.js..."
            check_node
            install_dependencies
            setup_vercel
            setup_firebase
            setup_test_environment
            build_project
            print_success "Setup completed! You can start with './run.sh dev'."
            ;;
        "dev")
            check_node
            start_localhost
            ;;
        "build")
            check_node
            build_project
            ;;
        "preview")
            check_node
            start_preview
            ;;
        "test")
            check_node
            setup_test_environment
            ;;
        "deploy-vercel")
            check_node
            setup_vercel
            deploy_vercel $2
            ;;
        "deploy-firebase")
            check_node
            setup_firebase
            deploy_firebase
            ;;
        "deploy-all")
            check_node
            setup_vercel
            setup_firebase
            deploy_vercel
            deploy_firebase
            ;;
        "help")
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# 🚀 Execute the script
main "$@"