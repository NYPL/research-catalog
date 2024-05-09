import { useEffect, useState } from "react"
import {
  useModal,
  Box,
  Icon,
  Button,
  Text,
  Heading,
} from "@nypl/design-system-react-components"

import ExternalLink from "../../Links/ExternalLink/ExternalLink"
import type { Checkout, Patron } from "../../../types/myAccountTypes"
import { BASE_URL } from "../../../config/constants"
import styles from "../../../../styles/components/MyAccount.module.scss"

const RenewButton = ({
  checkout,
  patron,
}: {
  checkout: Checkout
  patron: Patron
}) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const { onOpen, Modal } = useModal()
  const [modalProps, setModalProps] = useState(null)

  const successModalProps = {
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text sx={{ marginLeft: "l" }}>
          Your item was renewed. It is now due back on {checkout?.dueDate}.
        </Text>
      </Box>
    ),
    closeButtonLabel: "OK",
    headingText: (
      <Box className={styles.modalHeading}>
        <Icon
          size="large"
          name="actionCheckCircleFilled"
          color="ui.success.primary"
        />
        <Text sx={{ marginBottom: 0 }}> Renewal successful </Text>
      </Box>
    ),
  }
  const failureModalProps = {
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text sx={{ marginLeft: "l", marginRight: "m" }}>
          We were unable to renew your item. Please try again or{" "}
          <ExternalLink href="https://www.nypl.org/get-help/contact-us">
            contact us
          </ExternalLink>{" "}
          for assistance.
        </Text>
      </Box>
    ),
    closeButtonLabel: "OK",
    headingText: (
      <Heading className={styles.modalHeading}>
        <>
          <Icon size="large" name="errorFilled" color="ui.error.primary" />
          <Text sx={{ marginBottom: 0 }}> Renewal failed </Text>
        </>
      </Heading>
    ),
  }

  useEffect(() => {
    const lastDisabledTime = localStorage.getItem(
      `lastDisabledTime-${checkout.id}`
    )
    if (lastDisabledTime) {
      const twentyFourHoursAgo = new Date().getTime() - 8640000
      if (parseInt(lastDisabledTime, 10) > twentyFourHoursAgo) {
        setButtonDisabled(true)
      }
    }
  }, [])

  const handleClick = async () => {
    const response = await fetch(
      `${BASE_URL}/api/account/checkouts/renew/${checkout.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patronId: patron.id }),
      }
    )
    const responseData = await response.json()
    if (responseData.message == "Renewed") {
      setButtonDisabled(true)
      setModalProps(successModalProps)
      localStorage.setItem(
        `lastDisabledTime-${checkout.id}`,
        new Date().getTime().toString()
      )
    } else {
      setModalProps(failureModalProps)
      //TO-DO: Log error console.log("error", responseData)
    }
    onOpen()
  }

  return (
    <>
      <Button
        sx={{
          width: "100%",
        }}
        buttonType="secondary"
        id={`renew-${checkout.id}`}
        onClick={handleClick}
        isDisabled={isButtonDisabled}
        aria-disabled={isButtonDisabled}
      >
        Renew
      </Button>
      <Modal {...modalProps} />
    </>
  )
}

export default RenewButton
