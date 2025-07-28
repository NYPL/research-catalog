import { Table } from "@nypl/design-system-react-components"
import type { DiscoverySubjectResult } from "../../types/browseTypes"
import VariantSubjectTableCell from "./VariantSubjectTableCell"
import { isVariantSubject } from "../../utils/browseUtils"
import VariantSubject from "../../models/VariantSubject"
import PreferredSubject from "../../models/PreferredSubject"
import PreferredSubjectTableCell from "./PreferredSubjectTableCell"

/**
 * The SubjectTable displays the index of subject headings with their respective
 * counts and related terms, or variants with their related terms
 */
const SubjectTable = ({
  subjectTableData,
}: {
  subjectTableData: DiscoverySubjectResult[]
}) => {
  return (
    <Table
      width="928px"
      sx={{
        td: {
          ["@media screen and (max-width: 600px)"]: {
            paddingRight: "xs",
            paddingLeft: "xs",
          },
        },
      }}
      columnHeaders={["Subject heading", "Results"]}
      isScrollable
      columnStyles={[
        { minWidth: "274px", width: "80%" },
        { minWidth: "84px", width: "20%", textAlign: "right" },
      ]}
      tableData={subjectTableData.map((subject: DiscoverySubjectResult) => {
        if (isVariantSubject(subject)) {
          const newVariant = new VariantSubject(subject)
          return [
            <VariantSubjectTableCell
              key={newVariant.variantTerm}
              subject={newVariant}
            />,
            "",
          ]
        } else {
          const newPreferred = new PreferredSubject(subject)
          return [
            <PreferredSubjectTableCell
              key={newPreferred.preferredTerm}
              subject={newPreferred}
            />,
            newPreferred.count,
          ]
        }
      })}
      columnHeadersBackgroundColor="ui.bg.default"
      showRowDividers
    />
  )
}

export default SubjectTable
