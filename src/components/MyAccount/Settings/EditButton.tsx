import { Button, Icon } from "@nypl/design-system-react-components"
import { forwardRef } from "react"

type EditButtonProps = {
  buttonId: string
  buttonLabel: string
  onClick: () => void
}

const EditButton = forwardRef<HTMLButtonElement, EditButtonProps>(
  ({ buttonLabel, buttonId, onClick }, ref) => {
    return (
      <Button
        ref={ref}
        id={buttonId}
        aria-label={buttonLabel}
        buttonType="text"
        onClick={onClick}
        sx={{
          _focus: {
            outline: "2px green solid",
          },
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
