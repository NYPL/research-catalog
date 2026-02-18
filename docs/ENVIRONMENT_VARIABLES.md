# Research Catalog Environment Variables

## Table of contents

- [General information](#general-information)
- [Runtime config](#runtime-config)
  - [appConfig](#appconfig)
  - [node-utils config](#node-utils-config)
- [Build time config](#build-time-config)
- [Vercel](#vercel)
- [Github Actions](#github-actions)
- [AWS](#github-actions)
- [Encrypting and decrypting](#encrypting-and-decrypting)

## General information and setup

The app gets its environment variables from 3 places:

1. Runtime non-secret config: in the [`appConfig`](/src/config/appConfig.ts)
2. Runtime **secret** config: in [`/config/*.yaml`](/config)
3. Build time config: in [`.env.local`](/.env.local)

Your `env.local` should copy the [`env.example`](/.env.example). Development should be possible without the New Relic and QA values (reach out to a teammate to get them if needed).

## Runtime config

### appConfig

Most environment-specific variables are set from the `appConfig`, which uses the `.env`'s `NEXT_PUBLIC_APP_ENV` variable (the `NEXT_PUBLIC` prefix exposes this variable to the browser) to set the corresponding values:

```typescript
// In src/config/appConfig.ts:
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
  // Other configuration values...
}
```

For example:

```typescript
import { appConfig } from "../config/config"

// This will automatically use the correct URL based on NEXT_PUBLIC_APP_ENV
const apiUrl = appConfig.apiEndpoints.platform[appConfig.environment]
```

Any app-wide or environment-specific variable that does not need to be encrypted can be set in this file or in [constants](/src/config/constants.tsx).

### node-utils config

We use environment variables to make authorized requests to NYPL's API platform and the Sierra client. In order to be secure, those encrypted environment variables are stored in `./config.*.yaml` files, and decrypted using AWS KMS by the [`node-utils`](https://github.com/NYPL/node-utils) package.

To run the app locally (i.e., decrypt these values and instantiate the [Platform API](/src/server/nyplApiClient/index.ts) and [Sierra](/src/server/sierraClient/index.ts) clients successfully), **you must have an `~/.aws/config` file with SSO configuration for the `nypl-digital-dev` profile.**

| Variable                     | Type   | Description                                           |
| ---------------------------- | ------ | ----------------------------------------------------- |
| `PLATFORM_API_CLIENT_ID`     | string | Platform client ID. This value must be encrypted.     |
| `PLATFORM_API_CLIENT_SECRET` | string | Platform client secret. This value must be encrypted. |
| `SIERRA_KEY`                 | string | Sierra key. This value must be encrypted.             |
| `SIERRA_SECRET`              | string | Sierra secret. This value must be encrypted.          |

## Build time config

The critical `.env` variable is `NEXT_PUBLIC_APP_ENV`, which sets the rest of the config in `appConfig`.
The other variables are exceptions to this rule:

- New Relic (our monitoring platform) requires its config to be initialized before the app starts, so those variables are set here
- Playwright testing requires an authenticated user account, but we don't want to deal with setting up `node-utils` to decrypt within the Playwright build– we inject `QA_PASSWORD` using `dotenv`

| Variable                | Type   | Value example                        | Description                                                                     |
| ----------------------- | ------ | ------------------------------------ | ------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_APP_ENV`   | string | "development", "qa", or "production" | App environment key used to determine various environment-specific app settings |
| `NEW_RELIC_APP_NAME`    | string | "Research Catalog [Local]"           | App name for New Relic                                                          |
| `NEW_RELIC_LICENSE_KEY` | string |                                      | Authentication key for New Relic                                                |
| `QA_PASSWORD`           | string |                                      | User account password for Playwright testing                                    |

## Vercel

Our Vercel environment uses an access key and ID for AWS authentication, rather than the refreshable session token used for local development. The AWS key and ID are set in the [environment variables](https://vercel.com/nypl/research-catalog/settings/environment-variables).
Additionally, since Vercel only bundles files that are statically referenced at build time, we pass the config object to `node-utils` as a JSON ([vercel-config.json](/config/vercel-config.json)).

## Github Actions

Like Vercel, the Github Actions [environment](https://github.com/NYPL/research-catalog/settings/secrets/actions) uses a persisting AWS key and ID rather than a session token. We also set `QA_PASSWORD` as a repo-level secret, so it can be injected to the GHA runner for the Playwright test workflow.

## AWS

Our QA and production deployments run on AWS ECS. The application is deployed as a containerized service, with ECS task definitions and related infrastructure set through Terraform.

The QA and prod task definitions include the values set in `.env`. AWS will deploy with the latest task definition values by default, but if environment variables need to be permanently added, changed, or removed, DevOps must update them in Terraform.

## Encrypting and decrypting

Under the hood, `node-utils` is using AWS KMS to encrypt and decrypt. More information about this process can be found in the [encrypt docs](http://docs.aws.amazon.com/cli/latest/reference/kms/encrypt.html).

To encrypt/decrypt values yourself, you can use the [kms-util](https://github.com/NYPL-discovery/kms-util) helper package.
