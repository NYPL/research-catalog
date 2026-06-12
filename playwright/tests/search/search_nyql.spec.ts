import { test, expect } from "@playwright/test"
import { SearchPage } from "../../pages/search_page"

let searchPage: SearchPage

test.beforeEach(async ({ page }) => {
  // No console listener is needed here; Playwright does not fail tests on console hydration warnings by default.

  // Dismiss any Next.js error dialogs that may appear
  page.on("dialog", async (dialog) => {
    await dialog.dismiss()
  })

  searchPage = new SearchPage(page, "")
  await page.goto("")

  // Wait for hydration to complete and page to be stable
  await page.waitForLoadState("networkidle")
})

test.describe("Query Search", () => {
  test('author = "Meillassoux, Quentin"', async () => {
    await searchPage.searchFor('author = "Meillassoux, Quentin"', "Query")

    await expect(searchPage.searchResults.first()).toBeVisible({
      timeout: 15000,
    })
    const queryTitles = (await searchPage.searchResults.allInnerTexts())
      .map((t) => t.trim())
      .filter(Boolean)

    // now go to the advanced search page and do an Author/Contributor search and assert the results are the same as the query search
    await searchPage.page.goto("search/advanced")
    await searchPage.page
      .getByRole("textbox", { name: "Author/Contributor" })
      .fill("Meillassoux, Quentin")
    await searchPage.page
      .locator("form")
      .locator("#submit-advanced-search")
      .click()

    await expect(async () => {
      await expect(searchPage.searchResults.first()).toBeVisible({
        timeout: 15000,
      })
      const advancedTitles = (await searchPage.searchResults.allInnerTexts())
        .map((t) => t.trim())
        .filter(Boolean)

      expect(advancedTitles).toHaveLength(queryTitles.length)
      expect([...advancedTitles].sort()).toEqual([...queryTitles].sort())
      expect(queryTitles.length).toBeGreaterThan(0)
    }).toPass({ timeout: 15000 })
  })

  test('keyword = "pterosaur"', async () => {
    await searchPage.searchFor('keyword = "pterosaur"', "Query")

    await expect(searchPage.searchResults.first()).toBeVisible({
      timeout: 15000,
    })
    const queryTitles = (await searchPage.searchResults.allInnerTexts())
      .map((t) => t.trim())
      .filter(Boolean)

    await searchPage.page.goto("search/advanced")
    await searchPage.page
      .getByRole("textbox", { name: "Keyword" })
      .fill("pterosaur")
    // click the search button
    await searchPage.page
      .locator("form")
      .locator("#submit-advanced-search")
      .click()

    await expect(async () => {
      await expect(searchPage.searchResults.first()).toBeVisible({
        timeout: 15000,
      })
      const advancedTitles = (await searchPage.searchResults.allInnerTexts())
        .map((t) => t.trim())
        .filter(Boolean)

      expect(advancedTitles).toHaveLength(queryTitles.length)
      expect([...advancedTitles].sort()).toEqual([...queryTitles].sort())
      // if exact same order is expected, use this instead:
      //expect(advancedTitles).toEqual(queryTitles)
      expect(queryTitles.length).toBeGreaterThan(0)
    }).toPass({ timeout: 15000 })
  })
  test("keyword = pterosaur", async () => {
    await searchPage.searchFor("keyword = pterosaur", "Query")

    await expect(searchPage.searchResults.first()).toBeVisible({
      timeout: 15000,
    })
    const queryTitles = (await searchPage.searchResults.allInnerTexts())
      .map((t) => t.trim())
      .filter(Boolean)

    await searchPage.page.goto("search/advanced")
    await searchPage.page
      .getByRole("textbox", { name: "Keyword" })
      .fill("pterosaur")
    // click the search button
    await searchPage.page
      .locator("form")
      .locator("#submit-advanced-search")
      .click()

    await expect(async () => {
      await expect(searchPage.searchResults.first()).toBeVisible({
        timeout: 15000,
      })
      const advancedTitles = (await searchPage.searchResults.allInnerTexts())
        .map((t) => t.trim())
        .filter(Boolean)

      expect(advancedTitles).toHaveLength(queryTitles.length)
      expect([...advancedTitles].sort()).toEqual([...queryTitles].sort())
      // if exact same order is expected, use this instead:
      //expect(advancedTitles).toEqual(queryTitles)
      expect(queryTitles.length).toBeGreaterThan(0)
    }).toPass({ timeout: 15000 })
  })
})

