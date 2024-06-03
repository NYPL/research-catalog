import { Box, Icon, Heading, Text } from "@nypl/design-system-react-components"
import Link from "next/link"
import styles from "../../../../styles/components/MyAccount.module.scss"

export const successModalProps = {
  type: "default",
  bodyContent: (
    <Box className={styles.modalBody}>
      <Text>Your account settings were successfully updated.</Text>
    </Box>
  ),
  closeButtonLabel: "OK",
  headingText: (
    <Heading className={styles.modalHeading}>
      <Text>
        {" "}
        <Icon
          size="large"
          name="actionCheckCircleFilled"
          color="ui.success.primary"
        />
        Update successful{" "}
      </Text>
    </Heading>
  ),
}
export const failureModalProps = {
  type: "default",
  bodyContent: (
    <Box className={styles.modalBody}>
      <Text>
        We were unable to update your account settings. Please try again or{" "}
        <Link href="https://www.nypl.org/get-help/contact-us">contact us</Link>{" "}
        for assistance.
      </Text>
    </Box>
  ),
  closeButtonLabel: "OK",
  headingText: (
    <Heading className={styles.modalHeading}>
      <Text>
        <Icon size="large" name="errorFilled" color="ui.error.primary" />
        Update failed
      </Text>
    </Heading>
  ),
}
