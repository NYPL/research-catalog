import { createRef, useEffect, useState } from "react"
import type { Hold, Patron } from "../../../types/myAccountTypes"
import {
  Box,
  Button,
  Heading,
  Icon,
  useModal,
  Text,
} from "@nypl/design-system-react-components"
import styles from "../../../../styles/components/MyAccount.module.scss"

const FreezeButton = ({ hold, patron }: { hold: Hold; patron: Patron }) => {
  const [frozen, setFrozen] = useState(hold.frozen)
  const [isDisabled, setIsDisabled] = useState(null)
  const buttonRef = createRef<HTMLButtonElement>()
  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()
  const modalProps = {
    type: "default",
    bodyContent: (
      <Box className={styles.modalBody}>
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
          <Text sx={{ marginBottom: 0 }}> Freezing this hold failed </Text>
        </>
      </Heading>
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
    const response = await fetch(
      `/research/research-catalog/api/account/holds/update/${hold.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patronId: patron.id,
          freeze: !frozen,
          pickupLocation: hold.pickupLocation.code,
        }),
      }
    )
    if (response.status !== 200) {
      openModal()
    } else {
      setFrozen((frozen) => !frozen)
      setIsDisabled(false)
    }
  }
  const buttonLabel = frozen ? "Unfreeze" : "Freeze"

  return (
    <>
      <Button
        aria-label={`${buttonLabel} ${hold.title}`}
        buttonType="secondary"
        id={`freeze-${hold.id}`}
        onClick={handleFreezeClick}
        isDisabled={isDisabled}
        width="100%"
        ref={buttonRef}
      >
        {buttonLabel}
      </Button>
      <Modal {...modalProps} />
    </>
  )
}

export default FreezeButton
