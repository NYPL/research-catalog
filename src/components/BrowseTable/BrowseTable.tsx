import { Link, Table } from "@nypl/design-system-react-components"
import type { TermLink } from "../../types/browseTypes"

export function commaSeparatedTermLinks(terms: TermLink[]) {
  return terms.map((term, i) => (
    <span key={term.url}>
      <Link href={term.url} isUnderlined={false}>
        {term.termLabel}
      </Link>
      {i < terms.length - 1 && ", "}
    </span>
  ))
}

const BrowseTable = ({
  tableData,
  tableHeading,
}: {
  tableData
  tableHeading: string
}) => {
  return (
    <Table
      maxWidth="928px"
      sx={{
        td: {
          ["@media screen and (max-width: 600px)"]: {
            paddingRight: "xs",
            paddingLeft: "xs",
          },
        },
        thead: { th: { fontSize: "14px" } },
      }}
      columnHeaders={[tableHeading, "Results"]}
      isScrollable
      columnStyles={[
        { minWidth: "269px" },
        {
          minWidth: { base: "84px", md: "160px" },
          width: "20%",
          textAlign: "right",
        },
      ]}
      tableData={tableData}
      columnHeadersBackgroundColor="ui.bg.default"
      showRowDividers
    />
  )
}

export default BrowseTable
