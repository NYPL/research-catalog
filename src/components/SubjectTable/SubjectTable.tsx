// import { Box, Table } from "@nypl/design-system-react-components"
// import SubjectTableCell from "./PreferredSubjectTableCell"
// import type { DiscoverySubjectResult, Subject } from "../../types/browseTypes"
// import VariantSubjectTableCell from "./VariantSubjectTableCell"
// import { isVariantSubject } from "../../utils/browseUtils"

// /**
//  * The SubjectTable displays the index of subject headings with their respective counts
//  */
// const SubjectTable = ({
//   subjectTableData,
// }: {
//   subjectTableData: DiscoverySubjectResult[]
// }) => {
//   return (
//     <Table
//       columnHeaders={["Subject heading", "Results"]}
//       tableData={subjectTableData.map((subject: DiscoverySubjectResult) =>
//         isVariantSubject(subject)
//           ? [
//               <VariantSubjectTableCell
//                 key={subject.variantTerm}
//                 subject={subject}
//               />,
//               "",
//             ]
//           : [
//               <PreferredSubjectTableCell
//                 key={subject.preferredTerm}
//                 subject={subject}
//               />,
//               subject.count,
//             ]
//       )}
//       columnHeadersBackgroundColor="ui.bg.default"
//       showRowDividers
//     />
//   )
// }

// export default SubjectTable
