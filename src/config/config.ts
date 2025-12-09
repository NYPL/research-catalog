import type { AppConfig, Environment } from "../types/appTypes"
import type { NYPLocationKey, RecapLocationKey } from "../types/locationTypes"

export const appConfig: AppConfig = {
  environment:
    (process.env.NEXT_PUBLIC_APP_ENV as Environment) || "development",
  apiEndpoints: {
    platform: {
      development: "https://qa-platform.nypl.org/api",
      //qa: "https://qa-platform.nypl.org/api",
      qa: "http://discovery-api-qa2.nypl.org/api",
      production: "https://platform.nypl.org/api",
    },
    domain: {
      development: "local.nypl.org:8080",
      qa: "qa-www.nypl.org",
      production: "www.nypl.org",
    },
    nyplHeaderUrl: {
      development: "https://qa-ds-header.nypl.org",
      qa: "https://qa-ds-header.nypl.org",
      production: "https://ds-header.nypl.org",
    },
    loginUrl: {
      development: "https://dev-login.nypl.org/auth/login",
      qa: "https://dev-login.nypl.org/auth/login",
      production: "https://login.nypl.org/auth/login",
    },
    logoutUrl: {
      development: "https://dev-login.nypl.org/auth/logout",
      qa: "https://dev-login.nypl.org/auth/logout",
      production: "https://login.nypl.org/auth/logout",
    },
  },
  urls: {
    circulatingCatalog: "https://borrow.nypl.org",
    legacyCatalog: "https://legacycatalog.nypl.org",
    login: "https://login.nypl.org/auth/login",
    locations: "https://www.nypl.org/locations/",
    researchMaterialsHelp:
      "https://www.nypl.org/help/request-research-materials",
    tokenUrl: "https://isso.nypl.org/",
    renewCard: "https://www.nypl.org/help/library-card/terms-conditions#renew",
  },
  // Array of closed nypl location keys (available options for NYPL locations: all, schwarzman, schomburg, lpa)
  closedLocations: [] as (NYPLocationKey | "all")[],
  // Array of closed recap location keys (only "all" option available for now)
  recapClosedLocations: [] as (RecapLocationKey | "all")[],
  nonRecapClosedLocations: [] as (NYPLocationKey | "all")[],
  jwtPublicKey: `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA44ilHg/PxcJYsISHMRyo
    xsmez178qZpkJVXg7rOMVTLZuf05an7Pl+lX4nw/rqcvGQDXyrimciLgLkWu00xh
    m6h6klTeJSNq2DgseF8OMw2olfuBKq1NBQ/vC8U0l5NJu34oSN4/iipgpovqAHHB
    GV4zDt0EWSXE5xpnBWi+w1NMAX/muB2QRfRxkkhueDkAmwKvz5MXJPay7FB/WRjf
    +7r2EN78x5iQKyCw0tpEZ5hpBX831SEnVULCnpFOcJWMPLdg0Ff6tBmgDxKQBVFI
    Q9RrzMLTqxKnVVn2+hVpk4F/8tMsGCdd4s/AJqEQBy5lsq7ji1B63XYqi5fc1SnJ
    EQIDAQAB
    -----END PUBLIC KEY-----`,
  features: {},
  sourceEmail: process.env.SOURCE_EMAIL,
  libAnswersEmail: process.env.LIB_ANSWERS_EMAIL,
}
