import { parseLocations } from "../utils/itemUtils"
import type { AppConfig, Environment } from "../types/appTypes"

export const appConfig: AppConfig = {
  environment:
    (process.env.NEXT_PUBLIC_APP_ENV as Environment) || "development",
  apiEndpoints: {
    platform: {
      development: "https://qa-platform.nypl.org/api/v0.1",
      qa: "https://qa-platform.nypl.org/api/v0.1",
      production: "https://platform.nypl.org/api/v0.1",
    },
    // The 'discovery' base URL should use DISCOVERY_API_BASE_URL if set,
    // falling back on PLATFORM_API_BASE_URL if set,
    // and finally falling back on a sensible default.
    discovery: {
      development: "https://platform.nypl.org/api/v0.1",
      qa: "https://qa-platform.nypl.org/api/v0.1",
      production: "https://platform.nypl.org/api/v0.1",
    },
    drb: {
      development: "https://digital-research-books-api.nypl.org/search",
      qa: "https://digital-research-books-api.nypl.org/search",
      production: "https://digital-research-books-api.nypl.org/search",
    },
    shep: {
      development: process.env.SHEP_API,
      qa: process.env.SHEP_API,
      production: process.env.SHEP_API,
    },
    nyplHeaderUrl: {
      development: "https://qa-ds-header.nypl.org",
      qa: "https://qa-ds-header.nypl.org",
      production: "https://ds-header.nypl.org",
    },
    adobeEmbedUrl: {
      development:
        "https://assets.adobedtm.com/1a9376472d37/ddf1bedfe52e/launch-4eefcc91c90e.min.js",
      qa: "https://assets.adobedtm.com/1a9376472d37/ddf1bedfe52e/launch-4eefcc91c90e.min.js",
      production:
        "https://assets.adobedtm.com/1a9376472d37/8519dfce636d/launch-672b7e7f98ee.min.js",
    },
    drbFrontEnd: {
      development:
        "http://sfr-front-end-development.us-east-1.elasticbeanstalk.com",
      qa: "http://sfr-front-end-development.us-east-1.elasticbeanstalk.com",
      production: "https://digital-research-books-beta.nypl.org",
    },
    drbEreader: {
      development: "https://researchnow-reader.nypl.org",
      qa: "https://researchnow-reader.nypl.org",
      production: "https://digital-research-books-reader.nypl.org",
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
    drbAbout:
      "https://digital-research-books-beta.nypl.org/about?source=catalog",
    circulatingCatalog: "https://nypl.na2.iiivega.com/",
    legacyCatalog: "https://legacycatalog.nypl.org/",
    locations: "https://www.nypl.org/locations/",
    researchMaterialsHelp:
      "https://www.nypl.org/help/request-research-materials",
    tokenUrl: "https://isso.nypl.org/",
  },
  closedLocations: parseLocations(process.env.CLOSED_LOCATIONS),
  recapClosedLocations: parseLocations(process.env.RECAP_CLOSED_LOCATIONS),
  nonRecapClosedLocations: parseLocations(
    process.env.NON_RECAP_CLOSED_LOCATIONS
  ),
  jwtPublicKey: `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA44ilHg/PxcJYsISHMRyo
    xsmez178qZpkJVXg7rOMVTLZuf05an7Pl+lX4nw/rqcvGQDXyrimciLgLkWu00xh
    m6h6klTeJSNq2DgseF8OMw2olfuBKq1NBQ/vC8U0l5NJu34oSN4/iipgpovqAHHB
    GV4zDt0EWSXE5xpnBWi+w1NMAX/muB2QRfRxkkhueDkAmwKvz5MXJPay7FB/WRjf
    +7r2EN78x5iQKyCw0tpEZ5hpBX831SEnVULCnpFOcJWMPLdg0Ff6tBmgDxKQBVFI
    Q9RrzMLTqxKnVVn2+hVpk4F/8tMsGCdd4s/AJqEQBy5lsq7ji1B63XYqi5fc1SnJ
    EQIDAQAB
    -----END PUBLIC KEY-----`,
  features: {
    reverseProxyEnabled: {
      development: false,
      qa: true,
      production: true,
    },
  },
}
