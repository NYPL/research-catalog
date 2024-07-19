import { Text } from "@nypl/design-system-react-components"
import ExternalLink from "../../Links/ExternalLink/ExternalLink"
import type { Checkout } from "../../../types/myAccountTypes"
import RenewButton from "./RenewButton"
import ItemsTab from "../ItemsTab"
import { useContext, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"

const CheckoutsTab = () => {
  const {
    updatedAccountData: { checkouts, patron },
  } = useContext(PatronDataContext)
  function formatTitleElement(checkout: Checkout) {
    if (checkout.catalogHref) {
      return (
        <ExternalLink isUnderlined={false} href={checkout.catalogHref}>
          {checkout.title}
        </ExternalLink>
      )
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
  const [checkoutRenewing, setCheckoutRenewing] = useState<string>(null)
  const checkoutsData = checkouts.map((checkout) => [
    formatTitleElement(checkout),
    checkout.barcode,
    checkout.callNumber,
    checkout.dueDate,
    checkout.isResearch ? null : (
      <RenewButton
        setCheckoutRenewing={setCheckoutRenewing}
        renewingLoading={checkoutRenewing === checkout.id}
        checkout={checkout}
        patron={patron}
      />
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
