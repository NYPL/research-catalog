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

export type HTTPStatusCode = 200 | 307 | 400 | 404 | 500

export type HTTPResponse = {
  status: HTTPStatusCode
  message: string
  body?: any
}
