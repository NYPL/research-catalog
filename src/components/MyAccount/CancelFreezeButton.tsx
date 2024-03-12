import { useState } from "react"
import type { Hold, Patron } from "../../types/accountTypes"
import {
  useModal,
  Box,
  Icon,
  Button,
  Text,
  Heading,
} from "@nypl/design-system-react-components"
import { BASE_URL } from "../../config/constants"
import styles from "../../../styles/components/MyAccount.module.scss"

const CancelFreezeButton = ({
  handleState,
  hold,
  patron,
}: {
  handleState: (hold: Hold) => void
  hold: Hold
  patron: Patron
}) => {
  const { onOpen, onClose, Modal } = useModal()

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
          <Text sx={{ marginBottom: "0px" }}> Request canceled </Text>
        </>
      </Heading>
    ),
    onClose: async () => {
      onClose()
      handleState(hold)
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
        <Button
          id="keep-button"
          buttonType="secondary"
          sx={{ width: "fit-content" }}
          onClick={() => {
            onClose()
          }}
        >
          No, keep request
        </Button>
      </Box>
    ),
    closeButtonLabel: "Yes, cancel",
    headingText: (
      <Box className={styles.modalHeading}>
        <Text sx={{ marginBottom: "0px" }}> Cancel request?</Text>
      </Box>
    ),
    onClose: async () => {
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
        setModalProps(confirmModalProps)
      }
    },
  }
  const [modalProps, setModalProps] = useState(checkModalProps)
  const [frozen, setFrozen] = useState(hold.frozen)
  const [isDisabled, setIsDisabled] = useState(false)

  const handleFreezeClick = async () => {
    setIsDisabled(true)
    if (frozen) {
      await fetch(
        `/research/research-catalog/api/account/holds/update/${hold.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patronId: patron.id,
            freeze: false,
            pickupLocation: hold.pickupLocation.code,
          }),
        }
      )
      setFrozen(false)
    } else {
      await fetch(
        `/research/research-catalog/api/account/holds/update/${hold.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patronId: patron.id,
            freeze: false,
            pickupLocation: hold.pickupLocation.code,
          }),
        }
      )
      setFrozen(true)
    }
    setIsDisabled(false)
  }

  return (
    <>
      <Box sx={{ display: "flex", gap: "xs" }}>
        <Button
          width="100%"
          buttonType="secondary"
          id={`cancel-${hold.id}`}
          onClick={() => {
            onOpen()
          }}
        >
          Cancel {!hold.canFreeze && "request"}
        </Button>
        {hold.canFreeze && (
          <Button
            width="100%"
            buttonType="secondary"
            id={`freeze-${hold.id}`}
            onClick={handleFreezeClick}
            isDisabled={isDisabled}
          >
            {frozen ? "Unfreeze" : "Freeze"}
          </Button>
        )}
      </Box>
      <Modal {...modalProps} />
    </>
  )
}

export default CancelFreezeButton
