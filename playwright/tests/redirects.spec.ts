import { test, expect } from "@playwright/test"

test("legacy url redirects to base path", async ({ page }) => {
  await page.goto(
    "http://localhost:8080/research/collections/shared-collection-catalog"
  )
  await expect(page).toHaveURL(
    "http://localhost:8080/research/research-catalog"
  )
})

test("legacy url plus path redirects to base path", async ({ page }) => {
  await page.goto(
    "http://localhost:8080/research/collections/shared-collection-catalog/test"
  )
  await expect(page).toHaveURL(
    "http://localhost:8080/research/research-catalog/test"
  )
})

test("exact mapped SHEP link redirects to browse", async ({ page }) => {
  await page.goto(
    "http://localhost:8080/research/research-catalog/subject_headings/c47dda10-a6a1-49ba-81db-6e46722674af"
  )
  await expect(page).toHaveURL(
    "http://localhost:8080/research/research-catalog/browse/subjects/Hebrew language -- Study and teaching."
  )
})

test("SHEP link with filter parameter redirects to browse index", async ({
  page,
}) => {
  await page.goto(
    "http://localhost:8080/research/research-catalog/subject_headings?filter=Bronx River"
  )
  await expect(page).toHaveURL(
    "http://localhost:8080/research/research-catalog/browse?q=Bronx River&search_scope=starts_with"
  )
})

test("SHEP link with label parameter redirects to browse results", async ({
  page,
}) => {
  await page.goto(
    "http://localhost:8080/research/research-catalog/subject_headings/c47dda10-a6a1-49ba-81db-6e46722674af?label=Hello"
  )
  await expect(page).toHaveURL(
    "http://localhost:8080/research/research-catalog/browse/subjects/Hello."
  )
})

test("SHEP base url redirects to browse", async ({ page }) => {
  await page.goto(
    "http://localhost:8080/research/research-catalog/subject_headings"
  )
  await expect(page).toHaveURL(
    "http://localhost:8080/research/research-catalog/browse"
  )
})

test("SHEP link with unknown uuid/path redirects to browse", async ({
  page,
}) => {
  await page.goto(
    "http://localhost:8080/research/research-catalog/subject_headings/something-something"
  )
  await expect(page).toHaveURL(
    "http://localhost:8080/research/research-catalog/browse"
  )
})
