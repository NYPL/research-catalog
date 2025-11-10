// Importing New Relic first, otherwise replicating 'next start'
import "newrelic"
import next from "next"
import http from "http"

const dev = process.env.NEXT_PUBLIC_APP_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  http
    .createServer((req, res) => handle(req, res))
    .listen(process.env.PORT || 3000)
})
