import { Button, Icon, Spacer } from "@nypl/design-system-react-components"
import type { Dispatch } from "react"

import styles from "../../../styles/components/ItemFilters.module.scss"
import type { Option } from "../../types/filterTypes"

interface ItemFilterLabelProps {
  setWhichFilterIsOpen: Dispatch<React.SetStateAction<string>>
  field: string
  selectedOptions: Option[]
  isOpen: boolean
}

const ItemFilterLabel = ({
  field,
  selectedOptions,
  setWhichFilterIsOpen,
  isOpen,
}: ItemFilterLabelProps) => {
  const fieldFormatted = field[0].toUpperCase() + field.substring(1)
  return (
    <Button
      className={styles.itemFilterButton}
      sx={{
        borderColor: "var(--nypl-colors-ui-gray-medium)",
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
      <Spacer />
      {selectedOptions.length > 0 && `(${selectedOptions.length})`}
      <Icon name={isOpen ? "minus" : "plus"} size="medium" />
    </Button>
  )
}

export default ItemFilterLabel
