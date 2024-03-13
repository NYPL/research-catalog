import { useState } from "react"
import type { Hold, Patron } from "../../../types/accountTypes"
import { Button } from "@nypl/design-system-react-components"

const FreezeButton = ({ hold, patron }: { hold: Hold; patron: Patron }) => {
  const [frozen, setFrozen] = useState(hold.frozen)
  const [isDisabled, setIsDisabled] = useState(false)

  const handleFreezeClick = async () => {
    // Disabling button while request happens.
    setIsDisabled(true)
    await fetch(
      `/research/research-catalog/api/account/holds/update/${hold.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patronId: patron.id,
          freeze: !frozen,
          pickupLocation: hold.pickupLocation.code,
        }),
      }
    )
    setFrozen(!frozen)
    setIsDisabled(false)
  }

  return (
    <Button
      width="100%"
      buttonType="secondary"
      id={`freeze-${hold.id}`}
      onClick={handleFreezeClick}
      isDisabled={isDisabled}
    >
      {frozen ? "Unfreeze" : "Freeze"}
    </Button>
  )
}

export default FreezeButton
