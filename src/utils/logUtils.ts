import { logger } from "@nypl/node-utils"

export const logServerError = (location: string, message: string): void => {
  logger.error(`Error in ${location}: ${message}`)
}

export const logServerWarn = (location: string, message: string): void => {
  logger.warn(`Warning in ${location}: ${message}`)
}
