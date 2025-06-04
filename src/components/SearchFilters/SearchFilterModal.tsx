import {
  Button,
  ButtonGroup,
  Icon,
  Box,
  Heading,
} from "@nypl/design-system-react-components"
import { useEffect, useState } from "react"
import type { Aggregation } from "../../types/filterTypes"
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react"
import router from "next/router"
import {
  collapseMultiValueQueryParams,
  getQueryWithoutFiltersOrPage,
} from "../../utils/refineSearchUtils"
import { filtersObjectLength } from "../../utils/searchUtils"
import SearchFilters from "./SearchFilters"
import { useFocusContext } from "../../context/FocusContext"

const SearchFilterModal = ({
  aggregations,
  searchResultsCount,
}: {
  aggregations: Aggregation[]
  searchResultsCount?: number
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { lastFocusedId, setLastFocusedId } = useFocusContext()

  const closeModal = () => {
    setLastFocusedId("search-filters-modal")
    setIsModalOpen(false)
  }

  const handleClear = () => {
    router.push({
      pathname: "/search",
      query: getQueryWithoutFiltersOrPage(router.query),
    })
    closeModal()
  }

  // Counts filters without storing appliedFilters state at this level.
  const [filterCount, setFilterCount] = useState<number | null>(null)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const count = filtersObjectLength(
        collapseMultiValueQueryParams(router.query)
      )
      setFilterCount(count)
    }
  }, [router.query])

  useEffect(() => {
    if (lastFocusedId === "search-filters-modal") {
      const el = document.querySelector("button[id=search-filters-modal]")
      ;(el as HTMLElement)?.focus()
    }
  }, [isModalOpen, lastFocusedId])

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
          {`Show filters${
            filterCount !== null && filterCount > 0 ? ` (${filterCount})` : ""
          }`}
        </Button>
      )}

      {isModalOpen && (
        <ChakraModal
          id={"modal"}
          scrollBehavior="inside"
          size={{ base: "full", md: "xl" }}
          isOpen={isModalOpen}
          onClose={closeModal}
          aria-labelledby="Filter results"
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
              <ModalHeader padding="0" flex="1">
                <Heading
                  size="heading5"
                  paddingTop="s"
                  paddingBottom="s"
                  paddingLeft="m"
                >
                  Filter results
                </Heading>
              </ModalHeader>
              <Button
                aria-label="Close"
                id="close-btn"
                buttonType="text"
                onClick={() => {
                  closeModal()
                }}
              >
                {" "}
                <Icon name="close" size="large" color="ui.black" />
              </Button>
            </Box>
            <Box
              overflow="auto"
              display="flex"
              paddingLeft="l"
              paddingRight="l"
              paddingBottom="m"
            >
              <SearchFilters aggregations={aggregations} />
            </Box>
            <ModalFooter>
              <ButtonGroup
                width="100%"
                display="flex"
                flexDir="column"
                gap="xs"
                paddingTop="s"
              >
                <Button
                  id="show-results"
                  onClick={() => {
                    closeModal()
                  }}
                >
                  {`Show ${
                    searchResultsCount === 10000
                      ? "over 10,000"
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