test.describe("callnumber = JFE 86-3252", () => {
  test("callnumber = JFE 86-3252", async () => {
    await searchPage.searchFor('callnumber = "JFE 86-3252"', "Query")

    await expect(searchPage.searchResults.first()).toBeVisible({
      timeout: 15000,
    })
    const queryTitles = (await searchPage.searchResults.allInnerTexts())
      .map((t) => t.trim())
      .filter(Boolean)

    // now do a Call Number search and assert the results are the same as the query search
    await searchPage.page
      .getByLabel("Select a category")
      .selectOption({ label: "Call number" })
    const callNumberInput = searchPage.page.getByRole("textbox", {
      name: "Enter a call number or the",
    })
    await callNumberInput.fill("JFE 86-3252")
    await callNumberInput.press("Enter")

    await expect(async () => {
      await expect(searchPage.searchResults.first()).toBeVisible({
        timeout: 15000,
      })
      const callNumberTitles = (await searchPage.searchResults.allInnerTexts())
        .map((t) => t.trim())
        .filter(Boolean)

      expect(callNumberTitles).toHaveLength(queryTitles.length)
      expect(callNumberTitles).toEqual(queryTitles)
      expect(queryTitles.length).toBeGreaterThan(0)
    }).toPass({ timeout: 15000 })
  })
})

test.describe('callnumber = "^JFE 24"', () => {
  test('callnumber = "^JFE 24"', async () => {
    await searchPage.searchFor('callnumber = "^JFE 24"', "Query")

    await expect(searchPage.searchResults.first()).toBeVisible({
      timeout: 15000,
    })
    const queryTitles = (await searchPage.searchResults.allInnerTexts())
      .map((t) => t.trim())
      .filter(Boolean)

    // now go to the advanced search page and do a Title search and assert the results are the same as the query search
    await searchPage.page.goto("search/advanced")
    await searchPage.page
      .getByRole("textbox", { name: "Call number" })
      .fill("^JFE 24")
    // click the search button
    await searchPage.page
      .locator("form")
      .locator("#submit-advanced-search")
      .click()

    await expect(async () => {
      await expect(searchPage.searchResults.first()).toBeVisible({
        timeout: 30000,
      })
      const advancedTitles = (await searchPage.searchResults.allInnerTexts())
        .map((t) => t.trim())
        .filter(Boolean)

      expect(advancedTitles).toHaveLength(queryTitles.length)
      expect(queryTitles.length).toBeGreaterThan(0)
    }).toPass({ timeout: 30000 })
  })
})
test.describe('identifier = "b10670401"', () => {
  test('identifier = "b10670401"', async () => {
    await searchPage.searchFor('identifier = "b10670401"', "Query")

    await expect(searchPage.searchResults.first()).toBeVisible({
      timeout: 15000,
    })
    // expect 1 result to be returned and the link on the title to contain "b10670401"
    const queryTitles = searchPage.searchResults
    await expect(async () => {
      await expect(queryTitles).toHaveCount(1)
      await expect(queryTitles.first()).toHaveAttribute("href", /b10670401/)
    }).toPass({ timeout: 15000 })
  })
})
test.describe('subject = "Mitanni (Ancient kingdom)"', () => {
  test('subject = "Mitanni (Ancient kingdom)"', async () => {
    await searchPage.searchFor('subject = "Mitanni (Ancient kingdom)"', "Query")

    await expect(searchPage.searchResults.first()).toBeVisible({
      timeout: 15000,
    })
    const queryTitles = (await searchPage.searchResults.allInnerTexts())
      .map((t) => t.trim())
      .filter(Boolean)

    // now go to the advanced search page and do a Title search and assert the results are the same as the query search
    await searchPage.page.goto("search/advanced")
    await searchPage.page
      .getByRole("textbox", { name: "Subject" })
      .fill("Mitanni (Ancient kingdom)")
    // click the search button
    await searchPage.page
      .locator("form")
      .locator("#submit-advanced-search")
      .click()

    await expect(async () => {
      await expect(searchPage.searchResults.first()).toBeVisible({
        timeout: 30000,
      })
      const advancedTitles = (await searchPage.searchResults.allInnerTexts())
        .map((t) => t.trim())
        .filter(Boolean)

      expect(advancedTitles).toHaveLength(queryTitles.length)
      expect(queryTitles.length).toBeGreaterThan(0)
    }).toPass({ timeout: 30000 })
  })
})
