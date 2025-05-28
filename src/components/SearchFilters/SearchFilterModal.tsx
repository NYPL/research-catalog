import {
  Button,
  ButtonGroup,
  Icon,
  Box,
  Heading,
} from "@nypl/design-system-react-components"
import { useState } from "react"
import type { Aggregation } from "../../types/filterTypes"
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react"
import router from "next/router"
import {
  collapseMultiValueQueryParams,
  getQueryWithoutFiltersOrPage,
} from "../../utils/refineSearchUtils"
import { filtersObjectLength } from "../../utils/searchUtils"
import SearchFilters from "./SearchFilters"

const SearchFilterModal = ({
  aggregations,
  searchResultsCount,
}: {
  aggregations: Aggregation[]
  searchResultsCount?: number
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeModal = () => setIsModalOpen(false)

  const handleClear = () => {
    router.push({
      pathname: "/search",
      query: getQueryWithoutFiltersOrPage(router.query),
    })
    closeModal()
  }

  // Counts filters without storing appliedFilters state at this level.
  let filterCount = null
  if (typeof window !== "undefined") {
    filterCount = filtersObjectLength(
      collapseMultiValueQueryParams(router.query)
    )
  }

  return (
    <>
      {!isModalOpen && (
        <Button
          minWidth="44px"
          width="100%"
          onClick={() => setIsModalOpen(true)}
          id="search-filters-modal"
          display={{ base: "flex", md: "none" }}
        >
          <Icon size="large" align="left" name="contentFilterList" />
          {`Show filters ${filterCount ? `(${filterCount})` : ""}`}
        </Button>
      )}

      {isModalOpen && (
        <ChakraModal
          id={"modal"}
          scrollBehavior="inside"
          size={{ base: "full", md: "xl" }}
          isOpen={isModalOpen}
          onClose={closeModal}
        >
          <ModalOverlay />
          <ModalContent>
            <Box
              bg="ui.bg.default"
              display="flex"
              flexDir="row"
              alignItems="center"
              justifyContent="space-between"
              mb="s"
              pl="xs"
              pr="xs"
              sx={{
                borderBottom: "1px solid var(--ui-border-default, #BDBDBD)",
              }}
            >
              <Heading size="heading5" paddingTop="s" paddingLeft="m">
                Filter results
              </Heading>
              <Button
                aria-label="Close"
                id="close-btn"
                buttonType="text"
                onClick={() => closeModal()}
              >
                {" "}
                <Icon name="close" size="large" color="ui.black" />
              </Button>
            </Box>
            <ModalBody>
              <SearchFilters aggregations={aggregations} />
            </ModalBody>
            <ModalFooter>
              <ButtonGroup
                width="100%"
                display="flex"
                flexDir="column"
                gap="xs"
                paddingTop="s"
              >
                <Button id="show-results" onClick={() => closeModal()}>
                  {`Show ${
                    searchResultsCount === 10000
                      ? "over 10,0000"
                      : searchResultsCount.toLocaleString()
                  } results`}
                </Button>
                <Button
                  id="clear-filters"
                  buttonType="secondary"
                  onClick={() => handleClear()}
                >
                  Clear all filters
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </ChakraModal>
      )}
    </>
  )
}

export default SearchFilterModal
