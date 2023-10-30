import {
  CheckboxGroup,
  Checkbox,
  Card,
} from "@nypl/design-system-react-components"

import type {
  ItemAggregation,
  option as optionType,
} from "../../types/filterTypes"
import { ItemFilterData } from "../../models/itemFilterData"

interface ItemFilterContainerProps {
  itemAggs: ItemAggregation[]
}

const ItemFilterContainer = ({ itemAggs }: ItemFilterContainerProps) => {
  const filterData = itemAggs.map(
    (agg: ItemAggregation) => new ItemFilterData(agg)
  )
  console.log("filter")
  return (
    <Card>
      {filterData.map((field: ItemFilterData) => (
        <CheckboxGroup
          key={field.field}
          labelText={`${field.field} options`}
          name={field.field}
          id={field.field}
        >
          {field.options.map((option: optionType) => (
            <Checkbox
              id={option.value}
              key={option.value}
              value={option.value}
              labelText={option.label}
            />
          ))}
        </CheckboxGroup>
      ))}
    </Card>
  )
}

export default ItemFilterContainer
