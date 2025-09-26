import { Button, Icon } from "@nypl/design-system-react-components"
import { forwardRef } from "react"

type EditButtonProps = {
  buttonId: string
  buttonLabel: string
  onClick: () => void
  isDisabled?: boolean
}

const EditButton = forwardRef<HTMLButtonElement, EditButtonProps>(
  ({ buttonLabel, buttonId, isDisabled, onClick }, ref) => {
    return (
      <Button
        ref={ref}
        isDisabled={isDisabled}
        id={buttonId}
        aria-label={buttonLabel}
        variant="text"
        onClick={onClick}
        sx={{
          marginTop: { base: "unset", lg: "-xs" },
          paddingTop: "0",
          paddingBottom: "0",
          paddingLeft: "xs",
          paddingRight: "xs",
        }}
      >
        <Icon name="editorMode" align="left" size="medium" />
        Edit
      </Button>
    )
  }
)

EditButton.displayName = "EditButton"

export default EditButton
