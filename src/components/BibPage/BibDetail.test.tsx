import userEvent from "@testing-library/user-event"
import {
  bibWithSupplementaryContent,
  noParallels,
} from "../../../__test__/fixtures/bibFixtures"
import Bib from "../../models/Bib"
import BibDetails from "./BibDetail"

import { render, screen, act } from "@testing-library/react"
import mockRouter from "next-router-mock"
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("BibDetail component", () => {
  const suppBib = new Bib(bibWithSupplementaryContent)
  const noParallelsBibModel = new Bib(noParallels)
  it("internal link", async () => {
    mockRouter.push("/bib/b12345678")
    render(<BibDetails details={noParallelsBibModel.topDetails} />, {
      wrapper: MemoryRouterProvider,
    })
    const creatorLiteralLink = screen.getByText("Cortanze, Gérard de.")
    await act(async () => {
      await userEvent.click(creatorLiteralLink)
    })
    expect(mockRouter.asPath).toBe(
      "/search?filters%5BcreatorLiteral%5D%5B0%5D=Cortanze%2C+G%C3%A9rard+de."
    )
  })
  it("external link", async () => {
    render(<BibDetails details={suppBib.topDetails} />, {
      wrapper: MemoryRouterProvider,
    })
    const supplementaryContent = screen.getByText("Image")
    await act(async () => {
      await userEvent.click(supplementaryContent)
    })
    // what should this test?
  })
  it("single value, no link", () => {
    render(<BibDetails details={noParallelsBibModel.topDetails} />, {
      wrapper: MemoryRouterProvider,
    })
    const title = screen.getByText("Title")
  })
  it.todo("multiple values, no link")
  it.todo("single value, external link")

  it.todo("top details")
  it.todo("multiple values, external link")
  it.todo("multiple values, internal link")
  it.todo("notes")
})
