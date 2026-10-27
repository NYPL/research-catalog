import { useEffect } from "react"

// Test page for checking uncaught errors against the _app error boundaries
function TestError({ mode }: { mode?: string }) {
  // ?mode=render throws during render
  if (mode === "render") {
    throw new Error("Throwing a client side test error")
  }

  // default throws after mount
  useEffect(() => {
    throw new Error("Throwing a client side error after mount")
  }, [])

  return null
}

export async function getServerSideProps({ query }) {
  // ?mode=gssp throws during data-fetching, before React ever renders
  if (query.mode === "gssp") {
    throw new Error("Throwing an uncaught getServerSideProps error")
  }
  return { props: { mode: query.mode || null } }
}

export default TestError
