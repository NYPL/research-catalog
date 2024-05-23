import { Icon, Button, ButtonGroup } from "@nypl/design-system-react-components"
import type { Dispatch } from "react"
import styles from "../../../../styles/components/MyAccount.module.scss"

interface AccountSettingsButtonsPropsType {
  currentlyEditing: boolean
  setCurrentlyEditing: Dispatch<React.SetStateAction<boolean>>
}

const AccountSettingsButtons = ({
  currentlyEditing,
  setCurrentlyEditing,
}: AccountSettingsButtonsPropsType) => {
  const toggleCurrentlyEditing = (doWeWantToEdit: boolean) =>
    setCurrentlyEditing(doWeWantToEdit)

  const editButton = (
    <Button
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
    <ButtonGroup className={styles.settingsEditButton}>
      <Button
        onClick={() => toggleCurrentlyEditing(false)}
        id="account-settings-cancel-update-button"
        screenreaderOnlyText="cancel account settings update"
        buttonType="secondary"
      >
        Cancel
      </Button>
      <Button
        id="account-settings-update-button"
        // the click handler for this button is the onSubmit in AccountSettingsTab
        type="submit"
        buttonType="primary"
      >
        Save Changes
      </Button>
    </ButtonGroup>
  )

  return currentlyEditing ? cancelAndSaveButtons : editButton
}

export default AccountSettingsButtons
