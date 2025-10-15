@echo off

echo Starting admin panel on port 3002...
cd ..\coffee-shop-admin-panel
start "Admin Panel" cmd /k "npm run dev"

echo Waiting for admin panel to start...
timeout /t 5 /nobreak > nul

echo Starting coffee shop frontend on port 3000...
cd ..\coffee-shop
npm run dev
