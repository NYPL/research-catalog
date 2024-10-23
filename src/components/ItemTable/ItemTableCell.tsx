import { Box } from "@nypl/design-system-react-components"

/**
 * The ItemTableCell component renders a table cell for the ItemTable
 *
 * Its extraction into a separate component allows for styling and other overrides on plain text cells
 * when rendered programatically in the ItemTableData class
 */
const ItemTableCell = ({ children }) => {
  return (
    <Box
      as="span"
      fontSize={{
        base: "mobile.body.body2",
        md: "desktop.body.body2",
      }}
    >
      {children}
    </Box>
  )
}

export default ItemTableCell
