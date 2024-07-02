import {
  Box,
  Pagination,
  ProgressIndicator,
  Label,
  Icon,
} from "@nypl/design-system-react-components"
import type { RefObject, SyntheticEvent } from "react"

import { ITEM_PAGINATION_BATCH_SIZE } from "../../config/constants"
import RCLink from "../Links/RCLink/RCLink"
import type Bib from "../../models/Bib"

interface ItemTableControlsProps {
  bib: Bib
  viewAllExpanded: boolean
  itemsLoading: boolean
  itemTablePage: number
  handlePageChange: (selected: number) => void
  handleViewAllClick: (e: SyntheticEvent) => Promise<void>
  viewAllLoadingTextRef: RefObject<HTMLDivElement & HTMLLabelElement>
  javascriptEnabled: boolean
}

/**
 * The ItemTableControls component appears below the Item table on the Bib page displays
 * pagination and view all controls/messaging.
 */
const ItemTableControls = ({
  bib,
  viewAllExpanded,
  itemsLoading,
  itemTablePage,
  handlePageChange,
  handleViewAllClick,
  viewAllLoadingTextRef,
  javascriptEnabled = true,
}: ItemTableControlsProps) => {
  return (
    <Box display="flex" my="xl" justifyContent="space-between">
      {!viewAllExpanded ? (
        <Pagination
          id="bib-items-pagination"
          initialPage={itemTablePage}
          currentPage={itemTablePage}
          pageCount={Math.ceil(
            bib.numPhysicalItems / ITEM_PAGINATION_BATCH_SIZE
          )}
          onPageChange={handlePageChange}
          width="auto"
        />
      ) : null}
      {bib.showViewAllItemsLink &&
        (itemsLoading && viewAllExpanded ? (
          <Box
            ml="auto"
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <ProgressIndicator
              id="bib-all-items-loading"
              labelText={bib.itemsViewAllLoadingMessage}
              size="small"
              indicatorType="circular"
              mr="xs"
              isIndeterminate
            />
            <Label
              id="bib-all-items-loading-label"
              htmlFor="bib-all-items-loading"
              ref={viewAllLoadingTextRef}
              fontSize={{
                base: "mobile.body.body1",
                md: "desktop.body.body1",
              }}
              fontWeight="medium"
              mb={0}
              // Label component does not expect tabIndex prop, so we are ignoring the typescript error that pops up.
              // Add any additional props above this for typescript validation.
              // @ts-expect-error
              tabIndex={-1}
            >
              {bib.itemsViewAllLoadingMessage}
            </Label>
          </Box>
        ) : !itemsLoading && javascriptEnabled ? (
          <>
            <RCLink
              href={`${bib.url}${!viewAllExpanded ? "/all" : ""}`}
              onClick={handleViewAllClick}
              fontSize={{
                base: "mobile.body.body1",
                md: "desktop.body.body1",
              }}
              fontWeight="medium"
              display="flex"
              alignItems="center"
              ml="auto"
              isUnderlined={false}
            >
              <Box as="span" mr="xxs">
                {viewAllExpanded
                  ? "View fewer items"
                  : `View All ${bib.numItemsMessage}`}
              </Box>
              <Icon
                iconRotation={viewAllExpanded ? "rotate180" : "rotate0"}
                name="arrow"
                size="small"
                align="right"
                color="ui.link.primary"
              />
            </RCLink>
          </>
        ) : null)}
    </Box>
  )
}

export default ItemTableControls
