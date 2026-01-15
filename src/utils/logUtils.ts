import logger from "../../logger"

export const logServerError = (
  errorLocation: string,
  errorMessage: string
): void => {
  logger.error(`Error in ${errorLocation}: ${errorMessage}`)
}
