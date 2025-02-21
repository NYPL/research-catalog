import Layout from "../../../src/components/Layout/Layout"
import RCLink from "../../../src/components/Links/RCLink/RCLink"
import type { EnhancedBrowseResult } from "../../../src/types/enhancedBrowseTypes"
import { fetchEBResults } from "../../api/browse"
import { Pagination, Table } from "@nypl/design-system-react-components"

interface BrowseIndexPropsType {
  results: EnhancedBrowseResult[]
}

export default function Browse({ results }: BrowseIndexPropsType) {
  const headers = ["Label", "Bib count"]
  const buildBibResultsUrl = (subject) => "/browse/subjects/" + subject
  const tableData = results.map(({ aggregateBibCount, label }) => [
    <RCLink key={label} href={buildBibResultsUrl(label)}>
      {label}
    </RCLink>,
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
