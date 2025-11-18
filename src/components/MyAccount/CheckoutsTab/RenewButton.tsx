import { type Dispatch, useContext, useEffect, useState } from "react"
import {
  useModal,
  Box,
  Icon,
  Button,
  Text,
  ProgressIndicator,
} from "@nypl/design-system-react-components"
import type { Checkout, Patron } from "../../../types/myAccountTypes"
import { BASE_URL } from "../../../config/constants"
import styles from "../../../../styles/components/MyAccount.module.scss"
import { PatronDataContext } from "../../../context/PatronDataContext"
import Link from "../../Link/Link"

const RenewButton = ({
  checkout,
  patron,
  isCheckoutRenewing,
  setCheckoutToRenew,
}: {
  isCheckoutRenewing: boolean
  setCheckoutToRenew: Dispatch<string>
  checkout: Checkout
  patron: Patron
}) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const { onOpen, onClose, Modal } = useModal()
  const [modalProps, setModalProps] = useState(null)
  const [renewalSuccess, setRenewalSuccess] = useState(null)
  const {
    getMostUpdatedSierraAccountData,
    patronDataLoading,
    setPatronDataLoading,
  } = useContext(PatronDataContext)

  const successModalProps = {
    variant: "default",
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
      onClose()
    },
  }
  const failureModalProps = {
    variant: "default",
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text>
          We were unable to renew this item. Please try again or{" "}
          <Link isExternal href="https://www.nypl.org/get-help/contact-us">
            contact us
          </Link>{" "}
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
      setCheckoutToRenew(null)
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
    setCheckoutToRenew(checkout.id)
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
      await getMostUpdatedSierraAccountData()
      localStorage.setItem(
        `lastDisabledTime-${checkout.id}`,
        new Date().getTime().toString()
      )
      setRenewalSuccess(true)
    } else {
      setRenewalSuccess(false)
      //TO-DO: Log error console.log("error", responseData)
    }
  }
  const showLoadingState = patronDataLoading && isCheckoutRenewing

  useEffect(() => {
    // default state is null. We don't want this code to run on the inital render
    if (renewalSuccess === null) return
    if (renewalSuccess) setModalProps(successModalProps)
    if (renewalSuccess === false) setModalProps(failureModalProps)
    onOpen()
  }, [renewalSuccess])

  return (
    <>
      <Button
        variant="secondary"
        id={`renew-${checkout.id}`}
        onClick={handleClick}
        aria-disabled={isButtonDisabled || showLoadingState}
        aria-label={`Renew ${checkout.title}`}
      >
        {showLoadingState && (
          <ProgressIndicator
            id={"renew-loading"}
            labelText="Renew"
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
