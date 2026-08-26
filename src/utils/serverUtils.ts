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
