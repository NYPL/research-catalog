import { test, expect } from "@playwright/test"

// uses testError.tsx to check error boundaries
test.describe("Error boundaries", () => {
  test("renders the error page on a render-phase error during initial page load", async ({
    page,
  }) => {
    await page.goto("testError?mode=render")

    await expect(
      page.getByText("Something went wrong on our end")
    ).toBeVisible()
    await expect(
      page.getByRole("button", { name: /reloading the page/ })
    ).toBeVisible()
  })

  test("renders the error page on a render-phase error during client-side navigation", async ({
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
      page.getByText("Something went wrong on our end")
    ).toBeVisible()
    await expect(
      page.getByRole("button", { name: /reloading the page/ })
    ).toBeVisible()
  })
})
