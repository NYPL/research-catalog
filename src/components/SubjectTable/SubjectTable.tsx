import { Table } from "@nypl/design-system-react-components"
import type {
  DiscoveryPreferredTermResult,
  DiscoverySubjectResult,
  DiscoverySubjectVariantResult,
} from "../../types/browseTypes"
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
  function createSubjectRow(subject: DiscoverySubjectResult) {
    let Subject
    if (isVariantSubject(subject)) Subject = VariantSubject
    else Subject = PreferredSubject
    const TableCell = isVariantSubject(subject)
      ? VariantSubjectTableCell
      : PreferredSubjectTableCell
    const subjectModel = new Subject(subject)
    return [
      <TableCell key={subjectModel.termLabel} subject={subjectModel} />,
      subjectModel.countDisplay,
    ]
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
      }}
      columnHeaders={["Subject heading", "Results"]}
      isScrollable
      columnStyles={[
        { minWidth: "274px" },
        {
          minWidth: { base: "84px", md: "160px" },
          width: "20%",
          textAlign: "right",
        },
      ]}
      tableData={subjectTableData.map((subject: DiscoverySubjectResult) =>
        createSubjectRow(subject)
      )}
      columnHeadersBackgroundColor="ui.bg.default"
      showRowDividers
    />
  )
}

export default SubjectTable
