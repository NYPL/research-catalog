import { test, expect } from "@playwright/test"

// uses testError.tsx which throws multiple kinds of errors
// must be run against a production instance, otherwise dev mode errors will interrupt
test.describe("App error boundaries", () => {
  test("renders the error page on a render error during initial page load", async ({
    page,
  }) => {
    const response = await page.goto("testError?mode=render")

    // PageErrorBoundary catches this clientside, so still a 200
    expect(response?.status()).toBe(200)
    await expect(
      page.getByRole("heading", {
        level: 3,
        name: "Something went wrong on our end",
      })
    ).toBeVisible()
    await expect(
      page.getByRole("button", { name: /reloading the page/ })
    ).toBeVisible()
  })

  test("renders the error page on a render error during client-side navigation", async ({
    page,
  }) => {
    await page.goto("")
    await expect(
      page.getByRole("heading", { name: "Research Catalog" })
    ).toBeVisible()

    // clientside nav
    await page.evaluate(() => {
      const nextWindow = window as unknown as {
        next: { router: { push: (url: string) => void } }
      }
      nextWindow.next.router.push("/testError?mode=render")
    })

    await expect(
      page.getByRole("heading", {
        level: 3,
        name: "Something went wrong on our end",
      })
    ).toBeVisible()
    await expect(
      page.getByRole("button", { name: /reloading the page/ })
    ).toBeVisible()
  })

  test("escalates to the outer, dependency-free ErrorBoundary when ErrorPage itself can't render", async ({
    page,
  }) => {
    await page.goto("testError?mode=render&breakErrorPage=1")

    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Something went wrong on our end",
      })
    ).toBeVisible()
    await expect(
      page.getByRole("link", { name: "contact us" })
    ).toHaveAttribute("href", "https://www.nypl.org/get-help/contact-us")
  })

  test("renders _error.tsx with a real HTTP 500 on an uncaught getServerSideProps error", async ({
    page,
  }) => {
    const response = await page.goto("testError?mode=gssp")

    // Error.getInitialProps handles it and sets 500 status
    expect(response?.status()).toBe(500)
    await expect(
      page.getByRole("heading", {
        level: 3,
        name: "Something went wrong on our end",
      })
    ).toBeVisible()
  })

  test("renders the 404 page with a real HTTP 404 on an unmatched route", async ({
    page,
  }) => {
    const response = await page.goto("this-route-does-not-exist")

    expect(response?.status()).toBe(404)
    await expect(
      page.getByRole("heading", {
        level: 3,
        name: "We couldn't find that page",
      })
    ).toBeVisible()
  })
})
