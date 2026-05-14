import { test, expect } from "@playwright/test"
import { SearchPage } from "../../pages/search_page"

let searchPage: SearchPage
const queryBaseUrl =
  process.env.PLAYWRIGHT_QUERY_BASE_URL ??
  "https://train-research-catalog.nypl.org/research/research-catalog"

test.beforeEach(async ({ page }) => {
  searchPage = new SearchPage(page, "")
  await page.goto(queryBaseUrl)
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
    await searchPage.page.goto(queryBaseUrl + "/search/advanced")
    // enter "Meillassoux, Quentin" into the Author/Contributor textbox
    await searchPage.page
      .getByRole("textbox", { name: "Author/Contributor" })
      .fill("Meillassoux, Quentin")
    // click the search button
    await searchPage.page.getByRole("button", { name: "Search" }).click()

    await expect(searchPage.searchResults.first()).toBeVisible({
      timeout: 15000,
    })
    const advancedTitles = (await searchPage.searchResults.allInnerTexts())
      .map((t) => t.trim())
      .filter(Boolean)

    expect(advancedTitles).toHaveLength(queryTitles.length)
    expect([...advancedTitles].sort()).toEqual([...queryTitles].sort())
    expect(queryTitles.length).toBeGreaterThan(0)
  })

  test('keyword = "pterosaur"', async () => {
    await searchPage.searchFor('keyword = "pterosaur"', "Query")

    await expect(searchPage.searchResults.first()).toBeVisible({
      timeout: 15000,
    })
    const queryTitles = (await searchPage.searchResults.allInnerTexts())
      .map((t) => t.trim())
      .filter(Boolean)

    // now go to the advanced search page and do a Keyword search and assert the results are the same as the query search
    await searchPage.page.goto(queryBaseUrl + "/search/advanced")
    // enter "pterosaur" into the Keyword textbox
    await searchPage.page
      .getByRole("textbox", { name: "Keyword" })
      .fill("pterosaur")
    // click the search button
    await searchPage.page.getByRole("button", { name: "Search" }).click()

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
  })
  test("keyword = pterosaur", async () => {
    await searchPage.searchFor("keyword = pterosaur", "Query")

    await expect(searchPage.searchResults.first()).toBeVisible({
      timeout: 15000,
    })
    const queryTitles = (await searchPage.searchResults.allInnerTexts())
      .map((t) => t.trim())
      .filter(Boolean)

    // now go to the advanced search page and do a Keyword search and assert the results are the same as the query search
    await searchPage.page.goto(queryBaseUrl + "/search/advanced")
    // enter "pterosaur" into the Keyword textbox
    await searchPage.page
      .getByRole("textbox", { name: "Keyword" })
      .fill("pterosaur")
    // click the search button
    await searchPage.page.getByRole("button", { name: "Search" }).click()

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
  })
})

test.describe("title = the cat in the hat", () => {
  test("title = the cat in the hat", async () => {
    await searchPage.searchFor('title = "the cat in the hat"', "Query")

    await expect(searchPage.searchResults.first()).toBeVisible({
      timeout: 15000,
    })
    const queryTitles = (await searchPage.searchResults.allInnerTexts())
      .map((t) => t.trim())
      .filter(Boolean)

    // now go to the advanced search page and do a Title search and assert the results are the same as the query search
    await searchPage.page.goto(queryBaseUrl + "/search/advanced")
    // enter "the cat in the hat" into the Title textbox
    await searchPage.page
      .getByRole("textbox", { name: "Title" })
      .fill("the cat in the hat")
    // click the search button
    await searchPage.page.getByRole("button", { name: "Search" }).click()

    await expect(searchPage.searchResults.first()).toBeVisible({
      timeout: 30000,
    })
    const advancedTitles = (await searchPage.searchResults.allInnerTexts())
      .map((t) => t.trim())
      .filter(Boolean)

    expect(advancedTitles).toHaveLength(queryTitles.length)
    expect([...advancedTitles].sort()).toEqual([...queryTitles].sort())
    expect(queryTitles.length).toBeGreaterThan(0)
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
    await searchPage.page
      .getByRole("textbox", { name: "Enter a call number or the" })
      .fill("JFE 86-3252")
    await searchPage.page.getByRole("button", { name: "Search" }).click()

    await expect(searchPage.searchResults.first()).toBeVisible({
      timeout: 15000,
    })
    const callNumberTitles = (await searchPage.searchResults.allInnerTexts())
      .map((t) => t.trim())
      .filter(Boolean)

    expect(callNumberTitles).toHaveLength(queryTitles.length)
    expect(callNumberTitles).toEqual(queryTitles)
    expect(queryTitles.length).toBeGreaterThan(0)
  })
})

