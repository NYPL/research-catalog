import { Table } from "@nypl/design-system-react-components"
import styles from "../../../../styles/components/MyAccount.module.scss"
import type { Fine } from "../../../types/accountTypes"

const FeesTab = ({ fines }: { fines: Fine }) => {
  const feesHeaders = ["Details", "Date", "Amount"]
  const feesData = fines.entries.map((fine) => [
    fine.detail,
    fine.date,
    `$${fine.amount.toFixed(2)}`,
  ])
  const finalRow = [["Total fees due", null, `$${fines.total.toFixed(2)}`]]
  return (
    <Table
      className={styles.feesTable}
      showRowDividers={true}
      columnHeadersBackgroundColor={"ui.gray.x-light-cool"}
      columnHeaders={feesHeaders}
      tableData={feesData.concat(finalRow)}
    />
  )
}

export default FeesTab
