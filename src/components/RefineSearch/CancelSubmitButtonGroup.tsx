import { Button, Icon, ButtonGroup } from "@nypl/design-system-react-components"
import styles from "../../../styles/components/Search.module.scss"

const SearchButtons = ({
  cancelHandler,
  submitLabel,
  cancelLabel,
  formName,
}) => {
  const submitIcon = submitLabel.toLowerCase().includes("search")
    ? "actionSearch"
    : "check"
  return (
    <ButtonGroup id={`${formName}-buttons`} className={styles.re}>
      <Button
        data-testid={`clear-${formName}-button`}
        onClick={cancelHandler}
        id={`reset-${formName}`}
        type="reset"
        buttonType="secondary"
        backgroundColor="ui.white"
      >
        <Icon name="actionDelete" align="left" size="large" />
        {cancelLabel}
      </Button>
      <Button
        data-testid={`submit-${formName}-button`}
        id={`submit-${formName}`}
        type="submit"
        buttonType="primary"
      >
        <Icon name={submitIcon} align="left" size="large" />
        {submitLabel}
      </Button>
    </ButtonGroup>
  )
}

export default SearchButtons