test.describe('callnumber = "MGZMD" AND keyword = "graham"', () => {
  test('callnumber = "MGZMD" AND keyword = "graham"', async () => {
    await searchPage.searchFor(
      'callnumber = "MGZMD" AND keyword = "graham"',
      "Query"
    )

    await expect(searchPage.searchResults.first()).toBeVisible({
      timeout: 15000,
    })
    const queryTitles = (await searchPage.searchResults.allInnerTexts())
      .map((t) => t.trim())
      .filter(Boolean)
    expect(queryTitles.length).toBeGreaterThan(0)

    // Locate all target cells that immediately follow a 'CALL NUMBER' cell
    const targetCells = searchPage.page.locator(
      'td:has-text("CALL NUMBER") + td'
    )

    // Get an array of locators for every instance found on the page
    const allInstances = await targetCells.all()

    // Assert each call number cell contains MGZMD
    for (const cell of allInstances) {
      await expect(cell).toContainText("MGZMD")
    }
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
    await searchPage.page.goto(queryBaseUrl + "/search/advanced")
    await searchPage.page
      .getByRole("textbox", { name: "Call number" })
      .fill("^JFE 24")
    // click the search button
    await searchPage.page.getByRole("button", { name: "Search" }).click()

    await expect(searchPage.searchResults.first()).toBeVisible({
      timeout: 30000,
    })
    const advancedTitles = (await searchPage.searchResults.allInnerTexts())
      .map((t) => t.trim())
      .filter(Boolean)

    expect(advancedTitles).toHaveLength(queryTitles.length)
    expect([...advancedTitles].sort()).toEqual([...queryTitles].sort())
    expect(queryTitles.length).toBeGreaterThan(0)
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
    await expect(queryTitles).toHaveCount(1)
    await expect(queryTitles.first()).toHaveAttribute("href", /b10670401/)
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
    await searchPage.page.goto(queryBaseUrl + "/search/advanced")
    await searchPage.page
      .getByRole("textbox", { name: "Subject" })
      .fill("Mitanni (Ancient kingdom)")
    // click the search button
    await searchPage.page.getByRole("button", { name: "Search" }).click()

    await expect(searchPage.searchResults.first()).toBeVisible({
      timeout: 30000,
    })
    const advancedTitles = (await searchPage.searchResults.allInnerTexts())
      .map((t) => t.trim())
      .filter(Boolean)

    expect(advancedTitles).toHaveLength(queryTitles.length)
    expect([...advancedTitles].sort()).toEqual([...queryTitles].sort())
    expect(queryTitles.length).toBeGreaterThan(0)
  })
})
test.describe('language = "Irish"', () => {
  test('language = "Irish"', async () => {
    await searchPage.searchFor('language = "Irish"', "Query")

    await expect(searchPage.searchResults.first()).toBeVisible({
      timeout: 15000,
    })
    const queryTitles = (await searchPage.searchResults.allInnerTexts())
      .map((t) => t.trim())
      .filter(Boolean)

    // now go to the advanced search page and do a Title search and assert the results are the same as the query search
    await searchPage.page.goto(queryBaseUrl + "/search/advanced")
    // click getByRole('button', { name: 'Language, 0 items currently' })
    await searchPage.page
      .getByRole("button", { name: "Language, 0 items currently selected" })
      .click()
    // fill Irish in the language search box getByRole('textbox', { name: 'Search Language' })
    await searchPage.page
      .getByRole("textbox", { name: "Search Language" })
      .fill("Irish")
    // click all checkboxes that appear in the results that have the label that starts with Irish
    await searchPage.page.waitForTimeout(1000)
    const irishCheckboxes = searchPage.page.locator(
      'input[type="checkbox"][name="language"][value^="Irish"]'
    )
    const count = await irishCheckboxes.count()
    for (let i = 0; i < count; i++) {
      await irishCheckboxes.nth(i).check()
    }

    // click the search button
    await searchPage.page.getByRole("button", { name: "Search" }).click()

    await expect(searchPage.searchResults.first()).toBeVisible({
      timeout: 30000,
    })
    const advancedTitles = (await searchPage.searchResults.allInnerTexts())
      .map((t) => t.trim())
      .filter(Boolean)

    expect(advancedTitles).toHaveLength(queryTitles.length)
    expect([...advancedTitles].sort()).toEqual([...queryTitles].sort())
    expect(queryTitles.length).toBeGreaterThan(0)
  })
})
