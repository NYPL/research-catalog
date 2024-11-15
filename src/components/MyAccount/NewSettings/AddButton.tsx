import { Button } from "@nypl/design-system-react-components"

type AddButtonProps = {
  inputType?: string
  label: string
  onClick: () => void
}

const AddButton = ({ inputType, label, onClick }: AddButtonProps) => {
  return (
    <Button
      id={inputType ? `add-${inputType}-button` : "add-button"}
      buttonType="text"
      onClick={onClick}
      size="large"
      sx={{
        justifyContent: "flex-start",
        width: { base: "87%", md: "300px" },
        paddingLeft: { base: "m", md: "unset" },
        paddingTop: "xs",
        paddingBottom: "xs",
        paddingRight: "xs",
      }}
    >
      {label}
    </Button>
  )
}

export default AddButton
