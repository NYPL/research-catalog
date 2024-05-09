import {
  Box,
  Form,
  List,
  Spacer,
  useModal,
  useNYPLBreakpoints,
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
import PasswordModal from "./PasswordModal"

const AccountSettingsTab = ({ settingsData }: { settingsData: Patron }) => {
  const [currentlyEditing, setCurrentlyEditing] = useState(false)
  const [mostRecentPatronData, setMostRecentPatronData] = useState(settingsData)
  const [modalProps, setModalProps] = useState(null)
  const { isLargerThanLarge } = useNYPLBreakpoints()
  const listElements = currentlyEditing ? (
    <AccountSettingsForm patron={mostRecentPatronData} />
  ) : (
    <AccountSettingsDisplay patron={mostRecentPatronData} />
  )
  const { onOpen: openModal, Modal } = useModal()

  const submitAccountSettings = async (e) => {
    e.preventDefault()
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
        {isLargerThanLarge && <Spacer />}
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
