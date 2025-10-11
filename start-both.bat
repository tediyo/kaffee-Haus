@echo off
echo Starting Coffee Shop Website and Admin Panel...
echo.
echo Main Website will run on: http://localhost:3000
echo Admin Panel will run on: http://localhost:3002
echo.
echo Press Ctrl+C to stop both servers
echo.

start "Coffee Shop Website" cmd /k "npm run dev"
timeout /t 3 /nobreak >nul
start "Admin Panel" cmd /k "cd admin-panel && npm run dev"

echo Both servers are starting...
echo Check the opened command windows for any errors.
pause
