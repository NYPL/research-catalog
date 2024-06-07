import {
  Form,
  List,
  Spacer,
  useModal,
  SkeletonLoader,
  type TextInputRefType,
} from "@nypl/design-system-react-components"
import { useEffect, useRef, useState } from "react"
import type { Patron } from "../../../types/myAccountTypes"
import styles from "../../../../styles/components/MyAccount.module.scss"
import AccountSettingsButtons from "./AccountSettingsButtons"
import {
  AccountSettingsForm,
  AccountSettingsDisplay,
} from "./AccountSettingsDisplayOptions"
import {
  parseAccountSettingsPayload,
  buildUpdatedPatronDisplayData,
} from "./AccountSettingsUtils"
import {
  successModalProps,
  failureModalProps,
} from "./SuccessAndFailureModalProps"

const AccountSettingsTab = ({ settingsData }: { settingsData: Patron }) => {
  const [currentlyEditing, setCurrentlyEditing] = useState(false)
  const [mostRecentPatronData, setMostRecentPatronData] = useState(settingsData)
  const [modalProps, setModalProps] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()

  const [isFormValid, setIsFormValid] = useState(true)

  const editButtonRef = useRef<HTMLButtonElement>()
  const firstInputRef = useRef<TextInputRefType>()

  const listElements = currentlyEditing ? (
    <AccountSettingsForm
      firstInputRef={firstInputRef}
      patron={mostRecentPatronData}
      setIsFormValid={setIsFormValid}
    />
  ) : (
    <AccountSettingsDisplay patron={mostRecentPatronData} />
  )
  useEffect(() => {
    if (currentlyEditing) {
      firstInputRef.current?.focus()
    } else editButtonRef.current?.focus()
  }, [currentlyEditing])

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
      setMostRecentPatronData((prevData) => {
        return buildUpdatedPatronDisplayData(
          prevData,
          payload,
          e.target.homeLibrary?.value
        )
      })
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
      {modalProps && <Modal {...{ ...modalProps, onClose: closeModal }} />}
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
          editButtonRef={editButtonRef}
          currentlyEditing={currentlyEditing}
          setCurrentlyEditing={setCurrentlyEditing}
          formValid={isFormValid}
        />
      </Form>
    </>
  )
}

export default AccountSettingsTab
