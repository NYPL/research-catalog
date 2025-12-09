import { useStyleConfig } from "@chakra-ui/react"
import { Button, Icon } from "@nypl/design-system-react-components"
import { forwardRef } from "react"

export interface MultiSelectItemsCountButtonProps {
  id: string
  /** The label text rendered within the MultiSelect using this button. */
  multiSelectLabelText: string
  /** The open status of the MultiSelect menu. */
  isOpen: boolean
  /** The selected items state (items that were checked by user). */
  selectedItemsString: string
  /** The number of selected items. */
  selectedItemsCount: number
  /** The callback function for the menu toggle. */
  onMenuToggle?: () => void
  /** The action to perform for the clear/reset button of individual MultiSelects. */
  onClear?: () => void
  /** The action to perform for key down event. */
  onKeyDown?: () => void
  /** Ref to the Accordion Button element. */
  accordionButtonRef: any
}

/**
 * The toggle button component used to open and close the `MultiSelect` menu.
 * Dropped in from Reservoir since this is not exported.
 */
const MultiSelectItemsCountButton = forwardRef<
  HTMLButtonElement,
  MultiSelectItemsCountButtonProps
>((props, _ref) => {
  const {
    id,
    isOpen,
    multiSelectLabelText,
    accordionButtonRef,
    onClear,
    selectedItemsString,
    selectedItemsCount,
  } = props

  // Sets the selected items count on the menu button.
  const selectedItemsAriaLabel = `remove ${selectedItemsCount} ${selectedItemsString} selected from ${multiSelectLabelText}`

  const styles = useStyleConfig("MultiSelectItemsCountButton", {
    isOpen,
  })

  return (
    <Button
      aria-label={selectedItemsAriaLabel}
      data-testid="ds-multiSelectItemsCountButton"
      id={`${id}-count-button`}
      onClick={() => {
        onClear && onClear()
        // Set focus on the Accordion Button when close the
        // selected items count button.
        accordionButtonRef.current?.focus()
      }}
      size="small"
      variant="pill"
      __css={styles}
    >
      {selectedItemsCount}
      <Icon
        align="right"
        id={`${id}-count-icon`}
        marginLeft="xs"
        name="close"
        size="xsmall"
        title="Remove selected items"
      />
    </Button>
  )
})

MultiSelectItemsCountButton.displayName = "MultiSelectItemsCountButton"

export default MultiSelectItemsCountButton
