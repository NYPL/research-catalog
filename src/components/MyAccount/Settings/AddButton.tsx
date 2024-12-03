import { Button } from "@nypl/design-system-react-components"
import { forwardRef } from "react"

type AddButtonProps = {
  inputType?: string
  label: string
  onClick: () => void
}

const AddButton = forwardRef<HTMLButtonElement, AddButtonProps>(
  ({ inputType, label, onClick }, ref) => {
    return (
      <Button
        ref={ref}
        id={inputType ? `add-${inputType}-button` : "add-button"}
        buttonType="text"
        onClick={onClick}
        size="large"
        sx={{
          justifyContent: "flex-start",
          width: { base: "100%", md: "300px" },
          paddingLeft: { base: "m", md: "xs" },
          paddingTop: "xs",
          paddingBottom: "xs",
          paddingRight: "xs",
        }}
      >
        {label}
      </Button>
    )
  }
)

AddButton.displayName = "AddButton"

export default AddButton
