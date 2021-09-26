# Graphql sample application

## Setup

- requires [Node.js](https://nodejs.org/en/) to be installed. We recommend using the LTS version.
- In the repo root directory, run `npm install` to gather all dependencies.
- Next, run `npm run setup`. This will set up a local SQLite database, and add some seed data. This database will live in a local file named `database.sqlite3`.
- Then run `npm run watch`. This should start the server in development mode.

## Getting Started

- The server is running with [nodemon](https://nodemon.io/), which will automatically restart for you when you modify and save a file.
- The database provider is [SQLite](https://www.sqlite.org/), which will store data in a local file called `database.sqlite3`.
- The database client is [Sequelize](https://sequelize.org/). For any database operation, you should only have to interact with `Sequelize`.
- With a [GraphQL](https://graphql.org/) server using [Apollo Express Server](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express) and [GraphQL Playground](https://github.com/prisma/graphql-playground).

## About the project

- a simple support ticket tracker. a `ticket` is defined as a task that has a `title`. The ticket is either `completed` or `incomplete` at any given time. It has a recursive structure, meaning that it may have `children` tickets. Those children tickets may further have children tickets of their own, and so on. For example:

```json5
{
  "title": "first ticket",
  "isCompleted": false,
  "children": [
    {
      "title": "second ticket",
      "isCompleted": true,
      "children": []
    },
    {
      "title": "third ticket",
      "isCompleted": false,
      "children": [
        {
          "title": "fourth ticket",
          "isCompleted": true,
          "children": [] ///...]
        }
      ]
    }
  ]
}
```

See [`server.js`](/src/server.js#L49) to get started.

## Before Starting

- To start, go to http://localhost:4001/graphql. This will pull up a GUI called [GraphQL Playground](https://github.com/prisma/graphql-playground) that lets you fire `GraphQL` queries against your API.
