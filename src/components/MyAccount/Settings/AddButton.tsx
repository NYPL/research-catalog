import { Button } from "@nypl/design-system-react-components"
import { forwardRef } from "react"

type AddButtonProps = {
  inputType?: string
  label: string
  isDisabled?: boolean
  onClick: () => void
}

const AddButton = forwardRef<HTMLButtonElement, AddButtonProps>(
  ({ inputType, label, isDisabled, onClick }, ref) => {
    return (
      <Button
        ref={ref}
        id={inputType ? `add-${inputType}-button` : "add-button"}
        variant="text"
        onClick={onClick}
        size="large"
        isDisabled={isDisabled}
        sx={{
          justifyContent: "flex-start",
          width: { base: "100%", md: "300px" },
          paddingLeft: "xs",
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
