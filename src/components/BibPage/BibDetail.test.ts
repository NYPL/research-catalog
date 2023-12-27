import {
  bibWithSupplementaryContent,
  parallelsBib,
} from "../../../__test__/fixtures/bibFixtures"
import Bib from "../../models/Bib"

import ReactElementToJSXString from "react-element-to-jsx-string"

describe("BibDetail component", () => {
  const suppBib = new Bib(bibWithSupplementaryContent)
  const bibWithParallels = new Bib(parallelsBib)
  it.todo("single value, no link")
  it.todo("multiple values, no link")
  it.todo("single value, external link")

  it.todo("top details")
  it.todo("multiple values, external link")
  it.todo("multiple values, internal link")
  it.todo("notes")
})
