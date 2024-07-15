import {
  Form,
  List,
  Spacer,
  useModal,
  SkeletonLoader,
  type TextInputRefType,
} from "@nypl/design-system-react-components"
import { useContext, useEffect, useRef, useState } from "react"
import type { Patron, SierraCodeName } from "../../../types/myAccountTypes"
import styles from "../../../../styles/components/MyAccount.module.scss"
import AccountSettingsButtons from "./AccountSettingsButtons"
import {
  AccountSettingsForm,
  AccountSettingsDisplay,
} from "./AccountSettingsDisplayOptions"
import { parseAccountSettingsPayload } from "./AccountSettingsUtils"
import {
  successModalProps,
  failureModalProps,
} from "./SuccessAndFailureModalProps"
import { PatronDataContext } from "../../../context/PatronDataContext"

const AccountSettingsTab = ({
  settingsData,
  pickupLocations,
}: {
  settingsData: Patron
  pickupLocations: SierraCodeName[]
}) => {
  const { getMostUpdatedSierraAccountData } = useContext(PatronDataContext)

  const [currentlyEditing, setCurrentlyEditing] = useState(false)
  const [modalProps, setModalProps] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { onOpen: openModal, onClose: closeModal, Modal } = useModal()

  const [isFormValid, setIsFormValid] = useState(true)

  const editButtonRef = useRef<HTMLButtonElement>()
  const firstInputRef = useRef<TextInputRefType>()

  const listElements = currentlyEditing ? (
    <AccountSettingsForm
      firstInputRef={firstInputRef}
      patron={settingsData}
      setIsFormValid={setIsFormValid}
      pickupLocations={pickupLocations}
    />
  ) : (
    <AccountSettingsDisplay patron={settingsData} />
  )
  useEffect(() => {
    if (currentlyEditing) {
      firstInputRef.current?.focus()
    } else editButtonRef.current?.focus()
  }, [currentlyEditing])

  const submitAccountSettings = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const payload = parseAccountSettingsPayload(e.target, settingsData)
    const response = await fetch(
      `/research/research-catalog/api/account/settings/${settingsData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
    if (response.status === 200) {
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
      {modalProps && (
        <Modal
          {...{
            ...modalProps,
            onClose: () => {
              closeModal()
              getMostUpdatedSierraAccountData()
            },
          }}
        />
      )}
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
        <Spacer display={{ sm: "none", base: "none", md: "inline-block" }} />
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
