#!/bin/sh
echo "Waiting for PostgreSQL at $DB_HOST:5432..."

while ! nc -z "$DB_HOST" 5432; do
  sleep 1
done

echo "PostgreSQL started"

echo "Resetting the database..."
npx sequelize-cli db:drop
npx sequelize-cli db:create

npm run dev &
DEV_PID=$!
echo "Waiting for server to initialize..."
sleep 5
echo "Stopping development server..."
kill $DEV_PID
wait $DEV_PID

echo "Starting tests..."
npm test
