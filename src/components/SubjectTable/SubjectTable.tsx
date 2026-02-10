import { Table } from "@nypl/design-system-react-components"
import type { DiscoverySubjectResult } from "../../types/browseTypes"
import VariantSubjectTableCell from "./VariantSubjectTableCell"
import { isPreferredRecord } from "../../utils/browseUtils"
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
  function createSubjectCell(subject: DiscoverySubjectResult) {
    if (isPreferredRecord(subject)) {
      const newSubject = new PreferredSubject(subject)
      return [
        <PreferredSubjectTableCell
          key={newSubject.termLabel}
          subject={newSubject}
        />,
        newSubject.count,
      ]
    } else {
      const newSubject = new VariantSubject(subject)
      return [
        <VariantSubjectTableCell
          key={newSubject.termLabel}
          subject={newSubject}
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
      columnHeaders={["Subject heading", "Results"]}
      isScrollable
      columnStyles={[
        { minWidth: "269px" },
        {
          minWidth: { base: "84px", md: "160px" },
          width: "20%",
          textAlign: "right",
        },
      ]}
      tableData={subjectTableData.map((subject: DiscoverySubjectResult) =>
        createSubjectCell(subject)
      )}
      columnHeadersBackgroundColor="ui.bg.default"
      showRowDividers
    />
  )
}

export default SubjectTable
