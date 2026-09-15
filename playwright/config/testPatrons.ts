const patrons = {
  local: {
    patronId: "9555150",
    name: "PLAYWRIGHT TEST ACCOUNT LOCAL",
    cardNumber: "2 5555 01278 5809",
    username: "playwrightlocal",
  },
  gha: {
    patronId: "9529135",
    name: "PLAYWRIGHT TEST ACCOUNT GHA",
    cardNumber: "2 3333 12428 7325",
    username: "playwrightgha",
  },
}

const which = process.env.TEST_PATRON || "local"
const patron = patrons[which as keyof typeof patrons]

if (!patron) {
  throw new Error(`Unknown TEST_PATRON: "${which}". Use "local" or "gha".`)
}

export const testPatron = {
  ...patron,
  password: process.env.QA_PASSWORD,
}
