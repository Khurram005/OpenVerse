# Openverse Media Search

## Project Overview

This is a full-stack web application that allows users to search for open-license media using the Openverse API. The project includes user authentication, saved searches, and a modern UI for browsing media.

## Features

🔍 Search open-license media using Openverse API

👤 User authentication (Register/Login)

💾 Save and retrieve searches

📸 View and play media

🏗️ Containerized using Docker

🧪 Automated testing

## Tech Stack

### Frontend

- React.js

- React Router

- Tailwind CSS

- Axios

### Backend

- Node.js with Express.js

- PostgreSQL

- Sequelize ORM

- JSON Web Token (JWT) for authentication

### Other Tools

- Docker

- Jest (for testing)

- ESLint + Prettier (for code formatting)

## Requirements

To run this application, you need to have:

- Node.js (Latest LTS version)

- PostgreSQL (Installed and running locally or on a cloud service)

- Docker (If you choose to run it in containers)

- Git (To clone the repository)

## Getting Started

1. Clone the Repository

`git clone https://github.com/Khurram005/OpenVerse.git`

2. Setup Environment Variables

Create a .env file in the backend directory with the following values:

### Backend

```
#server port
PORT = 8080

#Database
DB_USER = ""
DB_PASSWORD = ""
DB_NAME = ""
DB_HOST = ""
DB_PORT = ""
DB_DIALECT = ""

# SECRET KEYS
SESSION_SECRET = ""
JWT_SECRET = ""
```

## Running the Application

### Backend Setup

`cd backend`

`npm install`

`npm run dev`

### Frontend Setup

`cd frontend`

`npm install`

`npm run dev`
