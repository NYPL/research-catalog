import winston from "winston"

const addPid = winston.format((info) => {
  return {
    ...info,
    pid: process.pid,
  }
})
const { combine, json, timestamp } = winston.format
const initializeLogger = () => {
  return winston.createLogger({
    level: "info",
    format: combine(addPid(), timestamp("YYYY-MM-DD hh:mm:ss.SSS A"), json()),
    transports: [new winston.transports.Console()],
    maxFiles: 5,
  })
}

const isRunningOnVercel = process.env.VERCEL === "1"
const isRunningClientSide = typeof window !== "undefined"

const logger =
  isRunningOnVercel || isRunningClientSide ? console : initializeLogger()

export default logger
