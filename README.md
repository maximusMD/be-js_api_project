# Northcoders News API
## Contents

- [Northcoders News API](#northcoders-news-api)
  - [Contents](#contents)
  - [Project Summary](#project-summary)
  - [Hosted Version](#hosted-version)
  - [Paths](#paths)
- [Local Hosting Setup](#local-hosting-setup)
  - [Version Requirements](#version-requirements)
  - [Git Cloning](#git-cloning)
  - [Environment Variables](#environment-variables)
  - [Dependencies](#dependencies)
  - [Seeding](#seeding)
  - [Testing](#testing)
  - [Local-Only Functionality](#local-only-functionality)
- [Developer Information](#developer-information)

## Project Summary

An API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as Reddit) which should provide this information to the front end architecture.

## Hosted Version
You can find the hosted version of the API here:
<https://nc-news-31tf.onrender.com/api>

## Paths
These paths are avaiable on the api:

- **/api :** Serves up a json representation of all the available endpoints of the api
- **/api/topics :** Serves an array of all topics
- **/api/articles/:article_id :** Serves an article object
- **/api/articles :** Serves an array of all articles
- **/api/articles/:article_id/comments :** Serves an array of all comments for a specified article
- **/api/users :** Serves an array of all users

# Local Hosting Setup

## Version Requirements

- Node.js v20.5.1
- Psql v14.9 (Homebrew)

## Git Cloning

Key into the directory you wish to use in your terminal and enter this code:

    git clone <https://github.com/maximusMD/be-js_api_project>

## Environment Variables

In order to run this project locally, you will need to create the following environment variables with these filenames and the respective database assignment:

**.env.development**

    PGDATABASE=nc_news

**.env.test**

    PGDATABASE=nc_news_test

Reference the .env-example file if you have any formatting issues.

## Dependencies

To install the required dependencies, open the project in your code editor (e.g. VSCode) and enter this code into your terminal:

    npm install

You should now have the following dependencies in the package.json file:

**Dependencies**

    "dependencies": {
    "dotenv": "^16.0.0",
    "express": "^4.18.2",
    "pg": "^8.7.3"
    }

**Developer Dependencies** (required for testing)

    "devDependencies": {
    "husky": "^8.0.2",
    "jest": "^27.5.1",
    "jest-extended": "^2.0.0",
    "jest-sorted": "^1.0.14",
    "pg-format": "^1.0.4",
    "supertest": "^6.3.3"
    }


## Seeding
In order to run the server locally, you will need to create the databases and seed them first; using the following code:

**Database Creation**

    npm run setup-dbs

**Seeding**

    npm run seed

**You can then run the server locally using:**

    npm start

## Testing

In order to run tests, enter the following code:

    npm run test

## Local-Only Functionality

As of the current iteration PATCH, POST, and DELETE methods are only accessible by running tests on the project.

# Developer Information

- **Github:** <https://github.com/maximusMD/>
- **LinkedIn:** <https://www.linkedin.com/in/maximiliandunne/>