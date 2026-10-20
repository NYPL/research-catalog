import sierraClient from "../../src/server/sierraClient"
import type { TestPatron } from "../config/testPatrons"
import { logger } from "@nypl/node-utils"

export const setUpTestPatron = async (patron: TestPatron) => {
  const { patronId, name, cardNumber, username } = patron
  console.log(`Resetting patron account data for ${username}`)
  if (patronId) {
    const sierra = await sierraClient()
    const patronData = {
      homeLibraryCode: "al",
      // Notification preference: "z" is Email
      fixedFields: { "268": { label: "Notice Preference", value: "z" } },
      varFields: [
        { fieldTag: "b", content: cardNumber },
        { fieldTag: "u", content: username },
        { fieldTag: "z", content: "chrismulholland@nypl.org" },
        {
          fieldTag: "a",
          content: "476 FIFTH AVENUE$NEW YORK, NY 10018",
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
