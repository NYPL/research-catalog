import type { DiscoverySubjectResult } from "../../../types/browseTypes"
import { isPreferredRecord } from "../../../utils/browseUtils"
import PreferredSubject from "../../../models/browse/PreferredSubject"
import PreferredSubjectTableCell from "./PreferredSubjectTableCell"
import VariantTerm from "../../../models/browse/VariantTerm"
import VariantTableCell from "../VariantTableCell"
import BrowseTable from "../BrowseTable"

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
      const newSubject = new VariantTerm(subject, "subjects")
      return [
        <VariantTableCell key={newSubject.termLabel} record={newSubject} />,
        "",
      ]
    }
  }
  return (
    <BrowseTable
      tableData={subjectTableData.map((subject: DiscoverySubjectResult) =>
        createSubjectCell(subject)
      )}
      tableHeading={"Subject heading"}
    />
  )
}

export default SubjectTable
