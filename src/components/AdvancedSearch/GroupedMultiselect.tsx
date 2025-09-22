import { Box, useMultiStyleConfig } from "@chakra-ui/react"
import React, { forwardRef, useEffect, useRef, useState } from "react"

import {
  Accordion,
  Checkbox,
  CheckboxGroup,
  Text,
  TextInput,
} from "@nypl/design-system-react-components"
import MultiSelectItemsCountButton from "./MultiSelectItemsCountButton"

export interface MultiSelectItem {
  id: string
  name: string
  isDisabled?: boolean
  children?: MultiSelectItem[]
  itemCount?: number
}

export interface SelectedItems {
  [name: string]: { items: string[] }
}

export const multiSelectWidthsArray = ["fitContent", "full"] as const
export type MultiSelectWidths = (typeof multiSelectWidthsArray)[number]

export interface MultiSelectProps {
  buttonText: string
}

const GroupedMultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  ({ buttonText }, _ref) => {
    const mainId = "multiselect"
    const [userClickedOutside, setUserClickedOutside] = useState(false)

    const accordionButtonRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const expandToggleButtonRef = useRef<HTMLButtonElement>(null)

    const items: MultiSelectItem[] = [
      { id: "1", name: "Option 1" },
      { id: "2", name: "Option 2" },
      { id: "3", name: "Option 3" },
      { id: "4", name: "Option 4" },
      { id: "5", name: "Option 5" },
      { id: "6", name: "Option 6" },
    ]

    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [itemsList, setItemsList] = useState(items)

    const selectedItemsCount = selectedItems.length
    const selectedItemsString = `item${selectedItemsCount === 1 ? "" : "s"}`
    const ariaLabelValue = `MultiSelect, ${selectedItemsCount} ${selectedItemsString} selected`

    const styles = useMultiStyleConfig("MultiSelect", {
      isBlockElement: false,
      width: "full",
    })

    const handleClickOutside = (e: MouseEvent) => {
      const multiSelect = containerRef.current
      if (multiSelect && !multiSelect.contains(e.target as Node)) {
        setUserClickedOutside(true)
      } else {
        setUserClickedOutside(false)
      }
    }
    // Tells `Accordion` to close if open when user tabs outside of the container
    const handleTabOutside = (e) => {
      if (e.key === "Tab") {
        const multiSelect = containerRef.current

        // setTimeout delays the check until after the focus change has occurred
        setTimeout(() => {
          if (multiSelect && !multiSelect.contains(document.activeElement)) {
            setUserClickedOutside(true)
          } else {
            setUserClickedOutside(false)
          }
        }, 0)
      }
    }

    const toggleItemsList = () => {
      setTimeout(() => {
        expandToggleButtonRef.current?.focus()
      }, 1)
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.id
      setSelectedItems((prev) =>
        prev.includes(value)
          ? prev.filter((id) => id !== value)
          : [...prev, value]
      )
    }

    const NoSearchResults = (): JSX.Element => {
      return <Box>No options found</Box>
    }

    const onChangeSearch = (event) => {
      const value = event.target.value.trim().toLowerCase()
      if (!value) {
        setItemsList(items)
        return
      }

      const filteredItems = items.filter((item) => {
        if (item.children) {
          if (item.name.toLowerCase().includes(value)) {
            return true
          }

          return item.children.some((childItem) =>
            childItem.name.toLowerCase().includes(value)
          )
        }

        return item.name.toLowerCase().includes(value)
      })

      setItemsList(filteredItems)
    }

    const searchInput = (
      <TextInput
        id={`${mainId}-textInput`}
        labelText={`Find a ${buttonText}s`}
        isClearable
        isClearableCallback={() => setItemsList(items)}
        placeholder={`Find a ${buttonText}s`}
        onChange={onChangeSearch}
        showLabel={false}
        showRequiredLabel={false}
        type="text"
        __css={styles.menuSearchInputBox}
        marginBottom="0"
      />
    )

    const accordionLabel = (
      <Box
        as="span"
        sx={{
          marginLeft: selectedItemsCount > 0 ? "56px" : "0",
          marginBottom: "0",
        }}
      >{`${buttonText}`}</Box>
    )

    const checkboxGroup = (parent, items) => (
      <>
        <Text size="body2" mb="s">
          {parent}
        </Text>
        <CheckboxGroup
          id={`${mainId}-checkboxGroup`}
          layout="column"
          isFullWidth
          labelText="Options"
          showLabel={false}
          name="multi-select-checkbox-group"
          marginLeft="s"
        >
          {itemsList.map((item) => (
            <Checkbox
              key={item.id}
              id={item.id}
              labelText={item.name}
              name={item.name}
              isChecked={selectedItems.includes(item.id)}
              onChange={handleCheckboxChange}
            />
          ))}
        </CheckboxGroup>
      </>
    )

    const accordionPanel = (
      <Box position="relative">
        <Box position="sticky" top="0" marginBottom="12px" zIndex="1">
          {searchInput}
        </Box>
        <Box
          maxHeight="215px"
          overflowY="auto"
          paddingTop="xxs"
          paddingLeft="xs"
          paddingBottom="xxs"
        >
          {itemsList.length === 0 ? (
            <NoSearchResults />
          ) : (
            checkboxGroup("hello", itemsList)
          )}
        </Box>
      </Box>
    )

    return (
      <Box
        data-testid="ds-multiSelect"
        id={mainId}
        ref={containerRef}
        __css={styles.base}
      >
        <Accordion
          accordionData={[
            {
              variant: "default",
              buttonInteractionRef: accordionButtonRef,
              label: accordionLabel,
              panel: accordionPanel,
            },
          ]}
          aria-label={ariaLabelValue}
          id={`${mainId}-accordion`}
          isDefaultOpen={false}
          isAlwaysRendered
          userClickedOutside={userClickedOutside}
          panelMaxHeight="215px"
          sx={{
            ...styles.accordionStyles,
          }}
        />
        {selectedItemsCount > 0 && (
          <MultiSelectItemsCountButton
            id={mainId}
            multiSelectLabelText={buttonText}
            isOpen={false}
            selectedItemsString={selectedItemsString}
            selectedItemsCount={selectedItemsCount}
            onClear={() => setSelectedItems([])}
            accordionButtonRef={accordionButtonRef}
          />
        )}
      </Box>
    )
  }
)

GroupedMultiSelect.displayName = "GroupedMultiSelect"
export default GroupedMultiSelect
