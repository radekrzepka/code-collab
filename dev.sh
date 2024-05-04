#!/bin/bash

echo "Starting C# backend..."
cd backend
dotnet watch &
BACKEND_PID=$!

echo "Starting Next.js frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

wait $BACKEND_PID $FRONTEND_PID
