# NYPL Research Catalog

## Table of Contents

- [Introduction](#introduction)
- [Project architecture](#project-architecture)
- [Key features](#key-features)
- [API integration](#api-integration)
- [User authentication](#user-authentication)
- [Deployment](#deployment)

## Introduction

The [NYPL Research Catalog](https://www.nypl.org/research/research-catalog) is a [Next.js](https://nextjs.org/) application that serves as the front-end interface for the New York Public Library's research collections. It facilitates the searching, browsing, and requesting of materials from NYPL's extensive research holdings including the [shared collection](https://www.nypl.org/research/shared-collection-catalog).

### To set up and contribute to this app, head to the [developer guide](./docs/DEVELOPER_GUIDE.md).



### Technologies used

- **Frontend framework**: [Next.js](https://nextjs.org/) Pages Router
- **UI components**: [@nypl/design-system-react-components](https://nypl.github.io/nypl-design-system/reservoir/)
- **Data fetching**: Server-side rendering with `getServerSideProps` and client-side fetching with JavaScript's native fetch API
- **Styling**: SCSS modules and inline style props
- **Testing**: Jest and React Testing Library, Playwright
- **Code quality**: ESLint, Prettier, and Husky (Git hooks for pre-commit checks)
- **Logging**: Winston logging to AWS Cloudwatch and New Relic
- **Authentication**: JWT-based patron "log in" for developing and testing authenticated features (account and hold requests)

## Project architecture

The NYPL Research Catalog previously had a transitional architecture that involved both this application and the legacy discovery-front-end (DFE) application. The system used NYPL's reverse proxy to route requests for Subject Heading Explorer pages to [DFE](https://github.com/NYPL/discovery-front-end). 

With the release of the [browse](https://www.nypl.org/research/research-catalog/browse) pages replacing [SHEP](https://www.nypl.org/research/research-catalog/subject_headings), this is a standalone Next.js app. 

## Key features

### Search functionality

The Research Catalog provides both basic and advanced search capabilities:

- **Basic search**: Keyword search across all fields used to query and display bib results.
- **Advanced search**: Targeted search by title, author, subject, call number, etc.
- **Filters**: Refine search results by format, location, status, and date

### Bib display

Bib pages (`/bib/[id]`) display detailed information about a bib's items:

- Bib details (title, author, publication info, etc.)
- Item availability and location
- Electronic resources
- Holdings information
- Request options
- The bib's raw MARC (`/bib/[id]/marc`)

### Item availability

The application displays availability information for physical items:

- Location (onsite or offsite)
- Status (available, not available, etc.)
- Request options based on availability

### Hold requests

Users can place holds on physical or digital (EDD) research items on the Research Catalog.

### User account

Authenticated users can access account features:

- View checkouts
- Manage holds
- Update account settings
- Change their PIN/password

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

- **sierraClient**: A wrapper around the `@nypl/sierra-wrapper` package that handles authentication, configuration, and caching for Sierra API interactions. Used primarily in My Account (patron account operations).

Both clients:

- Automatically decrypt credentials using `node-utils`' AWS KMS
- Cache client instances for better performance
- Use environment-specific configuration based on NEXT_PUBLIC_APP_ENV
- Include error handling and logging

## User authentication

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

## Logging

The application uses the `node-utils` logger (Winston) for server-side logging, and New Relic for both server and client-side logging.

### Accessing logs

- **QA/Production**: AWS CloudWatch under the `nypl-digital-dev` account (search for "research-catalog"), New Relic under "Research Catalog qa" and "Research Catalog prod"
- **Vercel deployments**: Console output in the Vercel dashboard