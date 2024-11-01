import { Button, Icon, ButtonGroup } from "@nypl/design-system-react-components"
import type { SyntheticEvent } from "react"

interface CancelSubmitButtonGroupProps {
  cancelHandler: (e: SyntheticEvent) => void
  submitLabel: string
  cancelLabel: string
  formName: string
  disableSubmit?: boolean
}

const CancelSubmitButtonGroup = ({
  cancelHandler,
  cancelLabel,
  submitLabel,
  formName,
  disableSubmit,
}: CancelSubmitButtonGroupProps) => {
  const submitIcon = submitLabel.toLowerCase().includes("search")
    ? "actionSearch"
    : "check"
  return (
    <ButtonGroup mb={0} id={`${formName}-buttons`}>
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
        isDisabled={disableSubmit}
      >
        <Icon name={submitIcon} align="left" size="large" />
        {submitLabel}
      </Button>
    </ButtonGroup>
  )
}

export default CancelSubmitButtonGroup
