import type { SearchParams, SearchFormAction } from "../types/searchTypes"

export const searchFormReducer = (
  formState: SearchParams,
  action: SearchFormAction
) => {
  switch (action.type) {
    case "input_change": {
      return {
        ...formState,
        [action.field]: action.payload,
      }
    }
    case "filter_change": {
      return {
        ...formState,
        filters: {
          ...formState.filters,
          [action.field]: action.payload,
        },
      }
    }
    case "form_reset": {
      return action.payload
    }
    default:
      return formState
  }
}
