// Importing New Relic first, otherwise replicating 'next start'
if (process.env.NEW_RELIC_LICENSE_KEY) {
  await import("newrelic")
}
import next from "next"
import http from "http"

const dev = process.env.NODE_ENV === "development"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  http
    .createServer((req, res) => handle(req, res))
    .listen(process.env.PORT || 3000)
})
