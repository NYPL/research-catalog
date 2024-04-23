import { Icon, Notification, Text } from "@nypl/design-system-react-components"

import ExternalLink from "../Links/ExternalLink/ExternalLink"
import styles from "../../../styles/components/MyAccount.module.scss"
import { appConfig } from "../../config/config"

const FeesBanner = () => {
  return (
    <Notification
      notificationType="warning"
      showIcon={false}
      className={styles.feesNotification}
      notificationContent={
        <>
          <Icon size="medium" name="errorOutline" iconRotation="rotate180" />{" "}
          <Text>
            You have outstanding fees. Borrowing privileges will be suspended
            for cardholders with replacement fees totaling $100 or more. <br />{" "}
            Fees can be paid at any New York Public Library branch in cash, U.S.
            Postal money order, personal check, or{" "}
            <ExternalLink
              href={`${appConfig.urls.circulatingCatalog}?openAccount=fines-and-fees`}
            >
              {" "}
              online through the Library website
            </ExternalLink>
            .
          </Text>
        </>
      }
    />
  )
}

export default FeesBanner
