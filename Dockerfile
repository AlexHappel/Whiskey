# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.12.2

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production


# Frontend
WORKDIR /usr/src/app/frontend
COPY frontend/package*.json ./
RUN npm install vite
RUN npm install

# Backend
WORKDIR /usr/src/app/backend
COPY backend/package*.json ./
RUN npm install

RUN npm install -g concurrently

# Copy all source files
COPY . .

# Start both the frontend and backend
CMD ["concurrently", "npm run server", "npm run client"]
