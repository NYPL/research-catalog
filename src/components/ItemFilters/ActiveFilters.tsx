import {
  Box,
  TagSet,
  Text,
  type TagSetFilterDataProps,
} from "@nypl/design-system-react-components"

const ActiveFilters = ({ filterName, onClick, tagSetData }) => {
  return (
    <Box display="flex" flexDirection={{ base: "column", md: "row" }} mb="l">
      <Text
        display="block"
        fontSize="desktop.body.body2"
        fontWeight="bold"
        mr={{ base: "0", md: "s" }}
        mb={{ base: "xxs", md: 0 }}
        lineHeight={2}
      >
        Active filters
      </Text>
      <TagSet
        id={`${filterName}-applied-filters`}
        isDismissible
        type="filter"
        onClick={onClick}
        tagSetData={tagSetData}
      />
    </Box>
  )
}

export default ActiveFilters
