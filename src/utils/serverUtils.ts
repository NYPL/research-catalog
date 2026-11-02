import { logServerWarn } from "./logUtils"

const TIMEOUT_MS = 15000

export async function withTimeout<T>(
  asyncCallback,
  ms: number = TIMEOUT_MS
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout>
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Request timed out after ${ms} ms`))
    }, ms)
  })
  return Promise.race([asyncCallback(), timeoutPromise]).finally(() =>
    clearTimeout(timeoutId)
  )
}

export type RetryOptions<T> = {
  retries?: number
  baseDelayMs?: number
  // Decides whether to retry based on result/error from a previous attempt
  // Default is retrying only on a thrown error
  shouldRetry?: (result: T | undefined, error: unknown) => boolean
}

/**
 * Calls provided method with retries.
 * Retries (with increasing backoff) while shouldRetry returns true and until retries are exhausted.
 * Returns the last result, or re-throws the last error depending on the last attempt
 */
export async function callMethodWithRetries<T>(
  method: () => Promise<T>,
  methodName: string,
  {
    retries = 3,
    baseDelayMs = 300,
    shouldRetry = (_result, error) => !!error,
  }: RetryOptions<T> = {}
): Promise<T> {
  const maxAttempts = retries + 1
  let lastError
  let lastResult

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      lastResult = await method()
      if (!shouldRetry(lastResult, undefined)) return lastResult
    } catch (error) {
      lastError = error
      if (!shouldRetry(undefined, error)) throw error
    }

    if (attempt < maxAttempts) {
      const delay = baseDelayMs * attempt
      logServerWarn(
        methodName,
        `Attempt ${attempt} of ${maxAttempts} failed${
          lastError ? `: ${(lastError as Error).message}` : ""
        }. Retrying after ${delay}ms...`
      )
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  if (lastError) throw lastError
  return lastResult
}
