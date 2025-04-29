import {
  Card,
  CardContent,
  CardHeading,
  MultiSelect,
} from "@nypl/design-system-react-components"

const FilterPrototype = () => {
  return (
    <Card
      id="filter-sidebar-container"
      backgroundColor="ui.bg.default"
      p="s"
      borderRadius="5px"
      mb="s"
    >
      <CardHeading size="h6" id="filter-results-heading">
        Filter results
      </CardHeading>
      <CardContent>
        <MultiSelect
          isBlockElement
          id="item-location"
          buttonText={"Item location"}
          onChange={() => {
            console.log("click")
          }}
          items={[{ id: "sasb", name: "Stephen A. Smith Building" }]}
          selectedItems={undefined}
        />
      </CardContent>
    </Card>
  )
}

export default FilterPrototype
