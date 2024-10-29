import { Icon, Button } from "@nypl/design-system-react-components"
import type { Dispatch, MutableRefObject } from "react"
import styles from "../../../../styles/components/MyAccount.module.scss"
import CancelSubmitButtonGroup from "../../RefineSearch/CancelSubmitButtonGroup"

interface AccountSettingsButtonsPropsType {
  currentlyEditing: boolean
  formValid: boolean
  setCurrentlyEditing: Dispatch<React.SetStateAction<boolean>>
  editButtonRef: MutableRefObject<HTMLButtonElement>
  setFocusOnAccountSettingsButton: Dispatch<React.SetStateAction<boolean>>
}

const AccountSettingsButtons = ({
  currentlyEditing,
  formValid,
  setCurrentlyEditing,
  editButtonRef,
  setFocusOnAccountSettingsButton,
}: AccountSettingsButtonsPropsType) => {
  const toggleCurrentlyEditing = (doWeWantToEdit: boolean) => {
    setCurrentlyEditing(doWeWantToEdit)
    setFocusOnAccountSettingsButton(!doWeWantToEdit)
  }
  const editButton = (
    <Button
      ref={editButtonRef}
      className={styles.settingsEditButton}
      id="edit-account-settings-button"
      buttonType="secondary"
      onClick={() => toggleCurrentlyEditing(true)}
    >
      <Icon name="editorMode" align="left" size="medium" />
      Edit account settings
    </Button>
  )

  const cancelAndSaveButtons = (
    <CancelSubmitButtonGroup
      cancelHandler={() => toggleCurrentlyEditing(false)}
      formName="account-settings"
      submitLabel="Save changes"
      cancelLabel="Cancel"
      disableSubmit={!formValid}
    />
  )

  return currentlyEditing ? cancelAndSaveButtons : editButton
}

export default AccountSettingsButtons
