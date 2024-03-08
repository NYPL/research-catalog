import { Box, Icon, Link, Table } from "@nypl/design-system-react-components"
import styles from "../../../styles/components/MyAccount.module.scss"

const ItemsTab = ({
  headers,
  data,
  verb,
}: {
  headers: string[]
  data: any[]
  verb: string
}) => {
  return (
    <>
      {data.length === 0 && (
        <Box className={styles.notification}>
          <span>You currently do not have any research items {verb}.</span>
        </Box>
      )}
      <Box className={styles.notificationWithIcon}>
        <Icon size="medium" name="errorOutline" iconRotation="rotate180" />{" "}
        <span>
          See <Link href="https://nypl.na2.iiivega.com/">this page</Link> for
          eBooks and eAudiobooks {verb} by you
        </span>
      </Box>
      <Table
        className={styles.itemsTable}
        showRowDividers={true}
        columnHeadersBackgroundColor={"ui.gray.x-light-cool"}
        columnHeaders={headers}
        tableData={data}
      />
    </>
  )
}

export default ItemsTab
