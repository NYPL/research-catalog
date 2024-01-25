import { makeClient } from "../../src/utils/ebscoClient"

let ebscoClient

export async function fetchEbscoResults(query) {
  if (!ebscoClient) {
    ebscoClient = await makeClient()
  }

  return ebscoClient.search(query)
}
