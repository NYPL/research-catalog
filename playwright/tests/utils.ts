import sierraClient from "../../src/server/sierraClient"
import type { TestPatron } from "../config/testPatrons"

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
    await sierra.put(`patrons/${patronId}`, patronData)
  }
}
