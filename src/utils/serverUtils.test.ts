import { withTimeout } from "./serverUtils"

describe("withTimeout", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("resolves successfully if the promise resolves before the timeout limit", async () => {
    const mockPromise = new Promise((resolve) =>
      setTimeout(() => resolve("success"), 1000)
    )

    const resultPromise = withTimeout(mockPromise, 5000)
    jest.advanceTimersByTime(1000)

    await expect(resultPromise).resolves.toBe("success")
  })

  it("rejects if the promise rejects before the timeout limit", async () => {
    const mockPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("test error")), 1000)
    )

    const resultPromise = withTimeout(mockPromise, 5000)
    jest.advanceTimersByTime(1000)

    await expect(resultPromise).rejects.toThrow("test error")
  })

  it("rejects with a timeout error if the promise exceeds the limit", async () => {
    const mockPromise = new Promise((resolve) =>
      setTimeout(() => resolve("success"), 5000)
    )

    const resultPromise = withTimeout(mockPromise, 2000)
    jest.advanceTimersByTime(2000)

    await expect(resultPromise).rejects.toThrow(
      "Request timed out after 2000 ms"
    )
  })
})
