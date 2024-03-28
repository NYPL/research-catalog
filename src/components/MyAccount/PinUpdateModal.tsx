import { useEffect, useState } from "react"
import type { Patron } from "../../types/myAccountTypes"
import {
  useModal,
  Box,
  Icon,
  Button,
  Text,
  Heading,
} from "@nypl/design-system-react-components"
import Link from "next/link"
import styles from "../../../styles/components/MyAccount.module.scss"

const PinUpdateModal = ({ patron }: { patron: Patron }) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const { onOpen, Modal } = useModal()
  const [modalProps, setModalProps] = useState(null)

  const successModalProps = {
    bodyContent: <Box className={styles.modalBody}></Box>,
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
          <Link href="https://www.nypl.org/get-help/contact-us">
            contact us
          </Link>{" "}
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

  const handleClick = async () => {
    // const response = await fetch(
    //   `${BASE_URL}/api/account/checkouts/renew/${checkout.id}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ patronId: patron.id }),
    //   }
    // )
    // const responseData = await response.json()
    // if (responseData.message == "Renewed") {
    //   setButtonDisabled(true)
    //   setModalProps(successModalProps)
    //   localStorage.setItem(
    //     `lastDisabledTime-${checkout.id}`,
    //     new Date().getTime().toString()
    //   )
    // } else {
    //   setModalProps(failureModalProps)
    //   //TO-DO: Log error console.log("error", responseData)
    // }
    onOpen()
  }

  return (
    <>
      <Link onClick={handleClick} href={""}>
        Change pin/password
      </Link>
      <Modal {...modalProps} />
    </>
  )
}

export default PinUpdateModal
