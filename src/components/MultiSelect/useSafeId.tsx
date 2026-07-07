import { useId } from "react"

const sanitizeString = (str: string) => {
  return str.replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase()
}

/**
 * This function is used to generate a unique ID for the component.
 * It uses the `useId` hook from React to generate a unique ID and
 * sanitizes it using the `sanitizeString` function.
 */
export function useSafeId(userId?: string) {
  const generatedId = useId()
  return userId ?? sanitizeString(generatedId)
}
