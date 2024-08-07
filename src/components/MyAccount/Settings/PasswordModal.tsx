import {
  useModal,
  Box,
  Icon,
  Text,
  List,
  Button,
  SkeletonLoader,
} from "@nypl/design-system-react-components"
import { useState } from "react"

import styles from "../../../../styles/components/MyAccount.module.scss"
import PasswordChangeForm from "./PasswordChangeForm"
import type { Patron } from "../../../types/myAccountTypes"

const PasswordModal = ({ patron }: { patron: Patron }) => {
  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()

  const entryModalProps = {
    type: "default",
    bodyContent: (
      <Box className={styles.noIconBody}>
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
        <PasswordChangeForm
          patron={patron}
          updateModal={updateModal}
          onModalSubmit={() => setModalProps(loadingProps)}
        />
      </Box>
    ),
    closeButtonLabel: "Cancel",
    headingText: <h5 className={styles.noIconHeading}>Change PIN/PASSWORD</h5>,
    onClose: () => {
      closeModal()
    },
  }

  const loadingProps = {
    ...entryModalProps,
    bodyContent: <SkeletonLoader showImage={false} />,
    onClose: () => null,
    closeButtonLabel: "Loading",
  }

  const [modalProps, setModalProps] = useState(entryModalProps)

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
    type: "default",
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text>Your PIN/PASSWORD has been changed.</Text>
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
          PIN/PASSWORD change was successful
        </>
      </h5>
    ),
    onClose: async () => {
      closeModal()
      setModalProps(entryModalProps)
    },
  }

  const failureModalProps = (errorMessage) => ({
    type: "default",
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text>We were unable to change your PIN/PASSWORD: {errorMessage}</Text>
        <Text>Please try again.</Text>
      </Box>
    ),
    closeButtonLabel: "OK",
    headingText: (
      <h5 className={styles.modalHeading}>
        <>
          <Icon size="large" name="errorFilled" color="ui.error.primary" />
          PIN/PASSWORD change failed
        </>
      </h5>
    ),
    onClose: async () => {
      closeModal()
      setModalProps(entryModalProps)
    },
  })

  return (
    <>
      <Button
        size="medium"
        pl="0"
        pt="0"
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
