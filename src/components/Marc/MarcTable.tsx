import { Table } from "@nypl/design-system-react-components"
import type { Marc } from "../../types/marcTypes"

/**
 * The MarcTable displays a table of the MARC fields, in order of MARC tag.
 */
const MarcTable = ({ marc }: { marc: Marc }) => {
  const leaderRow = ["LDR", "", "", marc.leader.content]
  const controlRows = []
  return (
    <Table
      isScrollable
      columnStyles={[
        { width: "48px" },
        { width: "32px" },
        { width: "32px" },
        {
          width: "fill",
        },
      ]}
      columnHeaders={["tag", "ind1", "ind2", "content"]}
      tableData={[leaderRow, ...controlRows]}
      columnHeadersBackgroundColor="ui.bg.default"
      showRowDividers
    />
  )
}

export default MarcTable
