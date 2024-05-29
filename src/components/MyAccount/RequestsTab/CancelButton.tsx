import { useState } from "react"
import type { Hold, Patron } from "../../../types/myAccountTypes"
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
import type {
  BaseModalProps,
  ConfirmationModalProps,
  DefaultModalProps,
} from "@nypl/design-system-react-components"

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

  function successModalProps(hold) {
    return {
      type: "default",
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
            <Icon
              size="large"
              name="actionCheckCircleFilled"
              color="ui.success.primary"
            />
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

  function failureModalProps(hold) {
    return {
      type: "default",
      bodyContent: (
        <Box className={styles.modalBody}>
          <Text sx={{ marginLeft: "l", marginRight: "m" }}>
            Your request for{" "}
            <span style={{ fontWeight: "var(--nypl-fontWeights-medium)" }}>
              {hold.title}
            </span>{" "}
            has not been canceled. Please try again.
          </Text>
        </Box>
      ),
      closeButtonLabel: "OK",
      headingText: (
        <Heading className={styles.modalHeading}>
          <>
            <Icon size="large" name="errorFilled" color="ui.error.primary" />
            <Text sx={{ marginBottom: 0 }}>Failed to cancel request </Text>
          </>
        </Heading>
      ),
      onClose: closeModal(),
    }
  }

  function checkModalProps(hold) {
    return {
      type: "confirmation",
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
      closeButtonLabel: "No, keep request",
      confirmButtonLabel: "Yes, cancel request",
      headingText: (
        <Heading className={styles.modalHeading}>
          <Text sx={{ marginBottom: 0 }}>Cancel request?</Text>
        </Heading>
      ),
      onConfirm: async () => {
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
          setModalProps(successModalProps(hold) as DefaultModalProps)
        } else {
          setModalProps(failureModalProps(hold) as DefaultModalProps)
        }
      },
      onCancel: () => {
        closeModal()
      },
    }
  }
  const [modalProps, setModalProps] = useState<BaseModalProps>(
    checkModalProps(hold) as ConfirmationModalProps
  )
  const buttonLabel = `Cancel${!hold.canFreeze ? " request" : ""}`

  return (
    <>
      <Button
        aria-label={`${buttonLabel} ${hold.title}`}
        width="100%"
        buttonType="secondary"
        id={`cancel-${hold.id}`}
        onClick={() => {
          setModalProps(checkModalProps(hold) as ConfirmationModalProps)
          openModal()
        }}
      >
        {buttonLabel}
      </Button>
      <Modal {...modalProps} />
    </>
  )
}

export default CancelButton
