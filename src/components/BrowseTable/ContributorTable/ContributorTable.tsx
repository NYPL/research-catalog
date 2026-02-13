import type { DiscoveryContributorResult } from "../../../types/browseTypes"
import { isPreferredTerm } from "../../../utils/browseUtils"
import VariantTerm from "../../../models/browse/VariantTerm"
import PreferredContributor from "../../../models/browse/PreferredContributor"
import PreferredContributorTableCell from "./PreferredContributorTableCell"
import VariantTableCell from "../VariantTableCell"
import BrowseTable from "../BrowseTable"

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
    if (isPreferredTerm(contributor)) {
      const newContributor = new PreferredContributor(contributor)
      return [
        <PreferredContributorTableCell
          key={newContributor.termLabel}
          contributor={newContributor}
        />,
        newContributor.count,
      ]
    } else {
      const newContributor = new VariantTerm(contributor, "contributors")
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
    <BrowseTable
      tableData={contributorTableData.map(
        (contributor: DiscoveryContributorResult) =>
          createContributorCell(contributor)
      )}
      tableHeading="Author/contributor"
    />
  )
}

export default ContributorTable
