import { Table } from "@nypl/design-system-react-components"
import type { DiscoverySubjectResult } from "../../types/browseTypes"
import VariantSubjectTableCell from "./VariantSubjectTableCell"
import { isVariantSubject } from "../../utils/browseUtils"
import VariantSubject from "../../models/VariantSubject"
import PreferredSubject from "../../models/PreferredSubject"
import PreferredSubjectTableCell from "./PreferredSubjectTableCell"

/**
 * The SubjectTable displays the index of subject headings with their respective counts
 */
const SubjectTable = ({
  subjectTableData,
}: {
  subjectTableData: DiscoverySubjectResult[]
}) => {
  return (
    <Table
      columnHeaders={["Subject heading", "Results"]}
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
          const newSubject = new PreferredSubject(subject)
          return [
            <PreferredSubjectTableCell
              key={newSubject.preferredTerm}
              subject={newSubject}
            />,
            newSubject.count,
          ]
        }
      })}
      columnHeadersBackgroundColor="ui.bg.default"
      showRowDividers
    />
  )
}

export default SubjectTable
