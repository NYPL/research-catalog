import { getTitle } from "../../../utils/myAccountUtils"
import {
  Box,
  Button,
  Icon,
  Link,
  Text,
  useModal,
} from "@nypl/design-system-react-components"
import type { Checkout, Patron } from "../../../types/accountTypes"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../../config/constants"
import styles from "../../../styles/components/MyAccount.module.scss"
import ItemsTab from "../ItemsTab"

const CheckoutsTab = ({
  checkouts,
  patron,
}: {
  checkouts: Checkout[]
  patron: Patron
}) => {
  const checkoutsHeaders = [
    "Title",
    "Barcode",
    "Call number",
    "Due back by",
    "Manage checkout",
  ]
  const checkoutsData = checkouts.map((checkout) => [
    getTitle(checkout),
    checkout.barcode,
    checkout.callNumber,
    checkout.dueDate,
    checkout.isResearch ? null : RenewButton(checkout, patron),
  ])

  function RenewButton(checkout, patron) {
    const [isButtonDisabled, setButtonDisabled] = useState(false)
    const { onOpen, Modal } = useModal()
    const [modalProps, setModalProps] = useState(null)
    const successModalProps = {
      bodyContent: (
        <Box className={styles.modalBody}>
          <Text sx={{ marginLeft: "l" }}>
            Your item was renewed. It is now due back on {checkout.date}.
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
          <Text sx={{ marginBottom: "0px" }}> Renewal successful </Text>
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
        <Box className={styles.modalHeading}>
          <Icon size="large" name="errorFilled" color="ui.error.primary" />
          <Text sx={{ marginBottom: "0px" }}> Renewal failed </Text>
        </Box>
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
        onOpen()
        localStorage.setItem(
          `lastDisabledTime-${checkout.id}`,
          new Date().getTime().toString()
        )
      } else {
        setModalProps(failureModalProps)
        onOpen()
        //TO-DO: Log error console.log("error", responseData)
      }
    }

    return (
      <>
        <Button
          sx={{
            width: "-webkit-fill-available",
          }}
          buttonType="secondary"
          id={`renew-${checkout.id}`}
          onClick={handleClick}
          isDisabled={isButtonDisabled}
        >
          Renew
        </Button>
        <Modal {...modalProps} />
      </>
    )
  }

  return (
    <ItemsTab
      headers={checkoutsHeaders}
      data={checkoutsData}
      verb={"checked out"}
    />
  )
}

export default CheckoutsTab
