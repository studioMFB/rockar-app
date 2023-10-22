# A short application to demonstrate the use of GraphQL queries.
This project is a full-stack application built with Next.js, integrating Apollo Client and Apollo Server. It demonstrates how to set up a Next.js application to run both the client and the server-side of an application within the same codebase. The client-side uses Apollo Client to handle GraphQL queries and to interact with the Apollo Server.

## Features
Next.js for the frontend and backend.
Apollo Client for data management on the client-side.
Apollo Server for GraphQL server on the backend.
Single codebase for frontend and backend.

## Prerequisites
Before you begin, ensure you have met the following requirements:

You have installed the latest version of Node.js and npm.
To install the application, follow these steps:

Clone this repository
```bash
git clone https://github.com/studioMFB/rockar-app
```
Navigate to the repository directory
```bash
cd rockar
```
Install the npm dependencies
```bash
npm i npm install -g ts-node
```

To run the application, follow these steps:

Start the development server
```bash
npm run dev
```
Open http://localhost:4000 with your browser to see the frontend application.
The GraphQL server can be accessed at http://localhost:4000/api/graphql. 
You can use tools like GraphQL Playground or Postman to interact with the GraphQL server.

## Project Structure
* pages/api/graphql.ts: This file contains the Apollo Server and handles GraphQL queries.
* lib/apollo-client.ts: This file sets up the configuration for Apollo Client.
* pages/index.ts: This is the main page component that uses Apollo Client to fetch data from the GraphQL server.
