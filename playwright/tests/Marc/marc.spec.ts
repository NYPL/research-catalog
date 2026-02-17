import { test, expect } from "@playwright/test"
import { MarcPage } from "../../pages/marc_page"

let marcPage: MarcPage

test.describe("MARC page elements", () => {
  test.setTimeout(60000)
  test.beforeEach(async ({ page }) => {
    marcPage = new MarcPage(page)
    marcPage.navigate("b22144813")
  })

  test("bib link goes to correct page", async () => {
    await expect(marcPage.bibLink).toHaveAttribute(
      "href",
      "/research/research-catalog/bib/b22144813"
    )
  })

  test("record title appears", async () => {
    await expect(marcPage.recordTitle).toBeVisible()
  })

  test("leader field appears first", async () => {
    const firstBodyRow = marcPage.marcTable.locator("tbody tr").first()
    await expect(firstBodyRow).toContainText("LDR")
  })
})
