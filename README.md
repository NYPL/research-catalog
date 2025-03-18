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

## Project Architecture

### System Architecture

The NYPL Research Catalog is part of a transitional architecture that involves both this Next.js application and the legacy discovery-front-end (DFE) application. The system uses NYPL's reverse proxy to route requests between these applications:

- **Research Catalog (Next.js)**: Handles most of the functionality, including search, bib, hold request, and account pages.
- **Discovery Front End (DFE)**: Currently only handles the [Subject Heading Explorer (SHEP)](https://www.nypl.org/research/research-catalog/subject_headings) pages.

#### Reverse Proxy Configuration

The NYPL reverse proxy is configured to route page requests to the appropriate application:

- Most paths are routed to the Research Catalog Next.js application
- Subject Heading Explorer paths are routed to the legacy DFE application

This configuration is controlled by the `NEXT_PUBLIC_REVERSE_PROXY_ENABLED` environment variable, which is set to `true` in QA and production environments.

#### Transition Plan

The Subject Heading Explorer pages are the only remaining pages still served by the legacy DFE application. These will be replaced by the upcoming Enhanced Browse pages in the Research Catalog. Once the Enhanced Browse pages are launched, the legacy DFE application can be retired completely.

### Directory Structure

- `/pages`: Next.js pages and API routes
  - `/api`: Server-side API endpoints
  - `/bib`: Bib details page
  - `/search`: Search pages (including Advanced Search)
  - `/account`: My Account pages
  - `/hold`: Hold request pages
- `/src`: Application code and unit tests (typically found near the source code in a nested `/tests` directory or adjacent to the relevant file)
  - `/components`: React components
  - `/config`: Configuration files
  - `/context`: React context providers
  - `/hooks`: Custom React hooks
  - `/models`: Data models
  - `/reducers`: Used for form state management
  - `/server`: Server-side code (API fetchers, server utils, etc.)
  - `/types`: TypeScript type definitions
  - `/utils`: Utility functions
- `/styles`: SCSS modules
- `/__test__`: Test files for Next.js page components

### Data Flow

1. **Server-side Rendering**: Most pages use Next.js's `getServerSideProps` to fetch data on the server before rendering the page.
2. **Client-side Data Fetching**: For dynamic updates without page reloads, the application uses JavaScript's native fetch API for client-side data fetching.
3. **API Integration**: The application communicates with NYPL's Discovery API, Sierra API, and other services through internal API routes.

## Key Features

### Search Functionality

The Research Catalog provides both basic and advanced search capabilities:

- **Basic Search**: Keyword search across all fields used to query and display Bib results as well as [DRB (Digital Research Books)](https://digitalcollections.nypl.org/) results in the sidebar.
- **Advanced Search**: Targeted search by title, author, subject, call number, etc.
- **Filters**: Refine search results by format, location, status, and date

### Bib Display

Bib pages (`/bib/[id]`) display detailed information about a Bib's items:

- Bib details (title, author, publication info, etc.)
- Item availability and location
- Electronic resources
- Holdings information
- Request options

### Item Availability

The application displays real-time availability information for physical items:

- Location (on-site or off-site)
- Status (available, not available, etc.)
- Request options based on availability

### My Account

Authenticated users can access account features:

- View checkouts
- Manage holds
- Update account settings
- Change PIN

## API Integration

### Internal API Endpoints

The application provides several internal API endpoints:

- `/api/bib/[id]`: Fetch bibliographic data
- `/api/search`: Search the catalog
- `/api/account/*`: My Account endpoints (see [MY_ACCOUNT.md](/docs/MY_ACCOUNT.md))
- `/api/hold/request/*`: Hold request endpoints

### External API Integration

The application integrates with several external APIs through custom client implementations:

#### API Clients

- **nyplApiClient**: A wrapper around the `@nypl/nypl-data-api-client` package that handles authentication, environment-specific configuration, and caching. Used primarily to interact with the Discovery API.

- **sierraClient**: A wrapper around the `@nypl/sierra-wrapper` package that handles authentication, configuration, and caching for Sierra API interactions. Used primarily for patron account operations.

Both clients:

- Automatically decrypt credentials using AWS KMS
- Cache client instances for better performance
- Use environment-specific configuration based on NEXT_PUBLIC_APP_ENV
- Include error handling and logging

#### External APIs

- **Discovery API**: Main source for bibliographic and item data (accessed via nyplApiClient)
- **Sierra API**: Patron account management and item requests (accessed via sierraClient)
- **SHEP API**: Subject heading data
- **DRB API**: Digital Research Books data

## Authentication

The application uses NYPL's authentication system:

- JWT-based authentication
- Cookie-based token storage
- Server-side validation of authentication tokens

## Development Workflow

### Code Quality Tools

- **TypeScript**: Static type checking
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks

### Testing

Run tests with:

```bash
npm test
```

For more information on the code quality and standards, see the [DEVELOPER_GUIDE.md](/docs/DEVELOPER_GUIDE.md)

## Deployment

The application is deployed to:

- **QA**: https://qa-www.nypl.org/research/research-catalog
- **Production**: https://www.nypl.org/research/research-catalog

### Deployment Process

The Research Catalog uses GitHub Actions for continuous integration and deployment. The GitHub Actions workflow builds a Docker container and deploys it to AWS ECS:

1. When code is pushed to the `main` branch, it is automatically deployed to the main [Vercel environment](https://research-catalog.vercel.app/)
2. When code is pushed to the `qa` branch, it is automatically deployed to the [test environment](https://qa-www.nypl.org/research/research-catalog)
3. When code is pushed to the `production` branch, it is automatically deployed to the [production environment](https://nypl.org/research/research-catalog)

### Merging Workflow
The merging workflow is as follows:

1. Changes are merged into the `main` branch, typically through a pull request.
2. The changes are merged into the `qa` branch when they are ready to be tested (typically as close to the deployment date as possible).
3. The changes are tested in the QA environment. Once the changes are approved, they are merged into the `production` branch.
4. If a hotfix is required, it is merged directly into the production branch and back-synced into the qa and main branches.

### Vercel Preview Links

This repository uses Vercel to create preview links for pull requests. This allows developers to preview changes to the application before they are merged into the main branch.

When a pull request is opened, Vercel automatically creates a preview link for the PR. This link is generated by building and deploying the application to a temporary environment.

The preview link is then posted as a comment on the PR by the Vercel bot. This allows team members to easily access and test the changes in the PR.

### Feature Branches

A feature branch is a separate branch that is created from the main branch, specifically for the purpose of developing a new feature. This branch is used to isolate the changes related to the feature, allowing us to work on it independently of other changes.

Feature branches are useful when:

1. We are working on a large feature that is not ready for immediate deployment.
2. We want to isolate the changes related to the feature from other changes.
3. We want to prevent the feature from blocking smaller deployments.

### AWS Infrastructure

The application is hosted on AWS:

- **ECS** for container orchestration
- **CloudWatch** for logging
- **KMS** for secret management

### Reverse Proxy Configuration

The NYPL DevOps team is responsible for configuring and maintaining the reverse proxy that routes traffic between the Research Catalog and the legacy discovery-front-end (DFE) application:

1. **Configuration Changes**: If changes to the reverse proxy configuration are needed (e.g., routing new paths), tickets should be opened with the DevOps team
2. **Deployment Coordination**: Major deployments that affect routing should be coordinated with the DevOps team
3. **Rollbacks**: The DevOps team is responsible for performing rollbacks if issues occur in production

### Rollback Process

If a deployment causes issues in production:

1. Open a ticket with the DevOps team requesting a rollback
2. Provide the specific version/tag to roll back to
3. The DevOps team will handle the rollback process
4. After rollback, investigate the issue and fix it in a new deployment

### Environment Variable Management

The Research Catalog is dockerized, which affects how environment variables are managed:

1. **Terraform Configuration**: Environment variables for QA and production environments are configured by the DevOps team in Terraform
2. **Task Definition Updates**: When a new ECS task definition is created during deployment, environment variables are set based on the Terraform configuration
3. **Manual Changes Overwritten**: Any environment variables manually set in the AWS admin will be overwritten when a new task definition is created

#### Environment Configuration with NEXT_PUBLIC_APP_ENV

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

#### Encrypted Variables in AWS Parameter Store

Sensitive environment variables (such as API keys and secrets) are stored in AWS Parameter Store:

1. **Parameter Store**: Encrypted variables are stored in the AWS Parameter Store
2. **ECS Task Definition**: The ECS task definition references these parameters
3. **Decryption**: At runtime, the application uses AWS KMS to decrypt the variables

#### Adding or Changing Environment Variables

When adding new environment variables or changing existing ones:

1. Update the `.env.example` file in the repository to document the variable
2. Update the [ENVIRONMENT_VARIABLES.md](/docs/ENVIRONMENT_VARIABLES.md) file with a description of the variable
3. Open a ticket with the DevOps team to add or update the variable in Terraform
   - For sensitive variables, specify that they should be stored in Parameter Store
4. Specify the environment (QA, production, or both) and the value for each environment
5. Wait for confirmation from DevOps before deploying code that relies on the new variable

Failure to update environment variables in Terraform will result in the variables being unavailable or reverting to default values when a new deployment occurs.

## Logging

The application uses Winston for server-side logging:

- Structured logs according to NYPL standards
- Logs stored in AWS CloudWatch
- Console logging for local development

### Accessing Logs

- **QA/Production**: AWS CloudWatch under the `nypl-digital-dev` account (search for "research-catalog")
- **Vercel Deployments**: Console output in the Vercel dashboard

## Troubleshooting

### Common Issues

1. **Authentication Issues**:

   - Ensure your machine's `etc/hosts` file is properly configured for local development
   - Check that you're accessing the site via `local.nypl.org:8080` instead of `localhost:8080`

2. **API Connection Issues**:

   - Verify that environment variables are correctly set
   - Check VPN connection for APIs that require it (e.g., SHEP API)

3. **Environment Variable Encryption**:
   - For issues with encrypted environment variables, refer to the encryption/decryption instructions in [ENVIRONMENT_VARIABLES.md](/docs/ENVIRONMENT_VARIABLES.md)
