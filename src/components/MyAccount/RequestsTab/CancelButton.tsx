import { type Dispatch, useContext, useState } from "react"
import type { Hold, Patron } from "../../../types/myAccountTypes"
import {
  useModal,
  Box,
  Icon,
  Button,
  Text,
  SkeletonLoader,
} from "@nypl/design-system-react-components"
import { BASE_URL } from "../../../config/constants"
import styles from "../../../../styles/components/MyAccount.module.scss"

import type {
  BaseModalProps,
  ConfirmationModalProps,
  DefaultModalProps,
} from "@nypl/design-system-react-components"
import { PatronDataContext } from "../../../context/PatronDataContext"

const CancelButton = ({
  setFocusOnRequestTab,
  hold,
  patron,
}: {
  setFocusOnRequestTab: Dispatch<boolean>
  hold: Hold
  patron: Patron
}) => {
  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()
  const { getMostUpdatedSierraAccountData } = useContext(PatronDataContext)

  const successModalProps = {
    variant: "default",
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text>
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
      <h5 className={styles.modalHeading}>
        <>
          <Icon
            size="large"
            name="actionCheckCircleFilled"
            color="ui.success.primary"
          />
          Request canceled
        </>
      </h5>
    ),
    onClose: async () => {
      closeModal()
      getMostUpdatedSierraAccountData()
      setFocusOnRequestTab(true)
    },
  }

  const failureModalProps = {
    variant: "default",
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text>
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
      <h5 className={styles.modalHeading}>
        <>
          <Icon size="large" name="errorFilled" color="ui.error.primary" />
          Failed to cancel request
        </>
      </h5>
    ),
    onClose: closeModal,
  }

  const checkModalProps = {
    variant: "confirmation",
    bodyContent: (
      <Box className={styles.noIconBody}>
        <Text>
          Are you sure that you want to cancel your request for{" "}
          <span style={{ fontWeight: "var(--nypl-fontWeights-medium)" }}>
            {hold.title}
          </span>
          ?
        </Text>
        <Text>
          This item will no longer be available for pickup once you cancel this
          request.
        </Text>
      </Box>
    ),
    closeButtonLabel: "No, keep request",
    confirmButtonLabel: "Yes, cancel request",
    headingText: <h5 className={styles["noIconHeading"]}>Cancel request?</h5>,
    onConfirm: async () => {
      setModalProps({
        variant: "default",
        bodyContent: <SkeletonLoader showImage={false} />,
        onClose: () => null,
        closeButtonLabel: "Loading",
      } as DefaultModalProps)
      const response = await fetch(
        `${BASE_URL}/api/account/holds/cancel/${hold.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patronId: patron.id,
            patronBarcode: patron.barcode,
            itemId: hold.itemId,
          }),
        }
      )
      if (response.status == 200) {
        // Open next modal to confirm request has been canceled.
        setModalProps(successModalProps as DefaultModalProps)
      } else {
        setModalProps(failureModalProps as DefaultModalProps)
      }
    },
    onCancel: closeModal,
  }
  const [modalProps, setModalProps] = useState<BaseModalProps>(
    checkModalProps as ConfirmationModalProps
  )
  const buttonLabel = `Cancel${!hold.canFreeze ? " request" : ""}`

  return (
    <>
      <Button
        aria-label={`${buttonLabel} ${hold.title}`}
        width="100%"
        variant="secondary"
        id={`cancel-${hold.id}`}
        onClick={() => {
          setModalProps(checkModalProps as ConfirmationModalProps)
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
