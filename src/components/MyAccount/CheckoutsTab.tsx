import { Box, Icon, Link, Table } from "@nypl/design-system-react-components"
import type { Checkout, Patron } from "../../types/accountTypes"

import { getTitle } from "../../utils/myAccountUtils"
import styles from "../../../styles/components/MyAccount.module.scss"
import RenewButton from "./RenewButton"

const CheckoutsTab = ({
  checkouts,
  patron,
}: {
  checkouts: Checkout[]
  patron: Patron
}) => {
  const checkoutsHeaders = [
    "Title",
    "Barcode",
    "Call number",
    "Due back by",
    "Manage checkout",
  ]

  const checkoutsData = checkouts.map((checkout) => [
    getTitle(checkout),
    checkout.barcode,
    checkout.callNumber,
    checkout.dueDate,
    checkout.isResearch ? null : RenewButton(checkout, patron),
  ])
  return (
    <>
      {checkouts.length === 0 && (
        <Box className={styles.notification}>
          <span>You currently do not have any research items checked out.</span>
        </Box>
      )}
      <Box className={styles.notificationWithIcon}>
        <Icon size="medium" name="errorOutline" iconRotation="rotate180" />{" "}
        <span>
          See <Link href="https://nypl.na2.iiivega.com/">this page</Link> for
          eBooks and eAudiobooks checked out by you
        </span>
      </Box>
      <Table
        className={styles.itemsTable}
        showRowDividers={true}
        columnHeadersBackgroundColor={"ui.gray.x-light-cool"}
        columnHeaders={checkoutsHeaders}
        tableData={checkoutsData}
      />
    </>
  )
}

export default CheckoutsTab
