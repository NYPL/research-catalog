import { Box, useMultiStyleConfig } from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
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
  children?: MultiSelectItem[]
}

export interface SelectedItems {
  [name: string]: { items: string[] }
}

export interface MultiSelectProps {
  field: { value: string; label: string }
  /** Boolean value used to control how the MultiSelect component will render
   * within the page and interact with other DOM elements. The default value is false. */
  isBlockElement?: boolean
  isDisabled?: boolean
  /** Use for a checkbox list with group titles. Provide either this or `items`, not both. */
  groupedItems?: MultiSelectItem[]
  /** Use for a flat checkbox list with no groups. Provide either this or `groupedItems`, not both. */
  items?: MultiSelectItem[]
  /** Set to false to render a flat checkbox list with no group title text.
   * Defaults to true. */
  showGroupTitles?: boolean
  /** Set to false to hide the search input. Defaults to true. */
  showSearch?: boolean
  /** Whether the accordion panel is open by default. Defaults to false. */
  isDefaultOpen?: boolean
  /** Label text for the search input. Defaults to "Search divisions". */
  searchLabelText?: string
  /** Value for the root element's data-testid attribute. Defaults to "ds-multiSelect". */
  dataTestId?: string
  /** The action to perform on the checkbox's onChange function. Note, if using
   * this prop, it must be of the type listed below. */
  onChange: (itemId: string) => void
  /** The selected items state (items that were checked by user). */
  selectedItems: SelectedItems
  onClear: () => void
  /* Whether to translate the CheckboxGroup content. Defaults to true. */
  translate?: boolean
}

/* Reservoir Multiselect modified to accept items with an optional grouping title. */
const CustomMultiselect = ({
  field,
  isBlockElement = false,
  isDisabled = false,
  groupedItems,
  items,
  showGroupTitles = true,
  showSearch = true,
  isDefaultOpen = false,
  searchLabelText = "Search divisions",
  dataTestId = "ds-multiSelect",
  onChange,
  selectedItems,
  onClear,
  translate = true,
}: MultiSelectProps) => {
  const mainId = field.value
  // A flat `items` list is treated as a single untitled group internally.
  const groups = groupedItems ?? [
    { id: field.value, name: "", children: items ?? [] },
  ]
  const [userClickedOutside, setUserClickedOutside] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const accordionButtonRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedItemsCount: number =
    selectedItems[field.value]?.items?.length || 0
  const selectedItemsString = `item${selectedItemsCount === 1 ? "" : "s"}`
  const ariaLabelValue = `${field.label}, ${selectedItemsCount} ${selectedItemsString} currently selected`

  const styles = useMultiStyleConfig("MultiSelect", {
    isBlockElement,
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

  const handleTabOutside = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      const multiSelect = containerRef.current
      setTimeout(() => {
        if (multiSelect && !multiSelect.contains(document.activeElement)) {
          setUserClickedOutside(true)
        } else {
          setUserClickedOutside(false)
        }
      }, 0)
    }
  }

  const NoSearchResults = (): JSX.Element => {
    return (
      <Box>
        <Text>No options found</Text>
      </Box>
    )
  }

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim().toLowerCase())
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleTabOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleTabOutside)
    }
  }, [])

  const isChecked = (multiSelectId: string, itemId: string): boolean => {
    return !!selectedItems[multiSelectId]?.items?.includes(itemId)
  }

  // Filter by search term without losing grouping.
  const filteredGroups = groups
    .map((group) => {
      if (!searchTerm) return group
      const matchingChildren = group.children.filter((child) =>
        child.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      return matchingChildren.length > 0
        ? { ...group, children: matchingChildren }
        : null
    })
    .filter(Boolean) as MultiSelectItem[]

  // Render group titles with checkbox groups.
  const renderGroups = (groups: MultiSelectItem[]) =>
    groups.map((group) => (
      <Box key={group.id} mb="xs">
        {showGroupTitles && (
          <Text size="body2" mb="12px" translate="no">
            {group.name}
          </Text>
        )}
        <CheckboxGroup
          id={`${mainId}-checkboxGroup-${group.id}`}
          translate={translate ? "yes" : "no"}
          layout="column"
          isFullWidth
          labelText={group.name}
          showLabel={false}
          name={`multi-select-checkbox-group-${group.id}`}
          marginLeft={showGroupTitles && !isBlockElement ? "m" : 0}
          mb="0"
        >
          {group.children.map((item) => (
            <Checkbox
              key={item.id}
              id={item.id}
              labelText={item.name}
              name={item.name}
              isChecked={isChecked(field.value, item.id)}
              onChange={() => onChange(item.id)}
            />
          ))}
        </CheckboxGroup>
      </Box>
    ))

  const searchInput = (
    <TextInput
      id={`${mainId}-textInput`}
      labelText={searchLabelText}
      isClearable
      isClearableCallback={() => setSearchTerm("")}
      placeholder="Search"
      onChange={onChangeSearch}
      showLabel={false}
      showRequiredLabel={false}
      type="text"
      marginBottom="0"
      __css={styles.menuSearchInputBox}
    />
  )

  const accordionLabel = (
    <Box
      as="span"
      title={field.label}
      sx={{
        marginLeft: selectedItemsCount > 0 ? "56px" : "0",
        marginBottom: "0",
      }}
    >
      {field.label}
    </Box>
  )

  const accordionPanel = (
    <Box position="relative">
      {showSearch && (
        <Box position="sticky" top="0" marginBottom="12px" zIndex="1">
          {searchInput}
        </Box>
      )}
      <Box
        maxHeight="215px"
        overflowY="auto"
        paddingTop="xxs"
        paddingLeft="xs"
        paddingBottom="xxs"
      >
        {filteredGroups.length === 0 ? (
          <NoSearchResults />
        ) : (
          renderGroups(filteredGroups)
        )}
      </Box>
    </Box>
  )

  return (
    <Box
      data-testid={dataTestId}
      id={mainId}
      ref={containerRef}
      __css={styles.base}
    >
      <Accordion
        accordionData={[
          {
            variant: "default",
            isDisabled: isDisabled,
            buttonInteractionRef: accordionButtonRef,
            label: accordionLabel,
            panel: accordionPanel,
          },
        ]}
        aria-label={ariaLabelValue}
        id={`${mainId}-accordion`}
        isDefaultOpen={isDefaultOpen}
        isAlwaysRendered
        userClickedOutside={userClickedOutside}
        panelMaxHeight="215px"
        sx={{
          ...styles.accordionStyles,
          button: { height: "40px" },
        }}
      />
      {selectedItemsCount > 0 && (
        <MultiSelectItemsCountButton
          key={selectedItemsCount}
          id={field.value}
          multiSelectLabelText={field.label}
          isOpen={false}
          selectedItemsString={selectedItemsString}
          selectedItemsCount={selectedItemsCount}
          onClear={onClear}
          accordionButtonRef={accordionButtonRef}
        />
      )}
    </Box>
  )
}

CustomMultiselect.displayName = "CustomMultiselect"
export default CustomMultiselect
