import { withTimeout, callMethodWithRetries } from "./serverUtils"
import { logServerWarn } from "./logUtils"

jest.mock("./logUtils", () => ({
  logServerWarn: jest.fn(),
}))

describe("withTimeout", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("resolves successfully if the promise resolves before the timeout limit", async () => {
    const callback = () =>
      new Promise((resolve) => setTimeout(() => resolve("success"), 1000))

    const resultPromise = withTimeout(callback, 5000)
    jest.advanceTimersByTime(1000)

    await expect(resultPromise).resolves.toBe("success")
  })

  it("rejects if the promise rejects before the timeout limit", async () => {
    const callback = () =>
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("test error")), 1000)
      )

    const resultPromise = withTimeout(callback, 5000)
    jest.advanceTimersByTime(1000)

    await expect(resultPromise).rejects.toThrow("test error")
  })

  it("rejects with a timeout error if the promise exceeds the limit", async () => {
    const callback = () =>
      new Promise((resolve) => setTimeout(() => resolve("success"), 5000))

    const resultPromise = withTimeout(callback, 2000)
    jest.advanceTimersByTime(2000)

    await expect(resultPromise).rejects.toThrow(
      "Request timed out after 2000 ms"
    )
  })
})

describe("callMethodWithRetries", () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("returns the result on first success without retrying", async () => {
    const method = jest.fn().mockResolvedValue("success")

    const result = await callMethodWithRetries(method, "test")

    expect(result).toBe("success")
    expect(method).toHaveBeenCalledTimes(1)
  })

  it("retries after a thrown error and returns the later success", async () => {
    const method = jest
      .fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValueOnce("success")

    const resultPromise = callMethodWithRetries(method, "test")
    await jest.advanceTimersByTimeAsync(300)

    await expect(resultPromise).resolves.toBe("success")
    expect(method).toHaveBeenCalledTimes(2)
    expect(logServerWarn).toHaveBeenCalledWith(
      "test",
      expect.stringContaining("Retrying")
    )
  })

  it("throws the last error after exhausting retries", async () => {
    const method = jest.fn().mockRejectedValue(new Error("always fail"))

    const resultPromise = callMethodWithRetries(method, "test", {
      retries: 3,
    })
    // Prevent unhandled rejection warning while timers advance
    resultPromise.catch(() => undefined)
    await jest.advanceTimersByTimeAsync(300)
    await jest.advanceTimersByTimeAsync(600)

    await expect(resultPromise).rejects.toThrow("always fail")
    expect(method).toHaveBeenCalledTimes(3)
  })

  it("respects a custom retries count", async () => {
    const method = jest.fn().mockRejectedValue(new Error("always fail"))

    const resultPromise = callMethodWithRetries(method, "test", {
      retries: 1,
    })

    await expect(resultPromise).rejects.toThrow("always fail")
    expect(method).toHaveBeenCalledTimes(1)
  })

  it("does not retry a thrown error that shouldRetry rejects", async () => {
    const method = jest.fn().mockRejectedValue(new Error("not retryable"))

    const resultPromise = callMethodWithRetries(method, "test", {
      shouldRetry: () => false,
    })

    await expect(resultPromise).rejects.toThrow("not retryable")
    expect(method).toHaveBeenCalledTimes(1)
  })

  it("retries a successful result when shouldRetry returns true, then returns the later result", async () => {
    const method = jest
      .fn<Promise<{ statusCode: number }>, []>()
      .mockResolvedValueOnce({ statusCode: 500 })
      .mockResolvedValueOnce({ statusCode: 200 })

    const resultPromise = callMethodWithRetries(method, "test", {
      shouldRetry: (result) => result?.statusCode >= 500,
    })
    await jest.advanceTimersByTimeAsync(300)

    await expect(resultPromise).resolves.toEqual({ statusCode: 200 })
    expect(method).toHaveBeenCalledTimes(2)
  })

  it("returns the last result (without throwing) if shouldRetry is still true after exhausting retries", async () => {
    const method = jest
      .fn<Promise<{ statusCode: number }>, []>()
      .mockResolvedValue({ statusCode: 500 })

    const resultPromise = callMethodWithRetries(method, "test", {
      retries: 2,
      shouldRetry: (result) => result?.statusCode >= 500,
    })
    await jest.advanceTimersByTimeAsync(300)

    await expect(resultPromise).resolves.toEqual({ statusCode: 500 })
    expect(method).toHaveBeenCalledTimes(2)
  })
})
