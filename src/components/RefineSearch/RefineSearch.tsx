import {
  Box,
  Button,
  HorizontalRule,
  ButtonGroup,
} from "@nypl/design-system-react-components"

const RefineSearch = () => {
  return (
    <Box>
      <HorizontalRule />
      <Button
        onClick={() =>
          console.log(
            "set show refine button = true, set refine search open false"
          )
        }
        id="cancel-refine"
        buttonType="secondary"
      >
        Cancel
      </Button>
      <ButtonGroup>
        <Button id="reset-refine" type="reset" buttonType="secondary">
          Clear Filters
        </Button>
        <Button id="submit-refine" type="submit" buttonType="secondary">
          Apply Filters
        </Button>
      </ButtonGroup>
      <HorizontalRule />
    </Box>
  )
}

export default RefineSearch
