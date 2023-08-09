import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"
import { useEffect } from "react"

export default function Search() {
  // Temp function to test out client side fetching until SearchForm UI is completed.
  function getSearchResults() {
    fetch("/research/research-catalog/api/search?q=test")
      .then(async (response) => await response.json())
      .then((data) => {
        console.log("API response data", data)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  useEffect(() => {
    getSearchResults()
  }, [])
  return (
    <div style={{ paddingBottom: "var(--nypl-space-l)" }}>
      <Head>
        <title>NYPL Research Catalog</title>
      </Head>
      <Heading level="two">Search Results</Heading>
    </div>
  )
}
