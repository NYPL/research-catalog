import { Button } from "@nypl/design-system-react-components"
import { useContext, type ReactNode } from "react"

import type Item from "../../models/Item"
import type { ItemMetadata } from "../../types/itemTypes"
import { FeedbackContext } from "../../context/FeedbackContext"

interface HoldContactButtonProps {
  item: Item
  children: ReactNode
}

export const HoldContactButton = ({
  item,
  children,
}: HoldContactButtonProps) => {
  const { onOpen, setItemMetadata } = useContext(FeedbackContext)

  const onContact = (metadata: ItemMetadata) => {
    setItemMetadata(metadata)
    onOpen()
  }

  return (
    <Button
      id="hold-contact"
      onClick={() =>
        onContact({
          id: item.id,
          barcode: item.barcode,
          callNumber: item.callNumber,
          bibId: item.bibId,
          volume: item.volume,
          notificationText: `Request failed for call number ${item.callNumber}`,
        })
      }
      variant="text"
      // TODO: Ask DS team to make button link variant match the default link styles
      sx={{
        display: "inline",
        fontWeight: "inherit",
        fontSize: "inherit",
        p: 0,
        height: "auto",
        textAlign: "left",
        minHeight: "auto",
        textDecorationStyle: "dotted",
        textDecorationThickness: "1px",
        textUnderlineOffset: "2px",
      }}
    >
      {children}
    </Button>
  )
}
