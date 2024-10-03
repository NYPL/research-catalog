import {
  Form,
  List,
  Spacer,
  useModal,
  SkeletonLoader,
  type TextInputRefType,
} from "@nypl/design-system-react-components"
import { useContext, useEffect, useRef, useState } from "react"
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

const AccountSettingsTab = () => {
  const {
    patronDataLoading,
    getMostUpdatedSierraAccountData,
    updatedAccountData: { patron, pickupLocations },
  } = useContext(PatronDataContext)
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
      patron={patron}
      setIsFormValid={setIsFormValid}
      pickupLocations={pickupLocations}
    />
  ) : (
    <AccountSettingsDisplay patron={patron} />
  )
  const [focusOnAccountSettingsButton, setFocusOnAccountSettingButton] =
    useState(false)
  useEffect(() => {
    if (currentlyEditing) {
      firstInputRef.current?.focus()
    } else if (!patronDataLoading && focusOnAccountSettingsButton) {
      editButtonRef.current?.focus()
    }
  }, [currentlyEditing, focusOnAccountSettingsButton, patronDataLoading])

  const submitAccountSettings = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const payload = parseAccountSettingsPayload(e.target, patron)
    console.log(payload)
    const response = await fetch(
      `/research/research-catalog/api/account/settings/${patron.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
    console.log(response)
    if (response.status === 200) {
      await getMostUpdatedSierraAccountData()
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
              setFocusOnAccountSettingButton(true)
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
          setFocusOnAccountSettingsButton={setFocusOnAccountSettingButton}
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
