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
import {
  successModalProps,
  failureModalProps,
} from "./AccountSettingsFeedbackModalProps"
import {
  parseAccountSettingsPayload,
  buildUpdatedPatronDisplayData,
} from "./AccountSettingsUtils"

const AccountSettingsTab = ({ settingsData }: { settingsData: Patron }) => {
  const [currentlyEditing, setCurrentlyEditing] = useState(false)
  const [mostRecentPatronData, setMostRecentPatronData] = useState(settingsData)
  const [modalProps, setModalProps] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const listElements = currentlyEditing ? (
    <AccountSettingsForm patron={mostRecentPatronData} />
  ) : (
    <AccountSettingsDisplay patron={mostRecentPatronData} />
  )
  const { onOpen: openModal, Modal } = useModal()

  const submitAccountSettings = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const payload = parseAccountSettingsPayload(e.target, mostRecentPatronData)
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
      setMostRecentPatronData((prevData) =>
        buildUpdatedPatronDisplayData(prevData, payload)
      )
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
        />
      </Form>
    </>
  )
}

export default AccountSettingsTab
