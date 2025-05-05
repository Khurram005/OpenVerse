#!/bin/sh
echo "Waiting for PostgreSQL at $DB_HOST:5432..."

while ! nc -z "$DB_HOST" 5432; do
  sleep 1
done

echo "PostgreSQL started"

echo "Resetting the database..."
PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -p 5432 -d postgres <<EOF
DROP DATABASE IF EXISTS openverse;
CREATE DATABASE openverse;
GRANT ALL PRIVILEGES ON DATABASE openverse TO postgres;
EOF

npm run dev &
DEV_PID=$!
echo "Waiting for server to initialize..."
sleep 5
echo "Stopping development server..."
kill $DEV_PID
wait $DEV_PID

echo "Starting tests..."
npm test
