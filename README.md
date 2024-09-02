# Issue Tracker

## Steps to run the project

With docker compose

- docker compose up -d --build

Individual commands

### mongo

- docker run -d -p 27017:27017 --name mongodb mongo

### backend

- cd backend
- copy .env.template to .env
- npm install
- npm run dev

### frontend

- cd frontend
- npm install
- npm run dev

## Improvements

- Add frontend E2E tests
- Modularize the frontend
- Read baseUrl from .env
- create cicd pipeline for frontend
