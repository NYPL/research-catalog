import { test, expect } from "@playwright/test"
import { BibPage } from "../../pages/bib_page"

test.describe("Bib page", () => {
  let bibPage: BibPage

  test.describe("Bib page elements", () => {
    test.beforeEach(async ({ page }) => {
      bibPage = new BibPage(page)
      await bibPage.navigate("b22144813")
    })
    test("renders bib title and details", async () => {
      await expect(bibPage.heading).toHaveText(
        "Life is a strange circle (updated 20180627) --245 10 $a, Maintenance test record-- 245 $b"
      )
      await expect(bibPage.topDetails.first()).toContainText(
        "Life is a strange circle (updated 20180627)"
      )
      await expect(bibPage.bottomDetails).toContainText(
        "Publication Date (unformated) -- 362 1b"
      )
    })

    test("renders item table when items exist", async () => {
      await expect(bibPage.itemTable).toBeVisible()
    })

    test("renders electronic resources if present", async () => {
      await expect(bibPage.electronicResources).toBeVisible()
    })
  })

  test.describe("Bib page filtering and pagination", () => {
    test.beforeEach(async ({ page }) => {
      bibPage = new BibPage(page)
    })
    test("applies filter and updates page", async () => {
      await bibPage.navigate("b15080796")
      await bibPage.clickFilterCheckbox()
      await expect(bibPage.page).toHaveURL(/item_location=loc%3Amak32/)
      await expect(
        bibPage.page.getByText("Displaying all", { exact: false })
      ).toBeVisible()

      await bibPage.clearFilterTag()
      await expect(bibPage.page).toHaveURL(/\/bib\/b15080796$/)
    })

    test("filters by year", async () => {
      await bibPage.navigate("b15080796")
      await bibPage.submitYear("2005")
      await expect(bibPage.page).toHaveURL(/item_date=2005/)

      await bibPage.clearFilterTag()
      await expect(bibPage.page).toHaveURL(/\/bib\/b15080796$/)
    })

    test("pagination works and view all/fewer items", async () => {
      await bibPage.navigate("pb5579193")

      await expect(bibPage.pagination).toBeVisible()
      await expect(
        bibPage.page.locator("text=Displaying 1-20 of 26 items")
      ).toBeVisible()

      await bibPage.clickViewAll()
      await expect(bibPage.page).toHaveURL(/\/all$/)
      await expect(bibPage.viewFewerButton).toBeVisible()

      await bibPage.clickViewFewer()
      await expect(bibPage.page).toHaveURL(/\/bib\/pb5579193$/)
    })

    test("shows loading message", async () => {
      await bibPage.navigate("pb5579193")
      await bibPage.clickViewAll()
      await expect(bibPage.loadingMessage).toHaveCount(1)
    })
  })
})
