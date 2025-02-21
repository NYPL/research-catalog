import Layout from "../../../src/components/Layout/Layout"
import type { EnhancedBrowseResult } from "../../../src/types/enhancedBrowseTypes"
import { fetchEBResults } from "../../api/browse"
import { Table } from "@nypl/design-system-react-components"

interface BrowseIndexPropsType {
  results: EnhancedBrowseResult[]
}

export default function Browse({ results }: BrowseIndexPropsType) {
  const headers = ["Label", "Bib count"]
  // const buildBibResultsUrl = (query) =>
  const tableData = results.map(({ aggregateBibCount, label }) => [
    label,
    `${aggregateBibCount}`,
  ])
  return (
    <Layout>
      <Table tableData={tableData} columnHeaders={headers} />
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const results = await fetchEBResults(query)
  return {
    props: {
      results,
    },
  }
}
