import { Box, Icon, Table } from "@nypl/design-system-react-components"
import type { Checkout } from "../../types/accountTypes"

const CheckoutsTab = ({ checkouts }: { checkouts: Checkout[] }) => {
  const checkoutsHeaders = [
    "Title",
    "Barcode",
    "Call number",
    "Due back by",
    "Manage checkout",
  ]
  const checkoutsData = [
    ["title", "barcode", "due date", "call #", "manage checkout"],
    ["title", "barcode", "due date", "call #", "manage checkout"],
  ]
  return (
    <>
      <Box
        sx={{
          fontSize: "desktop.body.body2",
          marginTop: "m",
          marginBottom: "m",
          display: "flex",
          justifyContent: "flex-start",
          gap: "4px",
        }}
      >
        <Icon size="medium" name="actionCheckCircle" />{" "}
        <span>See this page for eBooks and eAudiobooks checked out by you</span>
      </Box>
      <Table
        sx={{
          "thead > tr > th": {
            textTransform: "unset",
            fontWeight: "700",
          },
        }}
        columnHeadersBackgroundColor={"ui.gray.x-light-cool"}
        columnHeaders={checkoutsHeaders}
        tableData={checkoutsData}
      />
    </>
  )
}

export default CheckoutsTab
