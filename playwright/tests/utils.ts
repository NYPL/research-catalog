import sierraClient from "../../src/server/sierraClient"
import { testPatron } from "../config/testPatrons"
import { logger } from "@nypl/node-utils"

const username = testPatron.username
const name = testPatron.name
const cardNumber = testPatron.cardNumber
const patronId = testPatron.patronId

export const setUpTestPatron = async () => {
  console.log("Resetting patron account data")
  if (patronId) {
    const sierra = await sierraClient()
    const patronData = {
      homeLibraryCode: "al",
      varFields: [
        { fieldTag: "b", content: cardNumber },
        { fieldTag: "u", content: username },
        { fieldTag: "z", content: "chrismulholland@nypl.org" },
        {
          fieldTag: "a",
          content: "325 E 48TH ST APT 3C$NEW YORK, NY 10017-1760",
        },
        { fieldTag: "n", content: name },
        { fieldTag: "t", content: "2125927256" },
      ],
    }
    try {
      await sierra.put(`patrons/${patronId}`, patronData)
    } catch (e) {
      logger.error("error resetting patron data, skipping account tests.")
      logger.error(e)
      process.env.SKIP_ACCOUNT_TESTS = "true"
    }
    const updatedPatron = await sierra.get(
      `patrons/${patronId}?fields=default,varFields`
    )
    const varFieldsMatching = patronData.varFields.map((field) => {
      const match = updatedPatron.varFields.find((innerField) => {
        return (
          innerField.fieldTag === field.fieldTag &&
          innerField.content === field.content
        )
      })
      return !!match
    })
    if (varFieldsMatching.includes(false)) {
      process.env.SKIP_ACCOUNT_TESTS = "true"
    }
  }
}
