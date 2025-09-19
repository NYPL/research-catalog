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
        display="block"
        id="active-filters-heading"
        // @ts-expect-error
        tabIndex="0"
        fontSize="desktop.body.body2"
        fontWeight="bold"
        mr={{ base: "0", md: "s" }}
        mb={{ base: "xs", md: "0" }}
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
