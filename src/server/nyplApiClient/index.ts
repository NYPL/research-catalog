import NyplApiClient from "@nypl/nypl-data-api-client"
import { config } from "@nypl/node-utils"
import logger from "../../../lib/logger"
import { appConfig } from "../../config/appConfig"

interface KMSCache {
  clients: Record<string, any>
  id: string | null
  secret: string | null
}

const CACHE: KMSCache = {
  clients: {},
  id: null,
  secret: null,
}

export class NyplApiClientError extends Error {
  constructor(message: string) {
    super(`Error building NYPL data api client: ${message}`)
    this.name = "NyplApiClientError"
  }
}

type NyplApiClientOptions = {
  apiName?: string
  version?: string
}

const nyplApiClient = async ({
  apiName = "platform",
  version = "v0.1",
}: NyplApiClientOptions = {}) => {
  const appEnvironment = appConfig.environment
  await config.loadConfig(process.env.APP_ENV || "development")

  const { PLATFORM_API_CLIENT_ID, PLATFORM_API_CLIENT_SECRET } =
    config.getConfig()

  const clientCacheKey = `${apiName}${version}`
  if (CACHE.clients[clientCacheKey]) {
    return CACHE.clients[clientCacheKey]
  }

  if (!PLATFORM_API_CLIENT_ID || !PLATFORM_API_CLIENT_SECRET) {
    logger.error("Missing Platform API configuration")
    throw new NyplApiClientError("Missing Platform API configuration")
  }

  const baseUrl = `${appConfig.apiEndpoints[apiName][appEnvironment]}/${version}`

  try {
    const client = new NyplApiClient({
      base_url: baseUrl,
      oauth_key: PLATFORM_API_CLIENT_ID,
      oauth_secret: PLATFORM_API_CLIENT_SECRET,
      oauth_url: appConfig.urls.tokenUrl,
    })

    const originalGet = client.get.bind(client)
    client.get = async (path: string) => {
      logger.info("Platform request", {
        method: "GET",
        path: `${baseUrl}${path}`,
      })
      return originalGet(path)
    }

    const originalPost = client.post.bind(client)
    client.post = async (path: string, body: unknown) => {
      logger.info("Platform request", {
        method: "POST",
        path: `${baseUrl}${path}`,
        body,
      })
      return originalPost(path, body)
    }

    CACHE.clients[clientCacheKey] = client
    return client
  } catch (error: any) {
    logger.error("Failed to create NYPL API client", {
      message: error.message,
    })
    throw new NyplApiClientError(error.message)
  }
}

export default nyplApiClient
