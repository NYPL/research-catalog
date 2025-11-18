import { Flex, Text } from "@nypl/design-system-react-components"
import type { Checkout } from "../../../types/myAccountTypes"
import RenewButton from "./RenewButton"
import ItemsTab from "../ItemsTab"
import { useContext, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import Link from "../../Link/Link"

const CheckoutsTab = () => {
  const {
    updatedAccountData: { checkouts, patron },
  } = useContext(PatronDataContext)
  function formatTitleElement(checkout: Checkout) {
    if (checkout.catalogHref) {
      return (
        <Link isExternal isUnderlined={false} href={checkout.catalogHref}>
          {checkout.title}
        </Link>
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
  const [checkoutToRenew, setCheckoutToRenew] = useState<string>(null)
  const tableStyling = checkoutsHeaders.map((_, index) => {
    const width = index === 0 ? null : "16%"
    let minWidth = index === 0 ? "320px" : "172px"
    if (index === checkoutsHeaders.length - 1) minWidth = "225px"
    return { width, minWidth }
  })
  const checkoutsData = checkouts.map((checkout) => [
    formatTitleElement(checkout),
    checkout.barcode,
    checkout.callNumber,
    checkout.dueDate,
    checkout.isResearch ? null : (
      <Flex alignItems="end" gap="xs">
        <RenewButton
          setCheckoutToRenew={setCheckoutToRenew}
          isCheckoutRenewing={checkoutToRenew === checkout.id}
          checkout={checkout}
          patron={patron}
        />
        {checkout.numberOfRenewals ? (
          <Text size="caption" isItalic color="ui.warning.tertiary">{`Renewed ${
            checkout.numberOfRenewals
          } time${checkout.numberOfRenewals === 1 ? "" : "s"}`}</Text>
        ) : null}
      </Flex>
    ),
  ])
  return (
    <ItemsTab
      headers={checkoutsHeaders}
      data={checkoutsData}
      tableStyling={tableStyling}
      userAction="checked out"
    />
  )
}

export default CheckoutsTab
