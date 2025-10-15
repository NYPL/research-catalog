import { Box, TagSet, Text } from "@nypl/design-system-react-components"

const ActiveFilters = ({ filterName, onClick, tagSetData }) => {
  return (
    <Box
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      mb="l"
      mt="xxs"
    >
      <Text
        as="h3"
        display="block"
        id="active-filters-heading"
        // @ts-expect-error
        tabIndex="-1"
        fontSize="desktop.body.body2"
        fontWeight="bold"
        mr={{ base: "0", md: "s" }}
        mb={{ base: "xs", md: "0" }}
        pt="xxs"
        whiteSpace="nowrap"
        lineHeight="--nypl-lineHeights-taller"
      >
        Active filters
      </Text>
      <TagSet
        id={`${filterName}-applied-filters`}
        isDismissible
        variant="filter"
        onClick={onClick}
        tagSetData={tagSetData}
      />
    </Box>
  )
}

export default ActiveFilters
