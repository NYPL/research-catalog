import { Icon, Button } from "@nypl/design-system-react-components"
import type { Dispatch } from "react"

interface AccountSettingsButtonsPropsType {
  currentlyEditing: boolean
  setCurrentlyEditing: Dispatch<React.SetStateAction<boolean>>
}

const AccountSettingsButtons = ({
  currentlyEditing,
  setCurrentlyEditing,
}: AccountSettingsButtonsPropsType) => {
  const toggleCurrentlyEditing = () => setCurrentlyEditing(!currentlyEditing)

  const clearUpdate = () => {
    //clear state
    toggleCurrentlyEditing()
  }
  const editButton = (
    <Button
      id="edit-account-settings-button"
      buttonType="secondary"
      onClick={toggleCurrentlyEditing}
    >
      {/* {placeholder icon before pencil is included in DS} */}
      <Icon name="editorMode" align="left" size="medium" />
      Edit account Settings
    </Button>
  )

  const cancelAndSaveButtons = (
    <>
      <Button
        onClick={clearUpdate}
        id="account-settings-cancel-update-button"
        screenreaderOnlyText="cancel account settings update"
        buttonType="secondary"
      >
        Cancel
      </Button>
      <Button
        id="account-settings-update-button"
        type="submit"
        buttonType="primary"
      >
        Save Changes
      </Button>
    </>
  )

  return currentlyEditing ? cancelAndSaveButtons : editButton
}

export default AccountSettingsButtons
