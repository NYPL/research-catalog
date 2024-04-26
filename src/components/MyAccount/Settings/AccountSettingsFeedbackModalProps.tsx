import { Box, Icon, Heading, Text } from "@nypl/design-system-react-components"
import Link from "next/link"
import styles from "../../../../styles/components/MyAccount.module.scss"

export const successModalProps = {
  bodyContent: (
    <Box className={styles.modalBody}>
      <Text sx={{ marginLeft: "l" }}>
        Your account settings were successfully updated.
      </Text>
    </Box>
  ),
  closeButtonLabel: "OK",
  headingText: (
    <Box className={styles.modalHeading}>
      <Icon
        size="large"
        name="actionCheckCircleFilled"
        color="ui.success.primary"
      />
      <Text sx={{ marginBottom: 0 }}> Update successful </Text>
    </Box>
  ),
}
export const failureModalProps = {
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
    <Heading className={styles.modalHeading}>
      <>
        <Icon size="large" name="errorFilled" color="ui.error.primary" />
        <Text sx={{ marginBottom: 0 }}> Update failed </Text>
      </>
    </Heading>
  ),
}
