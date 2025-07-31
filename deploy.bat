@echo off
echo 🚀 MKSS Logistics - Vercel Deployment Helper
echo ============================================
echo.

echo 📦 Building project...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed! Please fix errors and try again.
    pause
    exit /b 1
)

echo ✅ Build successful!
echo.
echo 🌐 Ready for deployment!
echo.
echo Choose your deployment method:
echo 1. Install Vercel CLI and deploy
echo 2. Open Vercel website for manual upload
echo 3. Exit
echo.

set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo Installing Vercel CLI...
    call npm install -g vercel
    echo.
    echo Deploying to Vercel...
    call vercel
) else if "%choice%"=="2" (
    echo Opening Vercel website...
    start https://vercel.com/new
    echo.
    echo Instructions:
    echo 1. Drag and drop your 'logistics' folder
    echo 2. Vercel will auto-detect the project type
    echo 3. Click Deploy
    echo 4. Your site will be live in minutes!
) else (
    echo Goodbye!
)

echo.
pause