#!/bin/bash

echo "Starting Coffee Shop Website and Admin Panel..."
echo ""
echo "Main Website will run on: http://localhost:3000"
echo "Admin Panel will run on: http://localhost:3002"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start main website in background
npm run dev &
MAIN_PID=$!

# Wait a moment for the main server to start
sleep 3

# Start admin panel in background
cd admin-panel
npm run dev &
ADMIN_PID=$!

# Go back to root directory
cd ..

echo "Both servers are starting..."
echo "Check the terminal output for any errors."
echo ""

# Wait for user to stop
wait
