This is the new [NYPL Reserach Catalog](https://www.nypl.org/research/research-catalog) front end built in [Next.js](https://nextjs.org/).

## Getting Started

Install the required packages

```bash
npm install
```

## Running the app locally with npm:

```bash
npm run dev
```

## Running the app locally with Docker (optional):

Docker is a platform that allows reproducible development environments to be created and run across different local and production/test environments.

Running the app locally via Docker is optional for now, and provided as an alternative to `npm run dev`.

### Steps to run Docker container locally:

1. [Download](https://docs.docker.com/get-docker/) and install Docker.
2. `cd` into research-catalog repo
3. Run `docker-compose up --build --force-recreate`
4. Check that app is being served at http://localhost:3000/
