import {
  Box,
  Form,
  List,
  Spacer,
  useModal,
} from "@nypl/design-system-react-components"
import { useState } from "react"
import type { Patron } from "../../../types/myAccountTypes"
import styles from "../../../../styles/components/MyAccount.module.scss"
import AccountSettingsButtons from "./AccountSettingsButtons"
import {
  AccountSettingsForm,
  AccountSettingsDisplay,
} from "./AccountSettingsDisplayOptions"
import {
  successModalProps,
  failureModalProps,
} from "./AccountSettingsFeedbackModalProps"
import { parsePayload, updatePatronData } from "./AccountSettingsUtils"
import { BASE_URL } from "../../../config/constants"
import PasswordModal from "./PasswordModal"

const AccountSettingsTab = ({ settingsData }: { settingsData: Patron }) => {
  const [currentlyEditing, setCurrentlyEditing] = useState(false)
  const [mostRecentPatronData, setMostRecentPatronData] = useState(settingsData)
  const [modalProps, setModalProps] = useState(null)
  const listElements = currentlyEditing ? (
    <AccountSettingsForm patron={mostRecentPatronData} />
  ) : (
    <AccountSettingsDisplay patron={mostRecentPatronData} />
  )
  const { onOpen: openModal, Modal } = useModal()

  const submitAccountSettings = async (e) => {
    e.preventDefault()
    const payload = parsePayload(e.target, mostRecentPatronData)
    try {
      const response = await fetch(
        `${BASE_URL}/api/account/settings/${mostRecentPatronData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )
      const responseData = await response.json()
      if (response.ok) {
        setMostRecentPatronData((prevData) =>
          updatePatronData(prevData, payload)
        )
        setCurrentlyEditing(false)
        setModalProps(successModalProps)
        openModal()
      } else {
        alert(`error: ${responseData}`)
        setModalProps(failureModalProps)
        openModal()
      }
    } catch (error) {
      alert("fetching error")
    }
  }

  return (
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
        <Spacer />
        <AccountSettingsButtons
          currentlyEditing={currentlyEditing}
          setCurrentlyEditing={setCurrentlyEditing}
        />
      </Form>
      <PasswordModal patron={settingsData} />
    </>
  )
}

export default AccountSettingsTab
