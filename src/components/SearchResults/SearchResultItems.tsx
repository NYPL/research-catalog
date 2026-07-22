import { Box, Text } from "@nypl/design-system-react-components"
import type ItemTableData from "../../models/ItemTableData"
import AvailabilityLinks from "../ItemTable/AvailabilityLinks"

interface SearchResultItemsProps {
  itemTableData:
    | ItemTableData
    | {
        tableHeadings: string[]
        tableData: any[][]
        inSearchResult: boolean
        items?: any[]
      }
}

/**
 * Displays item information for search result card.
 */
const SearchResultItems = ({ itemTableData }: SearchResultItemsProps) => {
  const { tableHeadings, tableData, items } = itemTableData
  return (
    <Box>
      <table
        style={{
          width: "100%",
          paddingTop: "24px",
          marginBottom: "0",
          borderCollapse: "separate",
          borderTop: "1px dashed var(--nypl-colors-ui-bg-active)",
        }}
      >
        <tbody>
          {tableHeadings.map((heading, index) => (
            <tr key={heading}>
              <td
                style={{
                  width: "181px",
                  minWidth: "60px",
                }}
              >
                <Text
                  textTransform="uppercase"
                  fontWeight="bold"
                  fontSize="small"
                  mt="xxs"
                >
                  {heading}
                </Text>
              </td>
              <td>
                <Text fontSize="small">{tableData[0][index]}</Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {items && items.length > 0 && (
        <AvailabilityLinks item={items[0]} mt="20px" />
      )}
    </Box>
  )
}

export default SearchResultItems
