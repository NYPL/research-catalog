import { useState } from "react"
import {
  TextInput,
  CheckboxGroup,
  Checkbox,
  Flex,
  Text,
  useMultiStyleConfig,
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
}

export const SearchableCheckboxGroup = ({
  id,
  items,
  selectedItems = [],
  onChange,
  renderRightLabel,
  searchPlaceholder = "Search",
  isSearchable = true,
}: SearchableCheckboxGroupProps) => {
  const styles = useMultiStyleConfig("MultiSelect", {
    isBlockElement: false,
    width: "full",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = items?.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        showLabel={false}
        mt="s"
        mb="0"
        labelText={""}
        name={""}
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
          <Text mb="0" mt="s" color="ui.gray.dark">
            No lists found
          </Text>
        )}
      </CheckboxGroup>
    </>
  )
}
