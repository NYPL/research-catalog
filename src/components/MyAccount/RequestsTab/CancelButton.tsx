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
  removeHold,
  hold,
  patron,
}: {
  removeHold: (hold: Hold) => void
  hold: Hold
  patron: Patron
}) => {
  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()

  function confirmModalProps(hold) {
    return {
      bodyContent: (
        <Box className={styles.modalBody}>
          <Text sx={{ marginLeft: "l", marginRight: "m" }}>
            Your request for{" "}
            <span style={{ fontWeight: "var(--nypl-fontWeights-medium)" }}>
              {hold.title}
            </span>{" "}
            has been canceled.
          </Text>
        </Box>
      ),
      closeButtonLabel: "OK",
      headingText: (
        <Heading className={styles.modalHeading}>
          <>
            <Icon size="large" name="errorFilled" color="ui.error.primary" />
            <Text sx={{ marginBottom: 0 }}>Request canceled </Text>
          </>
        </Heading>
      ),
      // Close modal, remove hold from currentHolds so it disappears immediately.
      onClose: async () => {
        closeModal()
        removeHold(hold)
      },
    }
  }

  function checkModalProps(hold) {
    return {
      bodyContent: (
        <Box className={styles.modalBody}>
          <Text>
            Are you sure that you want to cancel your request for{" "}
            <span style={{ fontWeight: "var(--nypl-fontWeights-medium)" }}>
              {hold.title}
            </span>
            ?
          </Text>
          <Text>
            This item will no longer be available for pickup once you cancel
            this request.
          </Text>
        </Box>
      ),
      closeButtonLabel: "Yes, cancel",
      headingText: (
        <Box className={styles.modalHeading}>
          <Text sx={{ marginBottom: 0 }}>Cancel request?</Text>
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
          if (response.status == 200) {
            // Open next modal to confirm request has been canceled.
            setModalProps(confirmModalProps(hold))
          }
        } else {
          closeModal()
        }
      },
    }
  }
  const [modalProps, setModalProps] = useState(checkModalProps(hold))

  return (
    <>
      <Button
        width="100%"
        buttonType="secondary"
        id={`cancel-${hold.id}`}
        onClick={() => {
          setModalProps(checkModalProps(hold))
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
