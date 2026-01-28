import wrapper from "@nypl/sierra-wrapper"
import { config, logger } from "@nypl/node-utils"

export class SierraClientError extends Error {
  constructor(message: string) {
    super("Error building Sierra client: " + message)
  }
}

const CACHE: {
  client?: any
  initializing?: Promise<any>
} = {}

async function buildClient() {
  const { SIERRA_KEY, SIERRA_SECRET, SIERRA_BASE } = config.getConfig()

  if (!SIERRA_KEY || !SIERRA_SECRET || !SIERRA_BASE) {
    console.error("Missing Sierra credentials")
  }

  await wrapper.config({
    key: SIERRA_KEY,
    secret: SIERRA_SECRET,
    base: SIERRA_BASE,
  })

  logger.info("Sierra client initialized", {
    base: SIERRA_BASE,
    key: !!SIERRA_KEY,
    secret: !!SIERRA_SECRET,
  })

  const get = wrapper.get.bind(wrapper)
  wrapper.get = async function (path) {
    logger.info("Sierra request", {
      path,
      method: "GET",
    })
    return await get(path)
  }
  const post = wrapper.post.bind(wrapper)
  wrapper.post = async function (path, body) {
    logger.info("Sierra request", {
      path,
      method: "POST",
      body: JSON.stringify(body),
    })
    return await post(path, body)
  }
  const put = wrapper.put.bind(wrapper)
  wrapper.put = async function (path, body) {
    logger.info("Sierra request", {
      path,
      method: "PUT",
      body: JSON.stringify(body),
    })
    return await put(path, body)
  }
  const deleteRequest = wrapper.deleteRequest.bind(wrapper)
  wrapper.deleteRequest = async function (path, body) {
    logger.info("Sierra request", {
      path,
      method: "DELETE",
      body: JSON.stringify(body),
    })
    return await deleteRequest(path, body)
  }

  return wrapper
}

const sierraClient = async () => {
  if (CACHE.client) return CACHE.client

  if (!CACHE.initializing) {
    CACHE.initializing = buildClient()
      .then((client) => {
        CACHE.client = client
        return client
      })
      .catch((err) => {
        CACHE.initializing = undefined
        throw err
      })
  }

  try {
    return await CACHE.initializing
  } catch (error) {
    throw new SierraClientError(error.message)
  }
}

export default sierraClient
