// @ts-nocheck
// Modal onClose
import { useState } from "react"
import type { Hold, Patron } from "../../../types/accountTypes"
import {
  useModal,
  Box,
  Icon,
  Button,
  Text,
  Heading,
} from "@nypl/design-system-react-components"
import { BASE_URL } from "../../../config/constants"
import styles from "../../../../styles/components/MyAccount.module.scss"

const CancelButton = ({
  handleHoldsState,
  hold,
  patron,
}: {
  handleHoldsState: (hold: Hold) => void
  hold: Hold
  patron: Patron
}) => {
  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()

  const confirmModalProps = {
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text sx={{ marginLeft: "l", marginRight: "m" }}>
          Your request for <span style={{ fontWeight: 510 }}>{hold.title}</span>{" "}
          has been canceled.
        </Text>
      </Box>
    ),
    closeButtonLabel: "OK",
    headingText: (
      <Heading className={styles.modalHeading}>
        <>
          <Icon size="large" name="errorFilled" color="ui.error.primary" />
          <Text sx={{ marginBottom: "0px" }}> Request cancelled </Text>
        </>
      </Heading>
    ),
    // Close modal, remove hold from currentHolds so it disappears immediately.
    onClose: async () => {
      closeModal()
      handleHoldsState(hold)
    },
  }

  const checkModalProps = {
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text>
          Are you sure that you want to cancel your request for{" "}
          <span style={{ fontWeight: 510 }}>{hold.title}</span>?
          <br /> <br /> This item will no longer be available for pickup once
          you cancel this request.
        </Text>
      </Box>
    ),
    closeButtonLabel: "Yes, cancel",
    headingText: (
      <Box className={styles.modalHeading}>
        <Text sx={{ marginBottom: "0px" }}> Cancel request?</Text>
      </Box>
    ),
    onClose: async (e) => {
      if (e) {
        const response = await fetch(
          `${BASE_URL}/api/account/holds/cancel/${hold.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ patronId: patron.id }),
          }
        )
        const responseData = await response.json()
        if (responseData == "Cancelled") {
          // Open next modal to confirm request has been cancelled.
          setModalProps(confirmModalProps)
        }
      } else {
        closeModal()
      }
    },
  }
  const [modalProps, setModalProps] = useState(checkModalProps)

  return (
    <>
      <Button
        width="100%"
        buttonType="secondary"
        id={`cancel-${hold.id}`}
        onClick={() => {
          openModal()
        }}
      >
        Cancel {!hold.canFreeze && "request"}
      </Button>
      <Modal {...modalProps} />
    </>
  )
}

export default CancelButton
