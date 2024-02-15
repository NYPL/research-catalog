export interface AppConfig {
  environment: Environment
  apiEndpoints: Record<string, APIEndpoints>
  urls: Record<string, string>
  closedLocations: string[]
  recapClosedLocations: string[]
  nonRecapClosedLocations: string[]
  jwtPublicKey: string
  features: Record<string, Features>
}
export type APIEndpoints = Record<Environment, string>
export type Features = Record<Environment, boolean>
export type Environment = "development" | "qa" | "production"
