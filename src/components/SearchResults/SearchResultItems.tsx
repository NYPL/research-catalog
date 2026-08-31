import { Box, Text } from "@nypl/design-system-react-components"
import type ItemTableData from "../../models/ItemTableData"
import StatusLinks from "../ItemTable/StatusLinks"
import { handleTableCopy } from "../../utils/appUtils"

interface SearchResultItemsProps {
  itemTableData: ItemTableData
}

/**
 * Displays item information for search result card.
 */
const SearchResultItems = ({ itemTableData }: SearchResultItemsProps) => {
  const { tableHeadings, tableData, items } = itemTableData
  return (
    <Box>
      <table
        onCopy={(e) => handleTableCopy(e, "\n")}
        style={{
          width: "100%",
          paddingTop: "24px",
          marginBottom: "20px",
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
                  verticalAlign: "top",
                  paddingTop: "4px",
                }}
              >
                <Text
                  textTransform="uppercase"
                  fontWeight="bold"
                  fontSize="small"
                >
                  {heading}
                </Text>
              </td>
              <td translate="no">
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
