import winston from "winston"

const initializeLogger = () => {
  const format =
    process.env.APP_ENV !== "development"
      ? winston.format.json()
      : // Locally, let's do colorized plaintext logging:
        winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
  return winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format,
    transports: [new winston.transports.Console()],
  })
}

const isRunningOnVercel = process.env.VERCEL === "1"
const isRunningClientSide = typeof window !== "undefined"

const logger =
  isRunningOnVercel || isRunningClientSide ? console : initializeLogger()

export default logger
