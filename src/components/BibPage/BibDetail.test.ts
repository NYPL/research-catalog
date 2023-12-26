import {
  bibWithSupplementaryContent,
  parallelsBib,
} from "../../../__test__/fixtures/bibFixtures"
import Bib from "../../models/Bib"

import ReactElementToJSXString from "react-element-to-jsx-string"

xdescribe("BibDetail component", () => {
  const suppBib = new Bib(bibWithSupplementaryContent)
  const bibWithParallels = new Bib(parallelsBib)
  it("single value, no link", () => {
    console.log(
      ReactElementToJSXString(Bib.buildDetailElement(suppBib.titleDisplay))
    )
  })
  it("multiple values, no link", () => {
    console.log(
      ReactElementToJSXString(
        Bib.buildDetailElement(suppBib["contributorLiteral"])
      )
    )
  })
  it("single value, external link", () => {
    console.log(
      ReactElementToJSXString(
        Bib.buildExternalLinkElement(suppBib["supplementaryContent"])
      )
    )
  })

  it.todo("top details")
  it.todo("multiple values, external link")
  it.todo("multiple values, internal link")
  it.todo("notes")
})
