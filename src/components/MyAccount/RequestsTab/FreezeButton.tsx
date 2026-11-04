import { createRef, useEffect, useRef, useState } from "react"
import type { Hold, Patron } from "../../../types/myAccountTypes"
import {
  Box,
  Button,
  Icon,
  useModal,
  Text,
  ProgressIndicator,
} from "@nypl/design-system-react-components"
import styles from "../../../../styles/components/MyAccount.module.scss"

const FreezeButton = ({ hold, patron }: { hold: Hold; patron: Patron }) => {
  const [frozen, setFrozen] = useState(hold.frozen)
  const [isLoading, setIsLoading] = useState(false)
  // Unfreezing a frozen hold is always allowed, hold.canFreeze only restricts freezing.
  // Holds that have status confirmed or ready for pickup cannot be frozen.
  const isDisabled =
    isLoading ||
    (!frozen && !hold.canFreeze) ||
    hold.status !== "REQUEST PENDING"
  const [modalProps, setModalProps] = useState(null)
  const buttonRef = createRef<HTMLButtonElement>()
  const wasLoadingRef = useRef(false)
  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()
  const failureModalProps = {
    variant: "default",
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text>
          We were unable to freeze your hold on this item. Please try again or
          contact us for assistance.
        </Text>
      </Box>
    ),
    closeButtonLabel: "OK",
    headingText: (
      <h5 className={styles.modalHeading}>
        <>
          <Icon size="large" name="errorFilled" color="ui.error.primary" />
          Hold {frozen ? "unfreeze" : "freeze"} failed
        </>
      </h5>
    ),
    onClose: () => {
      closeModal()
      setIsLoading(false)
    },
  }
  const successModalProps = {
    variant: "default",
    closeButtonLabel: "OK",
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text>
          {`Your hold on this item has been ${
            frozen
              ? "unfrozen."
              : "frozen. You will continue to advance in the queue but your \
              request will not be filled until you unfreeze your hold."
          }`}
        </Text>
      </Box>
    ),
    headingText: (
      <h5 className={styles.modalHeading}>
        <>
          <Icon
            size="large"
            name="actionCheckCircleFilled"
            color="ui.success.primary"
          />
          Hold {frozen ? "unfreeze" : "freeze"} successful
        </>
      </h5>
    ),
    onClose: () => {
      closeModal()
      setIsLoading(false)
    },
  }

  useEffect(() => {
    // Only refocus the button after a loading request finishes
    if (wasLoadingRef.current && !isLoading) {
      buttonRef.current?.focus()
    }
    wasLoadingRef.current = isLoading
  }, [isLoading, buttonRef])

  const handleFreezeClick = async () => {
    // Disabling button while request happens.
    setIsLoading(true)
    const body = JSON.stringify({
      patronId: patron.id,
      freeze: !frozen,
      pickupLocation: hold.pickupLocation.code,
      itemId: hold.itemId,
    })
    const response = await fetch(
      `/research/research-catalog/api/account/holds/update/${hold.id}`,
      {
        method: "PUT",
        body,
      }
    )
    if (response.status !== 200) {
      setModalProps(failureModalProps)
      openModal()
    } else {
      setModalProps(successModalProps)
      openModal()
      setFrozen((frozen) => !frozen)
      setIsLoading(false)
    }
  }
  const buttonLabel = isLoading ? "Loading" : frozen ? "Unfreeze" : "Freeze"

  return (
    <>
      <Button
        aria-label={`${buttonLabel} ${hold.title}`}
        variant="secondary"
        id={`freeze-${hold.id}`}
        onClick={handleFreezeClick}
        isDisabled={isDisabled}
        width="100%"
        ref={buttonRef}
      >
        {" "}
        {isLoading && (
          <ProgressIndicator
            id={"freeze-loading"}
            labelText="Freeze"
            showLabel={false}
            size="small"
            indicatorType="circular"
            mr="xs"
            isIndeterminate
          />
        )}
        {buttonLabel}
      </Button>
      <Modal {...modalProps} />
    </>
  )
}

export default FreezeButton
