import { createRef, useEffect, useState } from "react"
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
  const [isDisabled, setIsDisabled] = useState<boolean | null>(null)
  const [modalProps, setModalProps] = useState(null)
  const buttonRef = createRef<HTMLButtonElement>()
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
      setIsDisabled(false)
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
      setIsDisabled(false)
    },
  }

  useEffect(() => {
    if (isDisabled === false) {
      buttonRef.current?.focus()
    }
  }, [isDisabled, buttonRef])

  const handleFreezeClick = async () => {
    // Disabling button while request happens.
    setIsDisabled(true)
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
      setIsDisabled(false)
    }
  }
  const buttonLabel = isDisabled ? "Loading" : frozen ? "Unfreeze" : "Freeze"

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
        {isDisabled && (
          <ProgressIndicator
            id={"freeze-loading"}
            labelText="Renew"
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
