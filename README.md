# NYPL Research Catalog

## Table of Contents

- [Introduction](#introduction)
- [Getting started](#getting-started)
- [Project architecture](#project-architecture)
- [Key features](#key-features)
- [API integration](#api-integration)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Introduction

The [NYPL Research Catalog](https://www.nypl.org/research/research-catalog) is a [Next.js](https://nextjs.org/) application that serves as the front-end interface for the New York Public Library's research collections. It facilitates the searching, browsing, and requesting of materials from NYPL's extensive research holdings including the [shared collection](https://www.nypl.org/research/shared-collection-catalog).

### Technologies used

- **Frontend framework**: [Next.js](https://nextjs.org/)
- **UI components**: [@nypl/design-system-react-components](https://nypl.github.io/nypl-design-system/reservoir/)
- **Data fetching**: Server-side rendering with `getServerSideProps` and client-side fetching with JavaScript's native fetch API
- **Styling**: SCSS modules and inline style props
- **Testing**: Jest and React Testing Library, Playwright
- **Code quality**: ESLint, Prettier, and Husky (Git hooks for pre-commit checks)
- **Logging**: Winston logging to AWS Cloudwatch and New Relic
- **Authentication**: JWT-based patron "log in" for developing and testing authenticated features (Account and Hold requests)

## Getting started

### Prerequisites

#### Node.js 

The application requires the Node.js version specified in the `.nvmrc` file. We recommend using [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) to manage Node.js versions.

   ```bash
   # Install and use the correct Node.js version
   nvm install
   nvm use
   ```

#### AWS credentials

We store API credentials as KMS encrypted variables. Decryption (and by extension, use of these API clients) requires the user to have AWS credentials configured locally via the AWS CLI. Reach out to DevOps to get this set up and see our guide on [environment variables](docs/ENVIRONMENT_VARIABLES.md).


### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Local development

Contributing developers should refer to the [developer guide](docs/DEVELOPER_GUIDE.md) for more detailed instructions.

#### Running with npm

```bash
aws sso login --profile nypl-digital-dev
npm run dev
```

This starts the development server on port 8080. The SSO token lasts one hour, so you may have to log in again during development.

#### Local authentication setup

To enable login functionality in local development:

1. Update your machine's `etc/hosts` file by adding:
   ```
   127.0.0.1       local.nypl.org
   ```
2. Access the application at http://local.nypl.org:8080/research/research-catalog

#### Running with Docker

1. Install Docker
2. Run:
   ```bash
   docker-compose up --build --force-recreate
   ```
3. Access the application at http://localhost:8080/research/research-catalog

## Project architecture

### System architecture

The NYPL Research Catalog previously had a transitional architecture that involved both this application and the legacy discovery-front-end (DFE) application. The system used NYPL's reverse proxy to route requests for Subject Heading Explorer pages to [DFE](https://github.com/NYPL/discovery-front-end). 

With the release of the [browse](https://www.nypl.org/research/research-catalog/browse) pages replacing [SHEP](https://www.nypl.org/research/research-catalog/subject_headings), this is a standalone Next.js app. 

## Key features

### Search functionality

The Research Catalog provides both basic and advanced search capabilities:

- **Basic search**: Keyword search across all fields used to query and display bib results.
- **Advanced search**: Targeted search by title, author, subject, call number, etc.
- **Filters**: Refine search results by format, location, status, and date

### Bib display

Bib pages (`/bib/[id]`) display detailed information about a Bib's items:

- Bib details (title, author, publication info, etc.)
- Item availability and location
- Electronic resources
- Holdings information
- Request options

### Item availability

The application displays real-time availability information for physical items:

- Location (onsite or offsite)
- Status (available, not available, etc.)
- Request options based on availability

### User account

Authenticated users can access account features:

- View checkouts
- Manage holds
- Update account settings
- Change PIN

## API integration

### Internal API endpoints

The application provides several internal API endpoints:

- `/api/bib/[id]`: Fetch bib data
- `/api/marc/[id]`: Fetch raw MARC data
- `/api/search`: Search the catalog
- `/api/browse`: Browse the catalog (subject headings and author/contributors)
- `/api/account/*`: My Account endpoints (see [MY_ACCOUNT.md](/docs/MY_ACCOUNT.md))
- `/api/hold/request/*`: Hold request endpoints

### External API integration

The application integrates with two external APIs through custom client implementations:

#### API clients

- **nyplApiClient**: A wrapper around the `@nypl/nypl-data-api-client` package that handles authentication, environment-specific configuration, and caching. Used primarily to interact with the Discovery API.

- **sierraClient**: A wrapper around the `@nypl/sierra-wrapper` package that handles authentication, configuration, and caching for Sierra API interactions. Used primarily for patron account operations.

Both clients:

- Automatically decrypt credentials using AWS KMS
- Cache client instances for better performance
- Use environment-specific configuration based on NEXT_PUBLIC_APP_ENV
- Include error handling and logging

## Authentication

The application uses NYPL's authentication system:

- JWT-based authentication
- Cookie-based token storage
- Server-side validation of authentication tokens

## Deployment

The application is deployed to:

- **Train**: https://train-research-catalog.nypl.org/research/research-catalog
- **QA**: https://qa-www.nypl.org/research/research-catalog
- **Production**: https://www.nypl.org/research/research-catalog

We deploy (and run automated tests) using [Github Actions](https://github.com/NYPL/research-catalog/blob/main/.github/workflows), which run on `push` to the QA and production branches. We also deploy on `push` to `train`, though it is not part of our usual staging.

### Vercel

This repository uses [Vercel](https://vercel.com/nypl/research-catalog) to create preview links for pull requests. This allows developers to preview changes to the application before they are merged into the `main` branch.

When a pull request is opened, Vercel automatically creates a preview link for the PR. This link is generated by building and deploying the application to a temporary environment.

The preview link is then posted as a comment on the PR by the Vercel bot. This allows team members to easily access and test the changes in the PR.

### AWS infrastructure

The application is hosted on AWS:

- **ECS** for container orchestration
- **CloudWatch** for logging
- **KMS** for secret management

### Environment management

The Research Catalog is dockerized, which affects how environment variables are managed:

1. **Terraform configuration**: Environment variables for QA and production environments are configured by the DevOps team in Terraform
2. **Task Definition updates**: When a new ECS task definition is created during deployment, environment variables are set based on the Terraform configuration
3. **Manual Changes overwritten**: Any environment variables manually set in the AWS admin will be overwritten when a new task definition is created

#### Environment configuration with NEXT_PUBLIC_APP_ENV

The application uses the `NEXT_PUBLIC_APP_ENV` environment variable to determine which configuration values to use from `src/config/config.ts`:

```typescript
// From src/config/config.ts
export const appConfig: AppConfig = {
  environment:
    (process.env.NEXT_PUBLIC_APP_ENV as Environment) || "development",
  apiEndpoints: {
    platform: {
      development: "https://qa-platform.nypl.org/api",
      qa: "https://qa-platform.nypl.org/api",
      production: "https://platform.nypl.org/api",
    },
    // Other endpoints with environment-specific values...
  },
  // Other configuration...
}
```

This pattern allows the application to use different configuration values based on the environment without requiring code changes. When accessing configuration values in the code, you would use:

```typescript
import { appConfig } from "../config/config"

// This will automatically use the correct URL based on NEXT_PUBLIC_APP_ENV
const apiUrl = appConfig.apiEndpoints.platform[appConfig.environment]
```

## Logging

The application uses the `node-utils` logger (Winston) for server-side logging, and New Relic for both server and client-side logging.

### Accessing logs

- **QA/Production**: AWS CloudWatch under the `nypl-digital-dev` account (search for "research-catalog"), New Relic under "Research Catalog qa" and "Research Catalog prod"
- **Vercel deployments**: Console output in the Vercel dashboard

## Troubleshooting

### Common issues

1. **Authentication issues**:

   - Ensure your machine's `etc/hosts` file is properly configured for local development
   - Check that you're accessing the site via `local.nypl.org:8080` instead of `localhost:8080`
   - Check that your AWS SSO token is refreshed (`aws sso login --profile nypl-digital-dev`)
      - For more information on issues with KMS and encrypted environment variables, refer to [ENVIRONMENT_VARIABLES.md](/docs/ENVIRONMENT_VARIABLES.md)

2. **API connection issues**:

   - Verify that client keys/secrets are correctly set and decrypted
   - Check VPN connection (for QA APIs)
