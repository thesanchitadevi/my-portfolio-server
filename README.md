# My Personal Portfolio Server

## Overview

This is the backend server for my personal portfolio, built using **Node.js** and **Express.js**. It provides API endpoints for handling authentication, managing blog posts and projects, and facilitating secure communication between the frontend and backend.

## Features

- **Authentication** with Google & GitHub OAuth (NextAuth.js)
- **CRUD Operations** for Blogs and Projects
- **User Authorization & Session Management**
- **JWT-Based Authentication & Refresh Tokens**
- **Password Encryption with Bcrypt**
- **RESTful API for Frontend Integration**
- **Middleware for Security & Error Handling**

## Tech Stack

- **Backend:** Node.js, Express.js
- **Authentication:** Jsonwebtoken
- **Database:** MongoDB, Mongoose
- **Deployment:** Vercel

## Live Server Link

- **Server:** [my-portfolio-server-alpha-ruby.vercel.app](https://my-portfolio-server-alpha-ruby.vercel.app)

- **Client:** [my-portfolio-client-seven.vercel.app](my-portfolio-client-seven.vercel.app)

## Project Structure

```
📦 my-portfolio-server
├── 📂 src
├── ├── 📂 app
│   ├── ├── 📂 builder      # Query logic
│   ├── ├── 📂 config       # Configuration settings for authentication, database, etc.
│   ├── ├── 📂 errors       # Error Handling
│   ├── ├── 📂 interface    # TypeScript interfaces & types
│   ├── ├── 📂 middlewares  # Authentication and security middleware
│   ├── ├── 📂 modules      # Core application modules
│   ├── ├── 📂 routes       # API endpoints for authentication, blogs, and projects
│   ├── ├── 📂 utils        # Helper functions
│   ├── app.ts
│   ├── server.ts
├── .env  # Environment variables
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/thesanchitadevi/my-portfolio-server.git
   ```
2. Navigate into the project directory:
   ```bash
   cd my-portfolio-server
   ```
3. Install dependencies:
   ```bash
   npm install  # or yarn install
   ```
4. Set up environment variables in a `.env` file:
   ```bash
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=mongodb+srv://your-database-url
   BYCRYPT_SALT=10
   DEFAULT_PASS=#admin1234
   JWT_ACCESS_SECRET=your_access_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   JWT_ACCESS_EXPIRES_IN=7d
   JWT_REFRESH_EXPIRES_IN=10d
   RESET_PASSWORD_URL_LINK=http://localhost:3000
   ```
5. Start the server:
   ```bash
   npm run dev  # or yarn dev
   ```
6. The server should be running at `http://localhost:5000`

## API Endpoints

| Method | Endpoint          | Description                  |
| ------ | ----------------- | ---------------------------- |
| GET    | /api/blogs        | Fetch all blog posts         |
| POST   | /api/blogs        | Create a new blog post       |
| PUT    | /api/blogs/:id    | Update an existing blog post |
| DELETE | /api/blogs/:id    | Delete a blog post           |
| GET    | /api/projects     | Fetch all projects           |
| POST   | /api/projects     | Create a new project         |
| PUT    | /api/projects/:id | Update an existing project   |
| DELETE | /api/projects/:id | Delete a project             |
| POST   | /api/message      | Create a new meesage         |
| GET    | /api/message      | Fetch all meesages           |

## Usage

- Ensure the server is running before making API requests.
- The frontend interacts with these API endpoints to display and manage content.

## Thank you for visiting
