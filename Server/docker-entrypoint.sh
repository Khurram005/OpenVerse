#!/bin/sh
echo "Waiting for PostgreSQL at $DB_HOST:5432..."

while ! nc -z "$DB_HOST" 5432; do
  sleep 1
done

echo "PostgreSQL started"

echo "Resetting the database..."
psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "DROP DATABASE IF EXISTS openverse; CREATE DATABASE openverse; GRANT ALL PRIVILEGES on database openverse to postgres;"

npm run dev &
DEV_PID=$!
echo "Waiting for server to initialize..."
sleep 5
echo "Stopping development server..."
kill $DEV_PID
wait $DEV_PID

echo "Starting tests..."
npm test
