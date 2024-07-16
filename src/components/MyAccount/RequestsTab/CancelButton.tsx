import { type RefObject, useContext, useState } from "react"
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
  tabRef,
  hold,
  patron,
}: {
  tabRef: RefObject<HTMLButtonElement>
  hold: Hold
  patron: Patron
}) => {
  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()
  const { getMostUpdatedSierraAccountData } = useContext(PatronDataContext)

  function successModalProps(hold) {
    return {
      type: "default",
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
      onClose: () => {
        // This fetch for updated patron data removes the hold entirely,
        // thereby closing the modal.
        closeModal()
        getMostUpdatedSierraAccountData()
        // if (tabRef?.current) {
        //   // console.log("current", tabRef.current)
        //   tabRef.current.focus()
        // }
      },
    }
  }

  function failureModalProps(hold) {
    return {
      type: "default",
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
      onClose: closeModal(),
    }
  }

  function checkModalProps(hold) {
    return {
      type: "confirmation",
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
            This item will no longer be available for pickup once you cancel
            this request.
          </Text>
        </Box>
      ),
      closeButtonLabel: "No, keep request",
      confirmButtonLabel: "Yes, cancel request",
      headingText: <h5 className={styles["noIconHeading"]}>Cancel request?</h5>,
      onConfirm: async () => {
        setModalProps({
          ...checkModalProps(hold),
          bodyContent: <SkeletonLoader showImage={false} />,
        } as ConfirmationModalProps)
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
