# NYPL Research Catalog

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [Key Features](#key-features)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Introduction

The [NYPL Research Catalog](https://www.nypl.org/research/research-catalog) is a [Next.js](https://nextjs.org/) application that serves as the front-end interface for the New York Public Library's research collections. It facilitates the searching, browsing, and requesting of materials from NYPL's extensive research holdings including the [shared collection](https://www.nypl.org/research/shared-collection-catalog).

### Technologies Used

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **UI Components**: [@nypl/design-system-react-components](https://nypl.github.io/nypl-design-system/reservoir/)
- **Data Fetching**: Server-side rendering with `getServerSideProps` and client-side fetching with JavaScript's native fetch API
- **Styling**: SCSS modules and Style Props
- **Testing**: Jest and React Testing Library
- **Logging**: Winston
- **Authentication**: JWT-based authentication with NYPL's authentication system

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file based on `.env.example` with the required environment variables

### Environment Variables

The application uses environment variables for configuration. See [ENVIRONMENTVARS.md](ENVIRONMENTVARS.md) for detailed information about each variable.

Key environment variables include:

- `NEXT_PUBLIC_APP_ENV`: Application environment (development, qa, production)
- `NYPL_HEADER_URL`: URL for NYPL header and footer scripts
- `PLATFORM_API_CLIENT_ID` and `PLATFORM_API_CLIENT_SECRET`: Encrypted credentials for NYPL's API platform
- `SIERRA_KEY` and `SIERRA_SECRET`: Encrypted credentials for Sierra API

### Local Development

#### Running with npm

```bash
npm run dev
```

This starts the development server on port 8080.

#### Local Authentication Setup

To enable login functionality in local development:

1. Update your machine's `etc/hosts` file by adding:
   ```
   127.0.0.1       local.nypl.org
   ```
2. Access the application at http://local.nypl.org:8080/research/research-catalog

#### Running with Docker (optional)

1. Install Docker
2. Run:
   ```bash
   docker-compose up --build --force-recreate
   ```
3. Access the application at http://localhost:8080/research/research-catalog

## Client and Server-Side Data Fetching

Page components on the Research Catalog make use of Next's getServerSideProps function to fetch data on the server at request time, populating the component's props before the initial page load.

When getServerSideProps is used to fetch the initial data, Next automatically handles client-side data re-hydration on route changes without reloading the page. This eliminates the need for manual client-side data fetching/re-hydration in most cases.

For instances where manual client-side data fetching is preferable (e.g. when we don't want data fetching to block the initial page load), we use JavaScript's native fetch API. We implement custom hooks that handle the typical boilerplate for fetching data and setting loading and error states, as well as optimizations such as caching.

## Logging

This project uses [Winston](https://www.npmjs.com/package/winston) for serverside logging. See `logger.js` for the formatting and storage of logs. We structure our logs according to these [NYPL standards](https://github.com/NYPL/engineering-general/blob/main/standards/logging.md).

Logs for this project's `qa` and `production` branches can be found in AWS Cloudwatch under the `nypl-digital-dev` account by searching "research-catalog". For the old DFE logs, search "discoveryui". 

For Vercel deployments, logging will appear in the console. 


## My Account API Endpoints

See the [My Account Documentation](/docs/MY_ACCOUNT.md).