# Research Catalog README

This is the new [NYPL Research Catalog](https://www.nypl.org/research/research-catalog) front end built in [Next.js](https://nextjs.org/).

## Local Environment Setup

### Getting Started

1. Install the required packages

```bash
npm install
```

2. Ensure the required Environment Variables are set in your .env.local file.
(see https://github.com/NYPL/research-catalog/blob/main/ENVIRONMENTVARS.md)

### Running the app locally with npm:

```bash
npm run dev
```

### Local Hosting

In order to successfully log in under a local deployment you'll need to update
your machine's `etc/hosts` file. This file maps IP addresses to hostnames.

This is necessary because NYPL's authentication system works by reading cookies
and parsing the patron's encrypted credentials. These cookies only work on
`.nypl.org` domains, so we need to map our local deployment to a `.nypl.org`
domain.

Add the following line to your `etc/hosts` file. There is no need to remove or
update any other configuration in this file.

```
127.0.0.1       local.nypl.org
```

### Running the app locally with Docker (optional):

Docker is a platform that allows reproducible development environments to be created and run across different local and production/test environments.

Running the app locally via Docker is optional for now, and provided as an alternative to `npm run dev`.

### Steps to run Docker container locally:

1. [Download](https://docs.docker.com/get-docker/) and install Docker.
2. `cd` into research-catalog repo
3. Run `docker-compose up --build --force-recreate`
4. Check that app is being served at http://localhost:8080/research/research-catalog

## Client and Server-Side Data Fetching

Page components on the Research Catalog make use of Next's getServerSideProps function to fetch data on the server at request time, populating the component's props before the initial page load.

When getServerSideProps is used to fetch the initial data, Next automatically handles client-side data re-hydration on route changes without reloading the page. This eliminates the need for manual client-side data fetching/re-hydration in most cases.

For instances where manual client-side data fetching is preferable (e.g. when we don't want data fetching to block the initial page load), we employ the [`SWR`](https://www.npmjs.com/package/swr) module. SWR provides hooks that handles the typical boilerplate for fetching data and setting loading and error states, as well as optimizations such as caching.

## My Account API Endpoints

See the [My Account README](accountREADME.md).