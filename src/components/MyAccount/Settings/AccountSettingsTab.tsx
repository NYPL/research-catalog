import {
  Form,
  List,
  Spacer,
  useModal,
  SkeletonLoader,
} from "@nypl/design-system-react-components"
import { useState } from "react"
import type { Patron } from "../../../types/myAccountTypes"
import styles from "../../../../styles/components/MyAccount.module.scss"
import AccountSettingsButtons from "./AccountSettingsButtons"
import {
  AccountSettingsForm,
  AccountSettingsDisplay,
} from "./AccountSettingsDisplayOptions"
import { parsePayload, updatePatronData } from "./AccountSettingsUtils"
import { Box, Icon, Heading, Text } from "@nypl/design-system-react-components"
import Link from "next/link"

const AccountSettingsTab = ({ settingsData }: { settingsData: Patron }) => {
  const [currentlyEditing, setCurrentlyEditing] = useState(false)
  const [mostRecentPatronData, setMostRecentPatronData] = useState(settingsData)
  const [modalProps, setModalProps] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()

  const successModalProps = {
    type: "default",
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text sx={{ marginLeft: "l" }}>
          Your account settings were successfully updated.
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
        <Text sx={{ marginBottom: 0 }}> Update successful </Text>
      </Box>
    ),
    onClose: closeModal,
  }
  const failureModalProps = {
    type: "default",
    bodyContent: (
      <Box className={styles.modalBody}>
        <Text sx={{ marginLeft: "l", marginRight: "m" }}>
          We were unable to update your account settings. Please try again or{" "}
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
          <Text sx={{ marginBottom: 0 }}> Update failed </Text>
        </>
      </Heading>
    ),
    onClose: closeModal,
  }

  const [isFormValid, setIsFormValid] = useState(false)

  const handleValidateForm = (isValid) => {
    setIsFormValid(isValid)
  }

  const listElements = currentlyEditing ? (
    <AccountSettingsForm
      patron={mostRecentPatronData}
      onValidateForm={handleValidateForm}
    />
  ) : (
    <AccountSettingsDisplay patron={mostRecentPatronData} />
  )

  const submitAccountSettings = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    console.log(e.target)
    const payload = parsePayload(e.target, mostRecentPatronData)
    const response = await fetch(
      `/research/research-catalog/api/account/settings/${mostRecentPatronData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
    if (response.status === 200) {
      setMostRecentPatronData((prevData) => updatePatronData(prevData, payload))
      setCurrentlyEditing(false)
      setModalProps(successModalProps)
      openModal()
    } else {
      setModalProps(failureModalProps)
      openModal()
    }
    setIsLoading(false)
  }

  return isLoading ? (
    <SkeletonLoader showImage={false} />
  ) : (
    <>
      {modalProps && <Modal {...modalProps} />}
      <Form
        className={styles.accountSettingsTab}
        id="account-settings-container"
        onSubmit={(e) => submitAccountSettings(e)}
      >
        <List
          sx={{ border: "none", h2: { border: "none" } }}
          className={styles.myAccountList}
          type="dl"
        >
          {listElements}
        </List>
        <Spacer display={{ base: "none", md: "inline-block" }} />
        <AccountSettingsButtons
          currentlyEditing={currentlyEditing}
          setCurrentlyEditing={setCurrentlyEditing}
          formValid={isFormValid}
        />
      </Form>
    </>
  )
}

export default AccountSettingsTab
