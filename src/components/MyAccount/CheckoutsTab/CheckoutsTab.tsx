import { Link, Text } from "@nypl/design-system-react-components"
import type { Checkout, Patron } from "../../../types/myAccountTypes"
import RenewButton from "./RenewButton"
import ItemsTab from "../ItemsTab"

const CheckoutsTab = ({
  checkouts,
  patron,
}: {
  checkouts: Checkout[]
  patron: Patron
}) => {
  function formatTitleElement(checkout: Checkout) {
    if (checkout.catalogHref) {
      return <Link href={checkout.catalogHref}>{checkout.title}</Link>
    } else {
      return <Text>{checkout.title}</Text>
    }
  }

  const checkoutsHeaders = [
    "Title",
    "Barcode",
    "Call number",
    "Due back by",
    "Manage checkout",
  ]

  const checkoutsData = checkouts.map((checkout) => [
    formatTitleElement(checkout),
    checkout.barcode,
    checkout.callNumber,
    checkout.dueDate,
    checkout.isResearch ? null : (
      <RenewButton checkout={checkout} patron={patron} />
    ),
  ])
  return (
    <ItemsTab
      headers={checkoutsHeaders}
      data={checkoutsData}
      userAction={"checked out"}
    />
  )
}

export default CheckoutsTab
