import fs from "fs"

import { decryptKMS } from "./kms"

type ClientOptions = {
  userId: string
  password: string
  profile: string
  baseUrl: string
}

const logger = {
  error: console.error,
  info: console.log,
  debug: console.log,
}

export class EbscoClient {
  authToken: string
  sessionToken: string
  options: ClientOptions

  constructor(options) {
    this.options = options
  }

  // https://connect.ebsco.com/s/article/Publication-Finder-API-Reference-Guide-Search
  async publications(queries) {
    queries = queries
      .map((q, index) => {
        return `query-${index + 1}=${index > 0 ? "OR," : ""}${q}`
      })
      .join(" ")
    // queries = "query-1=Rob Hall query-2=OR,AU:Jon Krakauer query-3=OR,SU:Mountaineering"
    // query-1=Rob Hall query-2=OR,AU:Jon Krakauer query-3=OR,SU:Mountaineering
    const response = await this.ebscoQuery(
      `edsapi/publication/search?${queries}&includefacets=n&highlight=n`
    )

    if (response.ok) {
      return response.json()
    } else {
      logger.error("Error getting publication results: ", response)
      throw new Error("Error getting publication results")
    }
  }

  // https://connect.ebsco.com/s/article/EBSCO-Discovery-Service-API-Search-and-Retrieve-Search
  async search(query, limit = 5) {
    const response = await this.ebscoQuery(
      `edsapi/rest/Search?query=${query}&resultsperpage=${limit}&includefacets=n&highlight=n`
    )

    if (response.ok) {
      return response.json()
    } else {
      logger.error("Error getting results: ", response)
      throw new Error("Error getting results")
    }
  }

  async ebscoQuery(path, retries = 0) {
    await this.authenticate()

    //  edsapi/rest/Search?query=${query}` // &searchmode=all&resultsperpage=20&pagenumber=1&sort=relevance&highlight=y&includefacets=y&view=brief&autosuggest=n&autocorrect=n`
    const url = `${this.options.baseUrl}${path}`

    const options = {
      headers: {
        "x-authenticationToken": this.authToken,
        "x-sessionToken": this.sessionToken,
        Accept: "application/json",
      },
    }

    logger.debug(`ebscoQuery: Fetching ${url} with ${JSON.stringify(options)}`)
    const response = await fetch(url, options)

    if (!response.ok) {
      const content = await response.json()

      const errorDescription = content && content["ErrorDescription"]
      if (
        retries < 2 &&
        ["Auth Token Invalid", "Session Token Invalid"].includes(
          errorDescription
        )
      ) {
        logger.debug(`Got ${errorDescription} error`)
        await this.authenticate(true)
        return this.ebscoQuery(path, retries + 1)
      }
      logger.debug("ebscoQuery: Unrecognized error", content)
      throw new Error("Error running ebsco query")
    }

    return response
  }

  async authenticate(force = false) {
    const sessionFile = "./.ebsco-api-session.json"

    if (force) {
      this.authToken = null
      this.sessionToken = null
      fs.rmSync(sessionFile)
      logger.debug("authenticate: Reauthenticating...")
    }

    if (this.authToken && this.sessionToken) return

    if (fs.existsSync(sessionFile)) {
      const { authToken, sessionToken } = JSON.parse(
        fs.readFileSync(sessionFile, "utf8")
      )
      this.authToken = authToken
      this.sessionToken = sessionToken
      logger.debug(
        `authenticate: Recovered session from ${sessionFile} ${this.authToken}`
      )
      return
    }

    await this.uidauth()
    await this.createSession()

    fs.writeFileSync(
      sessionFile,
      JSON.stringify(
        {
          authToken: this.authToken,
          sessionToken: this.sessionToken,
        },
        null,
        2
      )
    )
    logger.debug("authenticate: Updated session file")
  }

  // https://connect.ebsco.com/s/article/EBSCO-Discovery-Service-API-Sessions-CreateSession
  async createSession() {
    const url = `${this.options.baseUrl}edsapi/rest/createsession`

    const result = await fetch(url, {
      method: "POST",
      headers: {
        "x-authenticationToken": this.authToken,
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ Profile: this.options.profile }),
    })

    if (result.ok) {
      const data = await result.json()
      this.sessionToken = data["SessionToken"]
      logger.debug("createSession: Obtained new session token")
    } else {
      logger.error("Error creating session. Got response: ", result)
      throw new Error("Error creating session")
    }
  }

  // https://connect.ebsco.com/s/article/EBSCO-Discovery-Service-API-User-ID-Authentication
  async uidauth() {
    const url = `${this.options.baseUrl}authservice/rest/uidauth`
    const payload = {
      UserId: this.options.userId,
      Password: this.options.password,
      InterfaceId: "WSapi",
    }

    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (result.ok) {
      const data = await result.json()
      logger.debug("uidauth: Obtained new auth token")
      this.authToken = data["AuthToken"]
    } else {
      logger.error("Error authenticating. Got response: ", result)
      throw new Error("Error authenticating")
    }
  }
}

export async function makeClient() {
  const decrypted = await Promise.all(
    ["EBSCO_USER_ID", "EBSCO_PASSWORD", "EBSCO_PROFILE"].map(async (name) => {
      const decrypted = await decryptKMS(process.env[name])
      return { [name]: decrypted }
    })
  ).then((pairs) => pairs.reduce((h, el) => Object.assign(h, el), {}))

  return new EbscoClient({
    userId: decrypted["EBSCO_USER_ID"],
    password: decrypted["EBSCO_PASSWORD"],
    profile: decrypted["EBSCO_PROFILE"],
    baseUrl: process.env.EBSCO_BASE_URL,
  })
}
