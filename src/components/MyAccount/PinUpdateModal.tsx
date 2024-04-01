import { useState } from "react"
import {
  useModal,
  Box,
  Icon,
  Text,
  Heading,
  List,
} from "@nypl/design-system-react-components"
import type { Patron } from "../../types/myAccountTypes"
import Link from "next/link"
import styles from "../../../styles/components/MyAccount.module.scss"
import PasswordChangeForm from "./PasswordChangeForm"
import { BASE_URL } from "../../config/constants"

const PinUpdateModal = ({ patron }, { patron: Patron }) => {
  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()

  const entryModalProps = {
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text sx={{ fontWeight: "medium" }}>
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
        <PasswordChangeForm patron={patron} setModal={setModal} />
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

  function setModal(state: string) {
    if (state === "success") {
      setModalProps(successModalProps)
    } else {
      setModalProps(failureModalProps)
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
            {" "}
            PIN/PASSWORD change was successful{" "}
          </Text>
        </>
      </Heading>
    ),
  }

  const failureModalProps = {
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text sx={{ marginLeft: "l", marginRight: "m" }}>
          We were unable to change your PIN/PASSWORD. Please try again
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
  }

  const handleClick = () => {
    openModal()
  }

  return (
    <>
      <Link onClick={handleClick} href={""}>
        Change pin/password
      </Link>
      <Modal {...modalProps} />
    </>
  )
}

export default PinUpdateModal
