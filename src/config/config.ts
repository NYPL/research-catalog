import { parseLocations } from "../utils/itemUtils"

export const appConfig = {
  environment: process.env.APP_ENV || "production",
  apiUrls: {
    platform: {
      development:
        process.env.PLATFORM_API_BASE_URL ||
        "https://qa-platform.nypl.org/api/v0.1",
      production:
        process.env.PLATFORM_API_BASE_URL ||
        "https://platform.nypl.org/api/v0.1",
    },
    // The 'discovery' base URL should use DISCOVERY_API_BASE_URL if set,
    // falling back on PLATFORM_API_BASE_URL if set,
    // and finally falling back on a sensible default.
    discovery: {
      development:
        process.env.DISCOVERY_API_BASE_URL ||
        process.env.PLATFORM_API_BASE_URL ||
        "https://qa-platform.nypl.org/api/v0.1",
      production:
        process.env.DISCOVERY_API_BASE_URL ||
        process.env.PLATFORM_API_BASE_URL ||
        "https://platform.nypl.org/api/v0.1",
    },
    drb: {
      development:
        process.env.DRB_API_BASE_URL || "http://drb-api-qa.nypl.org/search/",
      production:
        process.env.DRB_API_BASE_URL ||
        "https://digital-research-books-api.nypl.org/search",
    },
  },
  externalUrls: {
    drbFrontEnd: {
      development:
        "http://sfr-front-end-development.us-east-1.elasticbeanstalk.com",
      production: "https://digital-research-books-beta.nypl.org",
    },
    drbEreader: {
      development: "https://researchnow-reader.nypl.org",
      production: "https://digital-research-books-reader.nypl.org",
    },
    drbAbout:
      "https://digital-research-books-beta.nypl.org/about?source=catalog",
    circulatingCatalog: "https://nypl.na2.iiivega.com/",
    legacyCatalog: "https://legacycatalog.nypl.org/",
    locations: "https://www.nypl.org/locations/",
    researchMaterialsHelp:
      "https://www.nypl.org/help/request-research-materials",
  },
  tokenUrl: "https://isso.nypl.org/",
  closedLocations: parseLocations(process.env.NEXT_PUBLIC_CLOSED_LOCATIONS),
  recapClosedLocations: parseLocations(
    process.env.NEXT_PUBLIC_RECAP_CLOSED_LOCATIONS
  ),
  nonRecapClosedLocations: parseLocations(
    process.env.NEXT_PUBLIC_NON_RECAP_CLOSED_LOCATIONS
  ),
  publicKey: `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA44ilHg/PxcJYsISHMRyo
    xsmez178qZpkJVXg7rOMVTLZuf05an7Pl+lX4nw/rqcvGQDXyrimciLgLkWu00xh
    m6h6klTeJSNq2DgseF8OMw2olfuBKq1NBQ/vC8U0l5NJu34oSN4/iipgpovqAHHB
    GV4zDt0EWSXE5xpnBWi+w1NMAX/muB2QRfRxkkhueDkAmwKvz5MXJPay7FB/WRjf
    +7r2EN78x5iQKyCw0tpEZ5hpBX831SEnVULCnpFOcJWMPLdg0Ff6tBmgDxKQBVFI
    Q9RrzMLTqxKnVVn2+hVpk4F/8tMsGCdd4s/AJqEQBy5lsq7ji1B63XYqi5fc1SnJ
    EQIDAQAB
    -----END PUBLIC KEY-----`,
}
