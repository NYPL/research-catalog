import sierraClient from "../../src/server/sierraClient"
import { appConfig } from "../../src/config/appConfig"

const username = appConfig.testUser.username[appConfig.environment]
const name = appConfig.testUser.name[appConfig.environment]
const cardNumber = appConfig.testUser.cardNumber[appConfig.environment]
const patronId = appConfig.testUser.patronId[appConfig.environment]

export const resetPatronData = async () => {
  console.log("Resetting patron account data")
  if (patronId) {
    const sierra = await sierraClient()
    const patronData = {
      homeLibraryCode: "al",
      varFields: [
        {
          fieldTag: "=",
          content:
            "$6$qov2by12Xggy7pdA$ilH6uX2Ly.uwghIY1ikoY1z1tob.xV.xcJUcl3SSUqGUME49VaQRM7x/thkXzjY6JkxG5ZRditVbeKngOZed6/",
        },
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
      console.log(e)
    }
    const patron = await sierra.get(
      `patrons/${patronId}?fields=default,varFields`
    )
    const varFieldsMatching = patron.varFields.map((field) => {
      const match = patronData.varFields.find((innerField) => {
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
