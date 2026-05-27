import { Button, ButtonGroup, Icon } from "@nypl/design-system-react-components"

/**
 * The ListOptions component renders the four list operation buttons displayed at the top of the single list view.
 */
const ListOptions = () => {
  return (
    <ButtonGroup mt="m">
      <Button variant="secondary">
        <Icon name="editorMode" align="left" size="medium" />
        Edit
      </Button>
      <Button variant="secondary">
        <Icon name="contentCopy" align="left" size="medium" />
        Duplicate
      </Button>
      <Button variant="secondary">
        <Icon align="left" size="medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M15 9L13.9425 7.9425L9.75 12.1275V3H8.25V12.1275L4.065 7.935L3 9L9 15L15 9Z"
              fill="#0069BF"
            />
          </svg>
        </Icon>
        Download
      </Button>
      <Button
        variant="secondary"
        sx={{
          color: "ui.error.primary",
          borderColor: "ui.error.primary",
          _hover: {
            color: "ui.error.primary",
            borderColor: "ui.error.primary",
            background: "ui.error.primary-05",
          },
        }}
      >
        <Icon name="actionDelete" align="left" size="medium" />
        Delete
      </Button>
    </ButtonGroup>
  )
}

export default ListOptions
