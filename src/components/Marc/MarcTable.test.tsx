import React from "react"
import { render, screen } from "@testing-library/react"
import MarcTable from "./MarcTable"
import type { Marc } from "../../types/marcTypes"

describe("MarcTable", () => {
  const sampleMarc: Marc = {
    id: "1",
    nyplSource: "test",
    leader: { content: "01234cam a2200000" },
    controlFields: [
      { marcTag: "001", content: "123456" },
      { marcTag: "005", content: "20230101010101.0" },
    ],
    dataFields: [
      {
        marcTag: "100",
        fieldTag: "y",
        content: null,
        ind1: "1",
        ind2: " ",
        subfields: [
          { tag: "|a", content: "Doe, John" },
          { tag: "|d", content: "1970-" },
        ],
      },
      {
        marcTag: "245",
        fieldTag: "y",
        content: null,
        ind1: "1",
        ind2: "0",
        subfields: [
          { tag: "|a", content: "Example Book Title :" },
          { tag: "|b", content: "subtitle /" },
          { tag: "|c", content: "John Doe." },
        ],
      },
    ],
  }

  test("renders leader row correctly", () => {
    render(<MarcTable marc={sampleMarc} />)
    expect(screen.getByText("LDR")).toBeInTheDocument()
    expect(screen.getByText(sampleMarc.leader.content)).toBeInTheDocument()
  })

  test("renders control fields", () => {
    render(<MarcTable marc={sampleMarc} />)
    sampleMarc.controlFields.forEach((field) => {
      expect(screen.getByText(field.marcTag)).toBeInTheDocument()
      expect(screen.getByText(field.content)).toBeInTheDocument()
    })
  })

  test("renders data fields with subfields", () => {
    render(<MarcTable marc={sampleMarc} />)

    sampleMarc.dataFields.forEach((field) => {
      expect(screen.getByText(field.marcTag)).toBeInTheDocument()
    })

    sampleMarc.dataFields.forEach((field) => {
      field.subfields?.forEach((sf) => {
        const tagElements = screen.getAllByText(sf.tag)
        tagElements.forEach((el) => {
          expect(el).toBeInTheDocument()
        })
      })
    })
  })

  it("bolds/colors subfield tags", () => {
    render(<MarcTable marc={sampleMarc} />)

    sampleMarc.dataFields.forEach((field) => {
      field.subfields?.forEach((sf) => {
        const tagElements = screen.getAllByText(sf.tag)
        tagElements.forEach((el) => {
          expect(el).toHaveStyle("font-weight: bold")
          expect(el).toHaveStyle("color: brand.primary")
        })
      })
    })
  })
})
