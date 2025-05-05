#!/bin/sh

echo "Waiting for PostgreSQL at $DB_HOST:5432..."

# Wait until the DB is ready
while ! nc -z "$DB_HOST" 5432; do
  sleep 1
done

echo "PostgreSQL started"

# Start dev server in background
npm run dev &

# Save PID so we can stop it later
DEV_PID=$!

echo "Waiting for server to initialize..."
sleep 5  # Or do a curl health check loop here

# Stop the server (or you could skip this if test doesn't require it)
echo "Stopping development server..."
kill $DEV_PID

# Wait to ensure it's fully stopped
wait $DEV_PID

echo "Starting tests..."
npm test
