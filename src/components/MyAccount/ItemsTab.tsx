import { Box, Icon, Link, Table } from "@nypl/design-system-react-components"
import styles from "../../../styles/components/MyAccount.module.scss"

const ItemsTab = ({
  headers,
  data,
  userAction,
}: {
  headers: string[]
  data: any[]
  userAction: "requested" | "checked out"
}) => {
  return (
    <>
      {data?.length === 0 && (
        <Box className={styles.notification}>
          <span>
            You currently do not have any research items {userAction}.
          </span>
        </Box>
      )}
      <Box className={styles.notificationWithIcon}>
        <Icon size="medium" name="errorOutline" iconRotation="rotate180" />{" "}
        <span>
          See <Link href="https://nypl.na2.iiivega.com/">this page</Link> for
          eBooks and eAudiobooks {userAction} by you
        </span>
      </Box>
      {data?.length > 0 && (
        <Table
          className={styles.itemsTable}
          showRowDividers={true}
          columnHeadersBackgroundColor={"ui.gray.x-light-cool"}
          columnHeaders={headers}
          tableData={data}
        />
      )}
    </>
  )
}

export default ItemsTab
