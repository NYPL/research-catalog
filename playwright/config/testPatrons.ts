const TEST_PATRONS = {
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

const patronKey = process.env.TEST_PATRON || "local"
const selectedPatron = TEST_PATRONS[patronKey as keyof typeof TEST_PATRONS]

if (!selectedPatron) {
  throw new Error(`Unknown TEST_PATRON: "${patronKey}". Use "local" or "gha".`)
}

export const testPatron = {
  ...selectedPatron,
  password: process.env.QA_PASSWORD,
}
