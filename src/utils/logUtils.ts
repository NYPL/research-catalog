import { logger } from "@nypl/node-utils"

export const logServerError = (
  errorLocation: string,
  errorMessage: string
): void => {
  logger.error(`Error in ${errorLocation}: ${errorMessage}`)
}
