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
  test("Do a query search and assert that it returns results", async () => {
    await searchPage.searchFor('author = "Meillassoux, Quentin"', "Query")

    await expect(searchPage.searchResultsHeading).toBeVisible({
      timeout: 15000,
    })
    // print the titles of the first 5 search results to the console
    const titles = await searchPage.searchResults.allTextContents()
    console.log("Search results titles:")
    for (const title of titles.slice(0, 5)) {
      console.log(title)
    }

    // now go to the advanced search page and do an Author/Contributor search and assert the results are the same as the query search
    await searchPage.page.goto(queryBaseUrl + "/search/advanced")
    // enter "Meillassoux, Quentin" into the Author/Contributor textbox
    await searchPage.page
      .getByRole("textbox", { name: "Author/Contributor" })
      .fill("Meillassoux, Quentin")
    // click the search button
    await searchPage.page.getByRole("button", { name: "Search" }).click()

    await expect(searchPage.searchResultsHeading).toBeVisible({
      timeout: 15000,
    })

    await expect(async () => {
      const count = await searchPage.searchResults.count()
      expect(count).toBeGreaterThan(0)
    }).toPass({ timeout: 10000 })
  })
})
