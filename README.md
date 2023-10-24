# A short application to demonstrate the use of GraphQL queries.
This project is a full-stack application built with Next.js, integrating Apollo Client and Apollo Server. It demonstrates how to set up a Next.js application to run both the client and the server-side of an application within the same codebase. The client-side uses Apollo Client to handle GraphQL queries and to interact with the Apollo Server.

## Features
React for the frontend.
Apollo Client for data management on the client-side.
Apollo Server Express for GraphQL server on the backend.
Single codebase for frontend and backend.

## Prerequisites
Before you begin, ensure you have met the following requirements:

You have installed the latest version of Node.js and npm.
To install the application, follow these steps:

Clone this repository
```bash
git clone https://github.com/studioMFB/rockar-app
```
Copy the .env.example file and rename it to .env, 
then replace the placeholder data with your actual values.
```bash
cp .env.example .env
```
Install the npm dependencies
'ts-node' is needed to run the server with TypeScript.
'dotenv' is necessary to use .ENV var on the server side.
```bash
npm i -f
npm i -g ts-node
npm i dotenv --force --save -dev
```

To run the application, follow these steps:

Start the app for development.
```bash
npm run dev
```
Start the app for production.
```bash
npm run build
npm run start
```
Run tests.
```bash
npm test
```

Open http://localhost:3000 with your browser to see the frontend application.
The GraphQL server can be accessed at http://localhost:4000/graphql. 
You can use tools like GraphQL Playground or Postman to interact with the GraphQL server.

## Project Structure
* src/server/schema/: This folder contains the various models, types, resolvers and queries for each object.
* src/client/pages/index.ts: This is the main page component that uses Apollo Client to fetch data from the GraphQL server.
