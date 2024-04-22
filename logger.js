import path from "path"
import winston from "winston"

const initializeLogger = () => {
  winston.exceptions.handle = () => {
    //
  }

  // NYPL levels allowed by console
  const nyplLogLevels = {
    warn: 1,
    info: 2,
    debug: 3,
  }

  const getLogLevelCode = (levelString) => {
    switch (levelString) {
      case "warn":
        return 1
      case "info":
        return 2
      case "debug":
        return 3
      default:
        return "n/a"
    }
  }

  const { combine, timestamp, printf } = winston.format

  const formatter = printf((info) => {
    const timestamp = new Date().toISOString()
    const logObject = {
      timestamp,
      pid: process.pid,
      level: info.level,
      levelCode: getLogLevelCode(info.level),
      message: info.message,
    }
    return JSON.stringify(logObject)
  })

  const transports = [
    new winston.transports.Console({ level: "debug" }),
    new winston.transports.File({
      filename: path.resolve(process.cwd(), "log", "rc.log"),
      // Log format space limited
      format: combine(winston.format.uncolorize(), formatter),
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ]

  return winston.createLogger({
    levels: nyplLogLevels,
    level: process.env.LOG_LEVEL || "info",
    format: combine(
      timestamp({
        format: "YYYY-MM-DD hh:mm:ss.SSS A",
      }),
      formatter
    ),
    transports,
  })
}

const isRunningOnVercel = process.env.VERCEL === "1"

const logger = isRunningOnVercel ? console : initializeLogger()

export default logger
