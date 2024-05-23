import { useState } from "react"
import {
  useModal,
  Box,
  Icon,
  Text,
  Heading,
  List,
  Button,
} from "@nypl/design-system-react-components"
import styles from "../../../../styles/components/MyAccount.module.scss"
import PasswordChangeForm from "./PasswordChangeForm"
import type { Patron } from "../../../types/myAccountTypes"

const PasswordModal = ({ patron }: { patron: Patron }) => {
  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()

  const entryModalProps = {
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text sx={{ fontWeight: "medium", paddingBottom: 0 }}>
          Use a strong PIN/PASSWORD to protect your security and identity.
        </Text>
        <List type="ul">
          <li>
            You have the option of creating a standard PIN (4 characters in
            length) or the more secure option of creating a PASSWORD up to 32
            characters long.
          </li>
          <li>
            You can create a PIN/PASSWORD that includes upper or lower case
            characters (a-z, A-Z), numbers (0-9), and/or special characters
            limited to the following: ~ ! ? @ # $ % ^ & * ( )
          </li>
          <li>
            PINs or PASSWORDS must not contain common patterns, for example: a
            character that is repeated 3 or more times (0001, aaaa, aaaatf54,
            x7gp3333), or four characters repeated two or more times (1212,
            abab, abcabc, ababx7gp, x7gp3434).
          </li>
          <li> PINs and PASSWORDS must NOT contain a period.</li>
        </List>
        <PasswordChangeForm patron={patron} updateModal={updateModal} />
      </Box>
    ),
    closeButtonLabel: "Cancel",
    headingText: (
      <Heading className={styles.modalHeading}>
        <Text sx={{ marginBottom: 0 }}> Change PIN/PASSWORD </Text>
      </Heading>
    ),
  }

  const [modalProps, setModalProps] = useState(entryModalProps)

  const resetModal = async () => {
    closeModal()
    setModalProps(entryModalProps)
  }

  function updateModal(errorMessage?: string) {
    if (errorMessage) {
      errorMessage.startsWith("Invalid parameter")
        ? // Returning a more user-friendly error message.
          setModalProps(failureModalProps("Current PIN/PASSWORD is incorrect."))
        : setModalProps(failureModalProps("New PIN/PASSWORD is invalid."))
    } else {
      setModalProps(successModalProps)
    }
  }

  const successModalProps = {
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text sx={{ marginLeft: "l" }}>Your PIN/PASSWORD was changed.</Text>
      </Box>
    ),
    closeButtonLabel: "OK",
    headingText: (
      <Heading className={styles.modalHeading}>
        <>
          <Icon
            size="large"
            name="actionCheckCircleFilled"
            color="ui.success.primary"
          />
          <Text sx={{ marginBottom: 0 }}>
            PIN/PASSWORD change was successful
          </Text>
        </>
      </Heading>
    ),
    onClose: resetModal,
  }

  const failureModalProps = (errorMessage) => ({
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text sx={{ marginLeft: "l", marginRight: "m" }}>
          We were unable to change your PIN/PASSWORD: {errorMessage}
        </Text>
        <Text sx={{ marginLeft: "l", marginRight: "m" }}>
          Please try again.
        </Text>
      </Box>
    ),
    closeButtonLabel: "OK",
    headingText: (
      <Heading className={styles.modalHeading}>
        <>
          <Icon size="large" name="errorFilled" color="ui.error.primary" />
          <Text sx={{ marginBottom: 0 }}> PIN/PASSWORD change failed </Text>
        </>
      </Heading>
    ),
    onClose: resetModal,
  })

  return (
    <>
      <Button
        size="large"
        id="pin-modal-button"
        buttonType="text"
        onClick={openModal}
      >
        <Icon name="editorMode" align="left" size="small" />
        Change pin/password
      </Button>
      <Modal {...modalProps} />
    </>
  )
}

export default PasswordModal
