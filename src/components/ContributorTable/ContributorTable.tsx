import { Table } from "@nypl/design-system-react-components"
import type { DiscoveryContributorResult } from "../../types/browseTypes"
import { isPreferredRecord } from "../../utils/browseUtils"
import VariantContributor from "../../models/VariantContributor"
import PreferredContributor from "../../models/PreferredContributor"
import PreferredContributorTableCell from "./PreferredContributorTableCell"
import VariantTableCell from "./VariantTableCell"

/**
 * The ContributorTable displays the index of author/contributors with their respective
 * counts, roles, and related terms, or variants with their related terms
 */
const ContributorTable = ({
  contributorTableData,
}: {
  contributorTableData: DiscoveryContributorResult[]
}) => {
  function createContributorCell(contributor: DiscoveryContributorResult) {
    if (isPreferredRecord(contributor)) {
      const newContributor = new PreferredContributor(contributor)
      return [
        <PreferredContributorTableCell
          key={newContributor.termLabel}
          contributor={newContributor}
        />,
        newContributor.count,
      ]
    } else {
      const newContributor = new VariantContributor(contributor)
      return [
        <VariantTableCell
          key={newContributor.termLabel}
          record={newContributor}
        />,
        "",
      ]
    }
  }
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
      columnHeaders={["Author/contributor", "Results"]}
      isScrollable
      columnStyles={[
        { minWidth: "269px" },
        {
          minWidth: { base: "84px", md: "160px" },
          width: "20%",
          textAlign: "right",
        },
      ]}
      tableData={contributorTableData.map(
        (contributor: DiscoveryContributorResult) =>
          createContributorCell(contributor)
      )}
      columnHeadersBackgroundColor="ui.bg.default"
      showRowDividers
    />
  )
}

export default ContributorTable
