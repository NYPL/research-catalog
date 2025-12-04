import { Box, Text } from "@nypl/design-system-react-components"
import type ItemTableData from "../../models/ItemTableData"
import StatusLinks from "../ItemTable/StatusLinks"

interface SearchResultItemsProps {
  itemTableData: ItemTableData
}

/**
 * Displays item information for search result card.
 */
const SearchResultItems = ({ itemTableData }: SearchResultItemsProps) => {
  const { tableHeadings, tableData, items } = itemTableData
  return (
    <Box display="grid">
      <table
        style={{
          width: "100%",
          paddingTop: "24px",
          borderCollapse: "separate",
          borderSpacing: "0 4px",
          borderTop: "1px dashed var(--ui-gray-medium, #BDBDBD)",
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

      <StatusLinks item={items[0]} />
    </Box>
  )
}

export default SearchResultItems
