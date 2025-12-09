import {
  Button,
  ButtonGroup,
  Icon,
  Box,
  Heading,
} from "@nypl/design-system-react-components"
import type { Aggregation } from "../../types/filterTypes"
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react"
import router from "next/router"
import { getQueryWithoutFiltersOrPage } from "../../utils/refineSearchUtils"
import SearchFilters from "./SearchFilters"
import { idConstants } from "../../context/FocusContext"
import { FilterCount } from "./FilterCount"

const SearchFilterModal = ({
  aggregations,
  searchResultsCount,
}: {
  aggregations: Aggregation[]
  searchResultsCount: number
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClear = () => {
    router.push({
      pathname: router.pathname,
      query: getQueryWithoutFiltersOrPage(router.query),
    })
    onClose()
  }
  return (
    <>
      <Button
        id={idConstants.searchFiltersModal}
        minWidth="44px"
        width="100%"
        onClick={onOpen}
        display={{ base: "flex", md: "none" }}
      >
        <Icon size="large" align="left" name="contentFilterList" />
        <FilterCount />
      </Button>

      <ChakraModal
        id="modal"
        scrollBehavior="inside"
        size={{ base: "full", md: "xl" }}
        isOpen={isOpen}
        onClose={onClose}
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
              variant="text"
              onClick={onClose}
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
              <Button id="show-results" onClick={onClose}>
                {searchResultsCount === 10000
                  ? "Show over 10,000 results"
                  : typeof searchResultsCount === "number"
                  ? `Show ${searchResultsCount.toLocaleString()} results`
                  : "Show results"}
              </Button>
              <Button
                id="clear-filters"
                variant="secondary"
                onClick={() => handleClear()}
              >
                Clear all filters
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  )
}

export default SearchFilterModal
