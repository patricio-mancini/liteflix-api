# Liteflix - API

## Implementation Details

This is a RESTful API built with Node.js, using TypeScript for type safety. It leverages various libraries and frameworks such as `Express.js` for handling HTTP requests, `MongoDB` for database operations, and `Passport.js` with `Google OAuth2` for authentication.

## Tech Stack

- `Node.js` - v20 for server-side JavaScript runtime.
- `Express` - v4.19.2 for handling HTTP requests and routes.
- `TypeScript` - for type safety and improved developer experience.
- `MongoDB` - vlatest for storing application data.
- `Passport.js` - v0.7.0 for authentication using Google OAuth2 strategy.
- `Sharp` - v0.33.4 for image processing and resizing.
- `Multer` - v1.4.5-lts.1 for handling multipart/form-data uploads.
- `Cors` - v2.8.5 for enabling Cross-Origin Resource Sharing.
- `dotenv` - v16.4.5 for loading environment variables from a .env file.

## Project Structure

The project structure is organized as follows:

- `./src`: Contains the source code of the API.
  - `./src/config`: Configuration files, including environment variables and Passport.js setup.
  - `./src/models`: Mongoose models for defining MongoDB schemas (e.g., `movie.ts`, `user.ts`).
  - `./src/routes`: Express routes for handling API endpoints (e.g., `authRoutes.ts`, `movieRoutes.ts`).
  - `./src/index.ts`: Entry point of the application, where Express server is configured and started.
  - `./src/build.js`: Script for building the TypeScript code into JavaScript using esbuild.
- `./docker-compose.yml`: Docker configuration for deploying the API and MongoDB using Docker Compose.
- `./Dockerfile`: Dockerfile for building a Docker image of the API application.

## Deployment

The deployed version of the app is accessible at [https://api.patriciomancini.net](https://api.patriciomancini.net).

Please note that to authenticate into the app through Liteflix, you need to add your Google account to the list of test accounts. Otherwise, you won't be able to log in and test the authenticated functionality.

## Scripts

In the project directory, you can run:

- `npm run build`: Builds the TypeScript code into JavaScript.
- `npm start`: Starts the server with the built JavaScript code.
- `npm run docker:up`: Builds and starts Docker containers for API and MongoDB.
- `npm run docker:down`: Stops and removes Docker containers for API and MongoDB.
