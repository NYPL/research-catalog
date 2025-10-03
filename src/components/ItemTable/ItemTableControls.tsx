import {
  Box,
  Pagination,
  ProgressIndicator,
  Icon,
} from "@nypl/design-system-react-components"
import type { RefObject, SyntheticEvent } from "react"

import { ITEM_PAGINATION_BATCH_SIZE } from "../../config/constants"
import Link from "../Link/Link"
import type Bib from "../../models/Bib"

interface ItemTableControlsProps {
  bib: Bib
  viewAllExpanded: boolean
  itemsLoading: boolean
  itemTablePage: number
  handlePageChange: (selected: number) => void
  handleViewAllClick: (e: SyntheticEvent) => Promise<void>
  viewAllLoadingTextRef: RefObject<HTMLDivElement & HTMLLabelElement>
  numItemsTotal?: number
  filtersAreApplied?: boolean
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
  numItemsTotal = 0,
  filtersAreApplied = false,
}: ItemTableControlsProps) => {
  const viewAllLoadingMessage =
    bib.getItemsViewAllLoadingMessage(filtersAreApplied)

  return (
    <Box
      display={{ md: "flex" }}
      my={bib.showViewAllItemsLink(filtersAreApplied) ? "xl" : 0}
      justifyContent="space-between"
    >
      {!viewAllExpanded ? (
        <Pagination
          id="bib-items-pagination"
          initialPage={itemTablePage}
          currentPage={itemTablePage}
          pageCount={Math.ceil(numItemsTotal / ITEM_PAGINATION_BATCH_SIZE)}
          onPageChange={handlePageChange}
          width="auto"
          mb={{ base: "m", md: 0 }}
          className="no-print"
        />
      ) : null}
      {bib.showViewAllItemsLink(filtersAreApplied) &&
        (itemsLoading && viewAllExpanded ? (
          <ProgressIndicator
            id="bib-all-items-loading"
            labelText={viewAllLoadingMessage}
            size="small"
            indicatorType="circular"
            isIndeterminate
            marginLeft="auto"
            labelPlacement="right"
            sx={{
              "div[role=progressbar]": { marginRight: "xs" },
              label: {
                fontWeight: "medium",
                fontSize: {
                  base: "mobile.body.body2",
                  md: "desktop.body.body2",
                },
                marginBottom: 0,
              },
            }}
          />
        ) : !itemsLoading ? (
          <>
            <Link
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
              className="no-print"
            >
              <Box as="span" mr="xxs">
                {viewAllExpanded
                  ? "View fewer items"
                  : `View all ${bib.getNumItemsMessage(filtersAreApplied)}`}
              </Box>
              <Icon
                iconRotation={viewAllExpanded ? "rotate180" : "rotate0"}
                name="arrow"
                size="small"
                align="right"
                color="ui.link.primary"
              />
            </Link>
          </>
        ) : null)}
    </Box>
  )
}

export default ItemTableControls
