import { Button, Icon, ButtonGroup } from "@nypl/design-system-react-components"
import styles from "../../../styles/components/Search.module.scss"

const SearchButtons = ({ cancelHandler, submitLabel, cancelLabel }) => {
  return (
    <ButtonGroup className={styles.re}>
      <Button
        data-testid="clear-filters-button"
        onClick={cancelHandler}
        id="reset-refine"
        type="reset"
        buttonType="secondary"
        backgroundColor="ui.white"
      >
        <Icon name="actionDelete" align="left" size="large" />
        {cancelLabel}
      </Button>
      <Button id="submit-refine" type="submit" buttonType="primary">
        <Icon name="check" align="left" size="large" />
        {submitLabel}
      </Button>
    </ButtonGroup>
  )
}

export default SearchButtons
