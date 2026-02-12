# Research Catalog Environment Variables

## Table of contents

- [General information](#general-information)
- [Application variables](#application-variables)
- [AWS ECS environment variables](#aws-ecs-environment-variables)

## General information

## Application variables

| Variable                | Type   | Value Example              | Description                                                                     |
| ----------------------- | ------ | -------------------------- | ------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_APP_ENV`   | string | "development"              | App environment key used to determine various environment-specific app settings |
| `NEW_RELIC_APP_NAME`    | string | "Research Catalog [Local]" | App name for New Relic                                                          |
| `NEW_RELIC_LICENSE_KEY` | string | ""                         | Authentication key for New Relic (encrypted)                                    |

## AWS ECS Environment Variables

We use environment variables to make authorized requests to NYPL's API platform and the Sierra client. In order to be secure, those encrypted environment variables are stored in `./config.*.yaml`files, and decrypted using AWS KMS by `node-utils`.

**Running this app locally requires you to have an `~/.aws/config` file with SSO configuration for the `nypl-digital-dev` profile.**

| Variable                     | Description                                           |
| ---------------------------- | ----------------------------------------------------- |
| `PLATFORM_API_CLIENT_ID`     | Platform client ID. This value must be encrypted.     |
| `PLATFORM_API_CLIENT_SECRET` | Platform client secret. This value must be encrypted. |
| `SIERRA_KEY`                 | Sierra key. This value must be encrypted.             |
| `SIERRA_SECRET`              | Sierra secret. This value must be encrypted.          |

### Encrypting

`PLATFORM_API_CLIENT_ID` and `PLATFORM_API_CLIENT_SECRET` are assumed to be encrypted. We need these variables to create an instance of the `nypl-data-api-client` npm package and make authorized requests to the NYPL Digital API endpoints. This is needed for the Discovery UI app to make requests itself to the APIs.

In order to encrypt, please download and install the `aws` [cli tool](https://aws.amazon.com/cli/). The command to encrypt is

    aws kms encrypt --key-id [your IAM key from AWS] --plaintext [value to encrypt] --output text --query CiphertextBlob

The `aws kms encrypt` commands returns and object with a `CiphertextBlob` property. Since we only want that value, we use the `--query` flag to retrieve just that. This value can be copied and pasted into the AWS ECS configuration in the UI for the app's environment.

More information can be found in the [encrypt docs](http://docs.aws.amazon.com/cli/latest/reference/kms/encrypt.html).

Alternatively, you can use the [kms-util](https://github.com/NYPL-discovery/kms-util) helper package.

NOTE: This value is base64 encoded, so when decoding make sure to decode using base64.

### Decrypting

In order to decrypt, we are using the `aws-sdk` npm module. Please check the [nyplApiClient](src/server/nyplApiClient/index.ts) file for more information and implementation on decryption.
