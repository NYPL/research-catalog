import { Button, Icon } from "@nypl/design-system-react-components"

const CreateListButton = () => {
  return (
    <Button width={{ base: "100%", sm: "auto" }}>
      <Icon name="plus" align="left" size="small" />
      Create new list
    </Button>
  )
}

export default CreateListButton
