import { Box, Icon, Link, Text } from "@nypl/design-system-react-components"
import styles from "../../../../styles/components/MyAccount.module.scss"

export const successModalProps = {
  type: "default",
  bodyContent: (
    <Box className={styles.modalBody}>
      <Text sx={{ marginLeft: "l" }}>
        Your account settings were successfully updated.
      </Text>
    </Box>
  ),
  closeButtonLabel: "OK",
  headingText: (
    <h5 className={styles.modalHeading}>
      <>
        <Icon
          size="large"
          name="actionCheckCircleFilled"
          color="ui.success.primary"
        />
        <Text sx={{ marginBottom: 0 }}> Update successful </Text>
      </>
    </h5>
  ),
}
export const failureModalProps = {
  type: "default",
  bodyContent: (
    <Box className={styles.modalBody}>
      <Text sx={{ marginLeft: "l", marginRight: "m" }}>
        We were unable to update your account settings. Please try again or{" "}
        <Link href="https://www.nypl.org/get-help/contact-us">contact us</Link>{" "}
        for assistance.
      </Text>
    </Box>
  ),
  closeButtonLabel: "OK",
  headingText: (
    <h5 className={styles.modalHeading}>
      <>
        <Icon size="large" name="errorFilled" color="ui.error.primary" />
        <Text sx={{ marginBottom: 0 }}> Update failed </Text>
      </>
    </h5>
  ),
}
