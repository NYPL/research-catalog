import { Text, Box, Icon, Table } from "@nypl/design-system-react-components"
import styles from "../../../styles/components/MyAccount.module.scss"
import { appConfig } from "../../config/config"
import type { RefObject } from "react"
import RCLink from "../Links/RCLink/RCLink"

const ItemsTab = ({
  tabRef,
  headers,
  data,
  userAction,
  tableStyling,
}: {
  tabRef?: RefObject<HTMLDivElement>
  headers: string[]
  data: any[]
  userAction: "requested" | "checked out"
  tableStyling: any[]
}) => {
  return (
    <Box data-testid="items-tab" tabIndex={-1} ref={tabRef}>
      {data?.length === 0 && (
        <Box className={styles.notification}>
          <Text>You currently do not have any items {userAction}.</Text>
        </Box>
      )}
      <Box className={styles.notificationWithIcon}>
        <Icon size="medium" name="errorOutline" iconRotation="rotate180" />{" "}
        <span>
          See{" "}
          <RCLink isExternal href={appConfig.urls.circulatingCatalog}>
            eBooks and eAudiobooks
          </RCLink>{" "}
          {userAction} by you
        </span>
      </Box>
      {data?.length > 0 && (
        <Table
          className={styles.itemsTable}
          showRowDividers={true}
          columnHeadersBackgroundColor={"ui.gray.x-light-cool"}
          columnHeaders={headers}
          tableData={data}
          isScrollable
          columnStyles={tableStyling}
        />
      )}
    </Box>
  )
}

export default ItemsTab
