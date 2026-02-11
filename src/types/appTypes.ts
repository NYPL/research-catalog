export interface AppConfig {
  environment: Environment
  apiEndpoints: Record<string, APIEndpoints>
  urls: Record<string, string>
  closedLocations: string[]
  recapClosedLocations: string[]
  nonRecapClosedLocations: string[]
  jwtPublicKey: string
  features: Record<string, Features>
  sourceEmail: string
  libAnswersEmail: string
  testUser: {
    name: APIEndpoints
    cardNumber: APIEndpoints
    username: APIEndpoints
    password: string | undefined
  }
}
export interface APIEndpoints {
  development: string
  qa: string
  production: string
}
export interface Features {
  development: boolean
  qa: boolean
  production: boolean
}

export type Environment = "development" | "qa" | "production"

export type HTTPStatusCode = 200 | 307 | 400 | 401 | 404 | 422 | 500

export type HTTPResponse = {
  status: HTTPStatusCode
  message: string
  body?: any
}

export type APIError = {
  status: HTTPStatusCode
  name?: string // Discovery API convention: IndexSearchError, etc.
  error?: string // Error message
  redirectUrl?: string
}
