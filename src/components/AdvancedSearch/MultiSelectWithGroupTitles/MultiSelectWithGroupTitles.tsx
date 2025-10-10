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
  groupedItems: MultiSelectItem[]
  /** The action to perform on the checkbox's onChange function. Note, if using
   * this prop, it must be of the type listed below. */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  /** The selected items state (items that were checked by user). */
  selectedItems: SelectedItems
  onClear: () => void
}

/* Reservoir Multiselect modified to accept items with a group title that does not
 ** appear as a checkbox. Used for the Collection filter in Advanced Search.
 */
const MultiSelectWithGroupTitles = ({
  field,
  isBlockElement = false,
  groupedItems,
  onChange,
  selectedItems,
  onClear,
}: MultiSelectProps) => {
  const mainId = field.value
  const [userClickedOutside, setUserClickedOutside] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const accordionButtonRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedItemsCount: number =
    selectedItems[field.value]?.items?.length || 0
  const selectedItemsString = `item${selectedItemsCount === 1 ? "" : "s"}`
  const ariaLabelValue = `${field.label} multiselect, ${selectedItemsCount} ${selectedItemsString} selected`

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
  const filteredGroups = groupedItems
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
        <Text size="body2" mb="12px">
          {group.name}
        </Text>
        <CheckboxGroup
          id={`${field.value}-checkboxGroup-${group.id}`}
          layout="column"
          isFullWidth
          labelText={group.name}
          showLabel={false}
          name={`multi-select-checkbox-group-${group.id}`}
          marginLeft={isBlockElement ? 0 : "m"}
          mb="0"
        >
          {group.children.map((item) => (
            <Checkbox
              key={item.id}
              id={item.id}
              labelText={item.name}
              name={item.name}
              isChecked={isChecked(field.value, item.id)}
              onChange={onChange}
            />
          ))}
        </CheckboxGroup>
      </Box>
    ))

  const searchInput = (
    <TextInput
      id={`${mainId}-textInput`}
      labelText="Search collections"
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
          button: { height: "40px" },
        }}
      />
      {selectedItemsCount > 0 && (
        <MultiSelectItemsCountButton
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

MultiSelectWithGroupTitles.displayName = "MultiSelectWithGroupTitles"
export default MultiSelectWithGroupTitles
