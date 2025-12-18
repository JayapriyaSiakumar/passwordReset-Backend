# Password Reset Flow Backend

This is the backend for the Auth application. It is built using Node.js, Express.js and MongoDB.

## Features

- User authentication and authorization
- Blog post creation, deletion and approval
- Email sending for password reset

## Installation

- Clone the repository
- Install dependencies using `npm install`
- Set up environment variables using a `.env` file
- Start the server using `npm start`

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login an existing user
- `POST /api/auth/forgot-password`: Send password reset email
- `POST /api/auth/reset-password/:id/:token`: Reset password

## Environment Variables

- `MONGODB_URL`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `PASS_MAIL`: Email address for sending password reset emails
- `PASS_KEY`: Password for sending password reset emails

## POSTMAN DEMO

- https://documenter.getpostman.com/view/30484986/2sB3dTuTpc
