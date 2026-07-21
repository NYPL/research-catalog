import { useEffect, useRef, useState } from "react"
import {
  TextInput,
  CheckboxGroup,
  Checkbox,
  Flex,
  useMultiStyleConfig,
  Banner,
} from "@nypl/design-system-react-components"
import React from "react"

export interface SearchableCheckboxItem {
  id: string
  label: string
  [key: string]: any
}

export interface SearchableCheckboxGroupProps {
  id: string
  items: SearchableCheckboxItem[]
  selectedItems?: string[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  renderRightLabel?: (item: SearchableCheckboxItem) => React.ReactNode
  searchPlaceholder?: string
  isSearchable?: boolean
  label?: string
}

/* Reservoir Multiselect modified to accept JSX elements but search by labels.
 ** Used to display user's lists in ManageBibInListMenu. */
export const SearchableCheckboxGroup = ({
  id,
  items,
  selectedItems = [],
  onChange,
  renderRightLabel,
  searchPlaceholder = "Search",
  isSearchable = true,
  label = "",
}: SearchableCheckboxGroupProps) => {
  const styles = useMultiStyleConfig("MultiSelect", {
    isBlockElement: true,
    width: "full",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = items?.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  )
  // Accessible announcements of list search results.
  const liveRegionRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = `${filteredItems.length} lists available`
    }
  }, [filteredItems.length])

  return (
    <>
      {isSearchable && (
        <TextInput
          id={`${id}-search`}
          labelText={searchPlaceholder}
          showLabel={false}
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
          isClearable
          isClearableCallback={() => setSearchTerm("")}
          __css={styles.menuSearchInputBox}
        />
      )}
      <CheckboxGroup
        id={`${id}-checkboxGroup`}
        layout="column"
        isFullWidth
        showLabel={true}
        mt="s"
        mb="0"
        labelText={label}
        name={""}
        sx={{ legend: { paddingBottom: "xs" } }}
      >
        {filteredItems?.map((item) => (
          <Flex key={item.id} justifyContent="space-between">
            <Checkbox
              id={item.id}
              labelText={item.label}
              name={item.label}
              isChecked={selectedItems?.includes(item.id)}
              onChange={onChange}
            />
            {renderRightLabel && renderRightLabel(item)}
          </Flex>
        ))}
        {filteredItems?.length === 0 && (
          <Banner
            content="Lists failed to load. Refresh the page and try again."
            variant="negative"
          />
        )}
      </CheckboxGroup>
      <div
        id="search-live-region"
        ref={liveRegionRef}
        aria-live="polite"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          margin: "-1px",
          padding: 0,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          border: 0,
        }}
      />
    </>
  )
}
