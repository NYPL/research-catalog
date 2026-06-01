import type { Page } from "@playwright/test"

/**
 * Visits a random search results page and returns a bib ID that has
 * both the 'Request for onsite use' and 'Request scan' buttons active.
 */
export async function pickRequestBibId(page: Page): Promise<string> {
  const pageNumber = Math.floor(Math.random() * 50) + 1
  // the following should account for a location, too.  like this: http://local.nypl.org:8080/research/research-catalog/search?q=magic&filters[buildingLocation][0]=ma&page=2
  await page.goto(
    `search?q=magic&filters[buildingLocation][0]=ma&page=${pageNumber}`,
    {
      waitUntil: "domcontentloaded",
    }
  )

  // Collect bib IDs from result cards that have both active request buttons
  const eligibleBibIds = await page
    .locator("#search-results-list > *")
    .evaluateAll((cards) => {
      return cards
        .filter((card) => {
          const activeLinks = Array.from(
            card.querySelectorAll("a:not([aria-disabled='true'])")
          ).map((a) => a.textContent?.trim().toLowerCase())
          return (
            activeLinks.includes("request for onsite use") &&
            activeLinks.includes("request scan")
          )
        })
        .map((card) => {
          const bibLink = card.querySelector<HTMLAnchorElement>(
            'h3 a[href*="/bib/"]'
          )
          return bibLink?.href.match(/\/bib\/([^/?#]+)/i)?.[1] ?? null
        })
        .filter(Boolean) as string[]
    })

  if (!eligibleBibIds.length) {
    throw new Error(
      `No bibs with both active request buttons found on search page ${pageNumber}`
    )
  }

  return eligibleBibIds[Math.floor(Math.random() * eligibleBibIds.length)]
}
