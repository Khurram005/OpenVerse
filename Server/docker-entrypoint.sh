#!/bin/sh

echo "Waiting for PostgreSQL at $DB_HOST:5432..."

# Wait until the DB is ready
while ! nc -z "$DB_HOST" 5432; do
  sleep 1
done

echo "PostgreSQL started"

# Start your server (adjust as needed)
npm run dev
npm test  # or `npm run dev`, `npm start`, etc.
