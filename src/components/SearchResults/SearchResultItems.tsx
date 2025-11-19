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
          marginBottom: "20px",
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "0 4px",
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
              <td>{tableData[0][index]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <StatusLinks item={items[0]} />
    </Box>
  )
}

export default SearchResultItems
