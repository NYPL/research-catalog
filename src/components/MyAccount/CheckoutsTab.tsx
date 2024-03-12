import {
  Box,
  Icon,
  Link,
  Table,
  Text,
} from "@nypl/design-system-react-components"
import type { Checkout, Patron } from "../../types/myAccountTypes"
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

  function formatTitle(checkout: Checkout) {
    if (checkout.catalogHref) {
      return <Link href={checkout.catalogHref}>{checkout.title}</Link>
    } else {
      return <Text>{checkout.title}</Text>
    }
  }

  const checkoutsData = checkouts.map((checkout) => [
    formatTitle(checkout),
    checkout.barcode,
    checkout.callNumber,
    checkout.dueDate,
    checkout.isResearch ? null : (
      <RenewButton checkout={checkout} patron={patron} />
    ),
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
