@echo off
title Deploy to GitHub Pages
cd /d "C:\Users\dines\CascadeProjects\vizagendosurgeon.com"

echo ========================================================
echo   DEPLOYING TO GITHUB PAGES: VIZAGENDOSURGEON.COM
echo ========================================================
echo.
echo 1. Building production assets...
call npm run build

echo.
echo 2. Committing latest changes...
git add .
git commit -m "Update website and production build for GitHub Pages"

echo.
echo 3. Pushing code to GitHub...
git push -u origin main

echo.
echo ========================================================
echo   SUCCESS! Website pushed to GitHub!
echo   GitHub Pages will automatically build and publish to:
echo   https://vizagendosurgeon.com
echo ========================================================
pause
