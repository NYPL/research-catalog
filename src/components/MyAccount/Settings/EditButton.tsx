import { Button, Icon } from "@nypl/design-system-react-components"

type EditButtonProps = {
  buttonId: string
  buttonLabel: string
  onClick: () => void
}

const EditButton = ({ buttonId, buttonLabel, onClick }: EditButtonProps) => {
  return (
    <Button
      id={buttonId}
      aria-label={buttonLabel}
      buttonType="text"
      onClick={onClick}
      sx={{
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

export default EditButton
