import type { HTTPStatusCode } from "./appTypes"
import type { ItemMetadata } from "./itemTypes"
import type { ChakraComponent } from "@chakra-ui/react"

export interface FeedbackMetadataAndComment {
  category?: string
  comment: string
  email: string
  id?: string
  barcode?: string
  error?: string
}

/* eslint-disable @typescript-eslint/naming-convention */
export type FeedbackContextType = {
  onOpen: () => void
  FeedbackBox: ChakraComponent<any>
  onClose: () => void
  isOpen?: boolean
  itemMetadata: ItemMetadata
  setItemMetadata: (value: ItemMetadata) => void
  error?: HTTPStatusCode | null
  setError: (value: HTTPStatusCode) => void
  openFeedbackFormWithError: (statusCode?: HTTPStatusCode) => void
}
