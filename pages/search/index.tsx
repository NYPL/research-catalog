import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"

export default function Search() {
  return (
    <div style={{ paddingBottom: "var(--nypl-space-l)" }}>
      <Head>
        <title>NYPL Research Catalog</title>
      </Head>
      <Heading level="two">Search Results</Heading>
    </div>
  )
}
