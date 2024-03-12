import { Link, Text } from "@nypl/design-system-react-components"
import type { Checkout, Patron } from "../../../types/accountTypes"
import RenewButton from "./RenewButton"
import ItemsTab from "../ItemsTab"

const CheckoutsTab = ({
  checkouts,
  patron,
}: {
  checkouts: Checkout[]
  patron: Patron
}) => {
  const checkoutsHeaders = [
    "Title",
    "Barcode",
    "Call number",
    "Due back by",
    "Manage checkout",
  ]

  function formatTitle(checkout: Checkout) {
    if (checkout.href) {
      return <Link href={checkout.href}>{checkout.title}</Link>
    } else {
      return <Text>{checkout.title}</Text>
    }
  }

  const checkoutsData = checkouts.map((checkout) => [
    formatTitle(checkout),
    checkout.barcode,
    checkout.callNumber,
    checkout.dueDate,
    checkout.isResearch ? null : RenewButton(checkout, patron),
  ])
  return (
    <ItemsTab
      headers={checkoutsHeaders}
      data={checkoutsData}
      verb={"checked out"}
    />
  )
}

export default CheckoutsTab
