#!/bin/bash

# Start the admin panel in the background
echo "Starting admin panel on port 3002..."
cd ../coffee-shop-admin-panel
npm run dev &
ADMIN_PID=$!

# Wait a moment for admin panel to start
sleep 5

# Start the coffee shop frontend
echo "Starting coffee shop frontend on port 3000..."
cd ../coffee-shop
npm run dev

# Cleanup function
cleanup() {
    echo "Stopping servers..."
    kill $ADMIN_PID 2>/dev/null
    exit
}

# Trap Ctrl+C
trap cleanup INT

# Wait for user to stop
wait

