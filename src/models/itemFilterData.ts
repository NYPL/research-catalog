import type {
  ItemAggregation,
  ItemAggregationOption,
  option,
} from "../types/filterTypes"

export class ItemFilterData {
  options: option[]
  field: string
  constructor(agg: ItemAggregation) {
    this.field = agg.field
    if (this.field === "location") {
      this.options = this._reduceLocations(agg.values)
    } else {
      this.options = agg.values
    }
  }

  // There are multiple rc location codes, but we only want to
  // display a single Offsite option in the locations dropdown.This function
  // combines separate offsite location options into one.
  _reduceLocations(options: ItemAggregationOption[]) {
    const reducedOptionsMap = {}
    options
      .filter((option: ItemAggregationOption) => option.label?.length)
      .forEach((option: ItemAggregationOption) => {
        let label = option.label
        if (label.toLowerCase().replace(/[^\w]/g, "") === "offsite") {
          label = "Offsite"
        }
        if (!reducedOptionsMap[label]) {
          reducedOptionsMap[label] = new Set()
        }
        reducedOptionsMap[label].add(option.value)
      })
    return Object.keys(reducedOptionsMap).map((label) => ({
      value: Array.from(reducedOptionsMap[label]).join(","),
      label: label,
    }))
  }
}

// export default class ItemAggregations {
//   formats: ReducedItemAggregation
//   statuses: ReducedItemAggregation
//   locations: ReducedItemAggregation
//   fieldToOptionsMap: { location: object; status: object; format: object }

//   constructor(aggregations: ItemAggregation[]) {
//     const reducedAggs = this._reduceItemAggregations(aggregations)
//     this.formats = this._extractField(reducedAggs, "format")
//     this.statuses = this._extractField(reducedAggs, "status")
//     this.locations = this._extractField(reducedAggs, "location")
//     this.fieldToOptionsMap = this._buildFieldToOptionsMap(reducedAggs)
//   }

//   getLabelsForValues(values: string[], field: string) {
//     const getLabelForValue = (value: string) => {
//       const labels = Object.keys(this.fieldToOptionsMap[field])
//       return labels.find((label) =>
//         this.fieldToOptionsMap[field][label].includes(value)
//       )
//     }
//     return values.map((val) => getLabelForValue(val)).filter((l) => l)
//   }

//   _buildFieldToOptionsMap(aggs: ReducedItemAggregation[]) {
//     return aggs.reduce((accc, aggregation) => {
//       const filter = aggregation.field
//       const mappedValues = aggregation.options.reduce((acc, option) => {
//         // account for multiple values for offsite label
//         let value = option.value
//         if (acc[option.label]) value = acc[option.label] + "," + option.value
//         return {
//           ...acc,
//           [option.label]: value,
//         }
//       }, {})
//       return {
//         ...accc,
//         [filter]: mappedValues,
//       }
//     }, {})
//   }

//   _extractField(aggs: ReducedItemAggregation[], field: string) {
//     return aggs.find(
//       (fieldObj: ReducedItemAggregation) => fieldObj.field === field
//     )
//   }
