import { ButtonGroup, Button } from "@nypl/design-system-react-components"

type SaveCancelButtonProps = {
  isDisabled: boolean
  onCancel: () => void
  onSave: () => void
}

const SaveCancelButtons = ({
  isDisabled,
  onCancel,
  onSave,
}: SaveCancelButtonProps) => {
  return (
    <ButtonGroup
      display="flex"
      flexDir={{ base: "column-reverse", lg: "row" }}
      justifySelf={{ base: "unset", lg: "flex-end" }}
      marginLeft={{ base: "unset", md: "l", lg: "auto" }}
      marginTop={{ base: "s", lg: "unset" }}
    >
      <Button
        sx={{ marginLeft: { base: "unset", lg: "xxl" } }}
        id="cancel-button"
        buttonType="secondary"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        id="save-button"
        isDisabled={isDisabled}
        buttonType="primary"
        minWidth={"123px"}
        onClick={onSave}
      >
        Save changes
      </Button>
    </ButtonGroup>
  )
}

export default SaveCancelButtons
