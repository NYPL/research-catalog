# Research Catalog Environment Variables

## Table of Contents

- [General Information](#general-information)
- [Application Variables](#application-variables)
- [AWS ECS Environment Variables](#aws-ecs-environment-variables)

## General Information

Environment variables are used in this code repository to control how the application builds, how and where data is fetched for separate sections in the application, for rendering certain features, and for controlling data flow.

General environment variables are declared in the `.env.example` file. A copy of this file should be made and saved as `.env.local` where real values should be added.

Generally, environment variables are meant to be read through the `process.env` object _on the server_. Variables intended for use on the client side should be prefaced with NEXT*PUBLIC* per Next's [docs](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables).

If an environment variable is updated, make sure to restart the server for the application to pick up the new value.

## Application Variables

These environment variables control how certain elements on the page render and where to fetch data.

| Variable                                 | Type   | Value Example                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------- | ------ | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NYPL_HEADER_URL`                        | string | "https://ds-header.nypl.org"         | The base URL of the NYPL environment-specific header and footer scripts.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `NEXT_PUBLIC_CLOSED_LOCATIONS`           | string | "all;Library of the Performing Arts" | A semicolon-delimited list of strings. Include quotes around the string. All locations beginning with any string in this list will be removed from the list of request options in the `ElectronicDelivery`, `HoldRequest`, and `ItemTableRow` components. Currently used physical locations: `Schwarzman;Science;Library for the Performing Arts;Schomburg`. To close all locations, add `all`. This will also remove EDD as a request option, the 'Request' buttons, and also disable the hold request/edd forms. If `all` is not present, EDD and 'Request' buttons will still be available. |
| `NEXT_PUBLIC_RECAP_CLOSED_LOCATIONS`     | string | ""                                   | A semicolon-delimited list of closed locations that are recap.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `NEXT_PUBLIC_NON_RECAP_CLOSED_LOCATIONS` | string | ""                                   | A semicolon-delimited list of closed locations that are not recap.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `ADOBE_EMBED_URL`                        | string | ""                                   | Url endpoint used for Adobe Analytics event tracking.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

## AWS ECS Environment Variables

As previously mentioned in the [README](README.md), we are using environment variables to make authorized requests to NYPL's API platform. In order to be secure, we are encrypting and decrypting those environment variables using AWS KMS. Please get these variables from someone on the LSP team.

| Variable                     | Description                                           |
| ---------------------------- | ----------------------------------------------------- |
| `PLATFORM_API_CLIENT_ID`     | Platform client id. This value must be encrypted.     |
| `PLATFORM_API_CLIENT_SECRET` | Platform client secret. This value must be encrypted. |

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
