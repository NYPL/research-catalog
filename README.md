# NYPL Research Catalog

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [Key Features](#key-features)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Introduction

The [NYPL Research Catalog](https://www.nypl.org/research/research-catalog) is a [Next.js](https://nextjs.org/) application that serves as the front-end interface for the New York Public Library's research collections. It facilitates the searching, browsing, and requesting of materials from NYPL's extensive research holdings including the [shared collection](https://www.nypl.org/research/shared-collection-catalog).

### Technologies Used

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **UI Components**: [@nypl/design-system-react-components](https://nypl.github.io/nypl-design-system/reservoir/)
- **Data Fetching**: Server-side rendering with `getServerSideProps` and client-side fetching with JavaScript's native fetch API
- **Styling**: SCSS modules and inline style props
- **Testing**: Jest and React Testing Library
- **Logging**: Winston logging to AWS Cloudwatch and New Relic
- **Authentication**: JWT-based patron "log in" for developing and testing authenticated features (Account and Hold requests)

## Getting Started

### Prerequisites

### **Node.js** 

The application requires the Node.js version specified in the `.nvmrc` file. We recommend using [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) to manage Node.js versions.

   ```bash
   # Install and use the correct Node.js version
   nvm install
   nvm use
   ```

#### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file based on `.env.example` with the required environment variables

### Environment Variables

The application uses environment variables for configuration. See [ENVIRONMENT_VARIABLES.md](docs/ENVIRONMENT_VARIABLES.md) for detailed information about each variable.

Key environment variables include:

- `NEXT_PUBLIC_APP_ENV`: Application environment (development, qa, production)
- `NYPL_HEADER_URL`: URL for NYPL header and footer scripts
- `PLATFORM_API_CLIENT_ID` and `PLATFORM_API_CLIENT_SECRET`: Encrypted credentials for NYPL's API platform
- `SIERRA_KEY` and `SIERRA_SECRET`: Encrypted credentials for Sierra API

#### AWS Credentials

We store API credentials as KMS encrypted environment variables. Decryption (and by extension, use of these API clients) requires the user to have AWS credentials configured locally via the AWS CLI. Reach out to DevOps to get this set up and see our guide on [how we encrypt](docs/ENVIRONMENT_VARIABLES.md#encrypting). 
As of 10/30/2025, running this app locally depends on SSO configuration for the profile `nypl-digital-dev` in `~/.aws/config`.

### Local Development

#### Running with npm

```bash
aws sso login --profile nypl-digital-dev
npm run dev
```

This starts the development server on port 8080. The SSO token lasts one hour, so you may have to log in again during development.

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

The NYPL Research Catalog previously had a transitional architecture that involved both this application and the legacy discovery-front-end (DFE) application. The system used NYPL's reverse proxy to route requests for Subject Heading Explorer pages to [DFE](https://github.com/NYPL/discovery-front-end). 

With the release of the [browse](https://www.nypl.org/research/research-catalog/browse) pages replacing [SHEP](https://www.nypl.org/research/research-catalog/subject_headings), this is a standalone Next.js app. 

## Key Features

### Search Functionality

The Research Catalog provides both basic and advanced search capabilities:

- **Basic Search**: Keyword search across all fields used to query and display bib results.
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

- Location (onsite or offsite)
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

- `/api/bib/[id]`: Fetch bib data
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

- **Discovery API**: Main source for bib and item data (accessed via nyplApiClient)
- **Sierra API**: Patron account management and item requests (accessed via sierraClient)

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

or

```bash
npm test-watch
```

For more information on the code quality and standards, see the [DEVELOPER_GUIDE.md](/docs/DEVELOPER_GUIDE.md)

### Testing with Playwright
This project includes Playwright, a powerful end-to-end testing framework for automating and verifying browser interactions across Chromium, Firefox, and WebKit.

The following will install the browsers (Chromium, Firefox, WebKit) needed for the Playwright tests.
```bash
npx playwright install 
```
Run all Playwright tests
```bash
npx playwright test
```
Various arguments can be added to test commands.  Here's an example that runs all tests contained in a specific test file.  And runs them only on Chrome.  And in headed mode, so you can see what is happening.
```bash
npx playwright test example.spec.ts --headed --project=chromium
```

## Deployment

The application is deployed to:

- **QA**: https://qa-www.nypl.org/research/research-catalog
- **Production**: https://www.nypl.org/research/research-catalog

We deploy (and run automated tests) using [Github Actions](https://github.com/NYPL/research-catalog/blob/main/.github/workflows), which run on `push` to the QA and production branches. We also deploy on `push` to `train`, though it is not part of our usual staging.

To deploy to one of these environments from another branch, update the [deploy workflow](https://github.com/NYPL/research-catalog/blob/main/.github/workflows/test_and_deploy.yml) to include the desired branch, making sure to escape the branch name (`github.ref_name`) where necessary.

### Rolling back a deployment

First, identify the issue with the deployment using logs (Cloudwatch, New Relic, Vercel production build).

Once the issue is identified, you can immediately resolve by doing an **ECS rollback**: re-deploy the last working task definition revision so the service ([QA](https://946183545209-nfcqnmzl.us-east-1.console.aws.amazon.com/ecs/v2/clusters/research-catalog-qa/services?region=us-east-1), [production](https://946183545209-nfcqnmzl.us-east-1.console.aws.amazon.com/ecs/v2/clusters/research-catalog-production/services?region=us-east-1)) runs the old Docker image and old environment configuration.  The rollback effectively restores the service to its last stable state. To do this:
1. Identify the last working task definition revision in the ECS console or via the AWS CLI.
2. Update the service to use that revision.
3. Confirm the service has restarted the tasks successfully.

Otherwise, **"roll back" by Git commit**: branch off `production`, remove (or resolve) the introduced issue, commit, and merge back into `production` to deploy again. Then backmerge changes through `qa` and `main`. 

### Vercel Preview Links

This repository uses Vercel to create preview links for pull requests. This allows developers to preview changes to the application before they are merged into the main branch.

When a pull request is opened, Vercel automatically creates a preview link for the PR. This link is generated by building and deploying the application to a temporary environment.

The preview link is then posted as a comment on the PR by the Vercel bot. This allows team members to easily access and test the changes in the PR.

### AWS Infrastructure

The application is hosted on AWS:

- **ECS** for container orchestration
- **CloudWatch** for logging
- **KMS** for secret management

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
For variables that only need to be updated temporarily, like `SEARCH_RESULTS_NOTIFICATION`, it may be okay to create and deploy a new task definition revision without updating Terraform, knowing that it will be reverted on the next deployment.


## Logging

The application uses Winston for server-side logging, and New Relic for both server and client-side logging.

### Adding Logs

Use (and then remove) console logs for local development. To test New Relic logs, you can run:
```
export NEW_RELIC_APP_NAME="Research Catalog [local]"
export NEW_RELIC_LICENSE_KEY="<NEW_RELIC_LICENSE_KEY>"

node server.mjs
```
and view results in New Relic under "Research Catalog [local]".

### Accessing Logs

- **QA/Production**: AWS CloudWatch under the `nypl-digital-dev` account (search for "research-catalog"), New Relic under "Research Catalog qa" and "Research Catalog prod"
- **Vercel Deployments**: Console output in the Vercel dashboard


## Troubleshooting

### Common Issues

1. **Authentication Issues**:

   - Ensure your machine's `etc/hosts` file is properly configured for local development
   - Check that you're accessing the site via `local.nypl.org:8080` instead of `localhost:8080`
   - Check that your AWS SSO token is refreshed (`aws sso login --profile nypl-digital-dev`)
      - For more information on issues with KMS and encrypted environment variables, refer to [ENVIRONMENT_VARIABLES.md](/docs/ENVIRONMENT_VARIABLES.md)

2. **API Connection Issues**:

   - Verify that client keys/secrets are correctly set and decrypted
   - Check VPN connection (for QA APIs)
