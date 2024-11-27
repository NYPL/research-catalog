import { Button, Icon } from "@nypl/design-system-react-components"

type EditButtonProps = {
  buttonId: string
  onClick: () => void
}

const EditButton = ({ buttonId, onClick }: EditButtonProps) => {
  return (
    <Button
      id={buttonId}
      buttonType="text"
      onClick={onClick}
      sx={{
        paddingLeft: "xs",
        paddingRight: "xs",
        marginLeft: "xxl",
      }}
    >
      <Icon name="editorMode" align="left" size="medium" />
      Edit
    </Button>
  )
}

export default EditButton
