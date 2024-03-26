import {
  Icon,
  Link,
  Notification,
  Text,
} from "@nypl/design-system-react-components"
import styles from "../../../styles/components/MyAccount.module.scss"

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
            <Link href="https://nypl.na2.iiivega.com//?openAccount=fines-and-fees">
              {" "}
              online through the Library website
            </Link>
            .
          </Text>
        </>
      }
    />
  )
}

export default FeesBanner
