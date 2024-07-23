import { type Dispatch, useContext, useEffect, useState } from "react"
import {
  useModal,
  Box,
  Icon,
  Button,
  Text,
  ProgressIndicator,
} from "@nypl/design-system-react-components"

import ExternalLink from "../../Links/ExternalLink/ExternalLink"
import type { Checkout, Patron } from "../../../types/myAccountTypes"
import { BASE_URL } from "../../../config/constants"
import styles from "../../../../styles/components/MyAccount.module.scss"
import { PatronDataContext } from "../../../context/PatronDataContext"

const RenewButton = ({
  checkout,
  patron,
  renewingLoading,
  setCheckoutRenewing,
}: {
  renewingLoading: boolean
  setCheckoutRenewing: Dispatch<string>
  checkout: Checkout
  patron: Patron
}) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const { onOpen, onClose, Modal } = useModal()
  const [modalProps, setModalProps] = useState(null)
  const {
    getMostUpdatedSierraAccountData,
    patronDataLoading,
    setPatronDataLoading,
  } = useContext(PatronDataContext)

  const successModalProps = {
    type: "default",
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text>
          This item has been renewed. It is now due back on {checkout?.dueDate}.
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
          Renewal successful
        </>
      </h5>
    ),
    onClose: async () => {
      getMostUpdatedSierraAccountData()
      onClose()
    },
  }
  const failureModalProps = {
    type: "default",
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text>
          We were unable to renew this item. Please try again or{" "}
          <ExternalLink href="https://www.nypl.org/get-help/contact-us">
            contact us
          </ExternalLink>{" "}
          for assistance.
        </Text>
      </Box>
    ),
    closeButtonLabel: "OK",
    headingText: (
      <h5 className={styles.modalHeading}>
        <>
          <Icon size="large" name="errorFilled" color="ui.error.primary" />
          Renewal failed
        </>
      </h5>
    ),
    onClose: () => {
      setCheckoutRenewing(null)
      onClose()
    },
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
    setCheckoutRenewing(checkout.id)
    setPatronDataLoading(true)
    const response = await fetch(
      `${BASE_URL}/api/account/checkouts/renew/${checkout.id}`,
      {
        method: "POST",
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
  const showLoadingState = patronDataLoading && renewingLoading

  return (
    <>
      <Button
        sx={{
          width: "100%",
        }}
        buttonType="secondary"
        id={`renew-${checkout.id}`}
        onClick={handleClick}
        aria-disabled={isButtonDisabled || showLoadingState}
        aria-label={`Renew ${checkout.title}`}
      >
        {showLoadingState && (
          <ProgressIndicator
            id={"renew-loading"}
            labelText="Loading"
            showLabel={false}
            size="small"
            indicatorType="circular"
            mr="xs"
            isIndeterminate
          />
        )}
        {showLoadingState ? "Loading" : "Renew"}
      </Button>
      <Modal {...modalProps} />
    </>
  )
}

export default RenewButton
