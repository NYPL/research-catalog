import { Box, Icon, Table } from "@nypl/design-system-react-components"

import ExternalLink from "../Links/ExternalLink/ExternalLink"
import styles from "../../../styles/components/MyAccount.module.scss"
import { appConfig } from "../../config/config"
import type { LegacyRef } from "react"

const ItemsTab = ({
  tabRef,
  headers,
  data,
  userAction,
}: {
  tabRef?: LegacyRef<HTMLDivElement>
  headers: string[]
  data: any[]
  userAction: "requested" | "checked out"
}) => {
  return (
    <Box data-testid="items-tab" tabIndex={-1} ref={tabRef}>
      {data?.length === 0 && (
        <Box className={styles.notification}>
          <span>You currently do not have any items {userAction}.</span>
        </Box>
      )}
      <Box className={styles.notificationWithIcon}>
        <Icon size="medium" name="errorOutline" iconRotation="rotate180" />{" "}
        <span>
          See{" "}
          <ExternalLink href={appConfig.urls.circulatingCatalog}>
            eBooks and eAudiobooks
          </ExternalLink>{" "}
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
        />
      )}
    </Box>
  )
}

export default ItemsTab
