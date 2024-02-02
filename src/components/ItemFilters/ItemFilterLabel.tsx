import { Button, Icon } from "@nypl/design-system-react-components"
import type { Dispatch } from "react"

import type { Option } from "../../types/filterTypes"

interface ItemFilterLabelProps {
  setWhichFilterIsOpen: Dispatch<React.SetStateAction<string>>
  field: string
  appliedOptions: Option[]
  isOpen: boolean
}

const ItemFilterLabel = ({
  field,
  appliedOptions,
  setWhichFilterIsOpen,
  isOpen,
}: ItemFilterLabelProps) => {
  const fieldFormatted = field[0].toUpperCase() + field.substring(1)
  return (
    <Button
      sx={{
        display: "flex",
        justifyContent: "space-between",
        borderColor: "ui.gray.medium",
        color: "black",
        width: "100%",
      }}
      data-testid={field + "-item-filter"}
      buttonType="secondary"
      id="item-filter-button"
      onClick={() => setWhichFilterIsOpen(isOpen ? "" : field)}
      type="button"
    >
      {fieldFormatted}
      {appliedOptions.length > 0 && ` (${appliedOptions.length})`}
      <Icon name={isOpen ? "minus" : "plus"} size="medium" />
    </Button>
  )
}

export default ItemFilterLabel
